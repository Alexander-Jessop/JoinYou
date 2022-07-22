import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

//https://www.npmjs.com/package/react-native-calendars

const AgendaView = (props) => {
  const navigation = useNavigation();
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const ID = user.uid;
  const startDate = moment().format("YYYY-MM-DD");
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [populateAgenda, setPopulateAgenda] = useState();
  const [markedDates, setMarkedDates] = useState();

  const typeOfUser = props.typeOfUser;

  useEffect(() => {
    //Changed .forEach() to .map()
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const getData = async () => {
      const q = query(
        collection(db, "Timeslots"),
        where(`${typeOfUser}Id`, "==", ID)
      );
      const querySnapshot = await getDocs(q);
      const timeslotArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          DOC_ID: doc.id,
        };
      });

      //sorted by startTime
      const sortedTimeslots = timeslotArray.sort((a, b) => {
        return a.startTime.seconds > b.startTime.seconds;
      });

      //Second filter. Filtering by confirmed appointments only.
      const filteredByConfirmed = sortedTimeslots.filter((timeslot) => {
        return timeslot.booked === true;
      });

      setConfirmedAppointments(filteredByConfirmed);
    };
    getData();
  }, []);

  useEffect(() => {
    if (confirmedAppointments) {
      let newAgenda = { [moment().format("YYYY-MM-DD")]: [] };
      let newMarkedDates = {
        [moment().format("YYYY-MM-DD")]: { disabled: false },
      };

      confirmedAppointments?.forEach((timeslot) => {
        const seconds = timeslot?.startTime.seconds;
        const timeslotId = timeslot?.DOC_ID;
        const influencerName = timeslot?.influencerName;
        const clientName = timeslot?.clientName;
        const time = moment.unix(seconds).format("h:mmA");
        const day = moment.unix(seconds).format("yyyy-MM-DD");

        if (typeOfUser === "influencer") {
          if (newAgenda[day]) {
            newAgenda[day].push({
              name: `${time} with ${clientName}`,
              timeslotId: timeslotId,
            });
          } else {
            newMarkedDates[day] = {
              marked: true,
              selectedDotColor: "white",
              disabled: false,
              selectedColor: "#007F5F",
            };
            newAgenda[day] = [
              { name: `${time} with ${clientName} `, timeslotId: timeslotId },
            ];
          }
        }
        if (typeOfUser === "client") {
          if (newAgenda[day]) {
            newAgenda[day].push({
              name: `${time} with ${influencerName}`,
              timeslotId: timeslotId,
            });
          } else {
            newMarkedDates[day] = {
              marked: true,
              disabled: false,
              selectedColor: "#007F5F",
              selectedDotColor: "white",
            };
            newAgenda[day] = [
              {
                name: `${time} with ${influencerName} `,
                timeslotId: timeslotId,
              },
            ];
          }
        }
      });
      setMarkedDates(newMarkedDates);
      setPopulateAgenda(newAgenda);
    }
  }, [confirmedAppointments]);

  const renderItem = (item) => {
    return item ? (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17 }}
        onPress={() => {
          console.log("item is: ", item);
          navigation.navigate("Timeslot", {
            timeslotId: item.timeslotId,
            name: item.name,
          });
        }}
      >
        <Card style={{ backgroundColor: "#D4F2EA" }}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Button
                color="#007F5F"
                title="Join"
                onPress={() =>
                  navigation.navigate("Meeting", {
                    roomId: item.timeslotId,
                    typeOfUser: typeOfUser,
                  })
                }
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Agenda
        selected={startDate}
        items={populateAgenda}
        renderItem={renderItem}
        disabledByDefault={true}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedDates}
        pastScrollRange={30}
        futureScrollRange={90}
        // style={{ backgroundColor: "#D4F2EA" }}
        theme={{
          dotColor: "#007F5F",
          agendaDayNumColor: "#007F5F",
          agendaTodayColor: "#007F5F",
          agendaDayTextColor: "#007F5F",
          backgroundColor: "white",
          // agendaBackgroundColor: "#D4F2EA",
        }}
        renderEmptyDate={() => {
          return (
            <View
              style={{
                height: 60,
                margin: 20,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Card style={{ backgroundColor: "#D4F2EA" }}>
                <Card.Content>
                  <Text>No Appointments Scheduled</Text>
                </Card.Content>
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default AgendaView;

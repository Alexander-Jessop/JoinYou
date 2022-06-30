import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import { Agenda } from "react-native-calendars";
import { Avatar, Card } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import { FirebaseContext } from "../../src/FirebaseProvider";
import moment from "moment";

//https://www.npmjs.com/package/react-native-calendars

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const AgendaView = (props) => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const ID = user.uid;

  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [populateAgenda, setPopulateAgenda] = useState();
  useEffect(() => {
    //Changed .forEach() to .map()
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const getData = async () => {
      const q = query(
        collection(db, "Timeslots"),
        where("influencerId", "==", ID)
      );
      const querySnapshot = await getDocs(q);
      const timeslotArray = querySnapshot.docs.map((doc) => doc.data());

      //Second filter. Filtering by selected category.
      const filteredByConfirmed = timeslotArray.filter((timeslot) => {
        return timeslot.booked === true;
      });

      setConfirmedAppointments(filteredByConfirmed);
    };
    getData();
  }, []);

  console.log("confirmedAppointment", confirmedAppointments);

  useEffect(() => {
    if (confirmedAppointments) {
      let newAgenda = {};

      confirmedAppointments?.forEach((timeslot) => {
        // keep key as value needs to be second arg.
        let seconds = timeslot?.startTime.seconds;

        const name = timeslot?.displayName;

        const time = moment.unix(seconds).format("h:mmA");
        const day = moment.unix(seconds).format("yyyy-MM-DD");

        if (newAgenda[day]) {
          newAgenda[day].push({ name: `${time} with ${name}` });
        } else {
          newAgenda[day] = [{ name: `${time} with ${name} ` }];
        }

        console.log("name: ", timeslot?.displayName);
        console.log("time: ", time);
        console.log("day: ", day);
        console.log("newAgenda", newAgenda);
      });
      setPopulateAgenda(newAgenda);
    }
  }, [confirmedAppointments]);

  console.log("populateAgenda", populateAgenda);

  // "2022-06-22": [{ name: "item 1 - any js object" }]

  const renderItem = (item) => {
    console.log("item is: ", item);
    return item ? (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
              <Button title="Join" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={populateAgenda}
        renderItem={renderItem}
        renderEmptyDate={() => {
          return (
            <View>
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text>YOUR DAY IS FREE!</Text>

                    <Button title="Join" />
                  </View>
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

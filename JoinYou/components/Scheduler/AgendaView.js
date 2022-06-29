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

  useEffect(() => {
    //Get multiple documents from a collection with a filter.
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

  // const selectedDate = props.route.params.dateId;

  let date = moment.unix(confirmedAppointments?.[0]?.startTime?.seconds);
  let bookedDate = date?.toISOString()?.split("T")[0];

  console.log("date", date);
  console.log("bookedDate : ", bookedDate);

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
                borderWidth: 3,
                borderStyle: "solid",
                borderColor: "orange",
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text
                label="N/A" /*Replace N/A with profile photo of scheduled client*/
              />
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
        items={{
          "2022-06-22": [{ name: "item 1 - any js object" }],
          "2022-06-23": [{ name: "item 2 - any js object" }],
          "2022-06-24": [],
          "2022-06-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
          "2022-06-26": [],
          "2022-06-27": [],
          "2022-06-28": [],
          "2022-06-29": [],
          "2022-06-30": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        renderItem={renderItem}
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

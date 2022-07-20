import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Text, Title } from "react-native-paper";
import { FirebaseContext } from "../../src/FirebaseProvider";
import moment from "moment";

const TimeslotDetails = (props) => {
  const { navigation, route } = props;
  const timeslotId = route.params.timeslotId;
  const name = route.params.name;

  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;

  const [timeslotData, setTimeslotData] = useState(null);

  console.log("TIMESLOTDETAILS: timeslotData is: ", timeslotData);
  //sets the timeslot data to the timeslot that was clicked on
  useEffect(() => {
    const getData = async () => {
      //Get a single document from Firestore databse, by UID
      //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(db, "Timeslots", timeslotId);
      const docSnap = await getDoc(docRef);
      setTimeslotData(docSnap.data());
    };
    getData();
  }, [timeslotId]);

  if (!timeslotData) {
    return <Text>Loading...</Text>;
  }

  
  return (
    <View>
      <Card>
        <Card.Content>
          <Title>Expert Name: {timeslotData.influencerName}</Title>
          <Title>Client Name: {timeslotData.clientName}</Title>
          <Title>
            Start Time:{" "}
            {moment(timeslotData?.startTime.seconds * 1000).format(
              "h:mm a  MMMM Do. YYYY"
            )}
          </Title>
          <Title>
            End Time:{" "}
            {moment(timeslotData?.endTime.seconds * 1000).format(
              "h:mm a  MMMM Do. YYYY"
            )}
          </Title>
          <Title>Meeting Description:</Title>
          <Paragraph> {timeslotData.meetingDescription}</Paragraph>
          <Card.Cover source={{ uri: timeslotData.photoUrl }} />
          <Paragraph> {timeslotData.photoDescription}</Paragraph>

          <Button
            color="#007F5F"
            onPress={() => {
              navigation.navigate("Details Video", {
                timeslotData,
              });
            }}
          >
            See Video
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};;;;;;;

const styles = StyleSheet.create({});

export default TimeslotDetails;

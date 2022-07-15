import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";

// put this somewhere:
// import clientAppointmentSelection from "../../src/TSTClientAppointmentSelection";

// Select influencer fred@test.com
// print/view timeslots from newmeetings collection
// write to selected document
const ClientAppointmentSelection = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const app = fbContext.app;
  const db = fbContext.db;
  // const [count, setCount] = useState("n/a");
  const [response, setResponse] = useState("No Influencer Selected Yet");

  const doFunction = async () => {
    // FRED: YKVE46KEhzZDxqr7A7mwWlHRQcF3
    let selectedInfluencer = "";
    console.log(selectedInfluencer);
    try {
      setResponse("selected influencer");
    } catch (ex) {
      console.error(ex);
      console.log(`Error: -------`, ex);
    }
  };

  return (
    <View style={styles.container}>
      <Text>===ClientAppointmentSelection COMPONENT===</Text>
      <Text>Response: {response} </Text>
      <Button onPress={doFunction}>select influencer</Button>
      <Text>
        {" "}
        Then write to that document booked=true, clientID, and client name
      </Text>
    </View>
  );
};

export default ClientAppointmentSelection;

const styles = StyleSheet.create({ container: { alignItems: "center" } });

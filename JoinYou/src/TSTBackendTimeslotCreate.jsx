import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import moment from "moment";



// put this somewhere:
// import backendTimeslotCreate from "../../src/TSTBackendTimeslotCreate";


const BackendTimeslotCreate = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const app = fbContext.app;
  const db = fbContext.db;
  // const [count, setCount] = useState("n/a");
  const [response, setResponse] = useState("Havent created timeslots yet");


  const doCreateTimeslots = async () => {
    let startDateTime = new Date("2022-07-13T13:00").valueOf();
    let endDateTime = new Date("2022-07-13T14:00").valueOf();

    // let x = startDateTime.getTimezoneOffset()
    // console.log(`timezoneoffset is: `, x)
    console.log(startDateTime.valueOf());
    console.log(endDateTime.valueOf());

    try {
      // front end
      const sedTimeblockFunc = httpsCallable(cloudFuncs, "createTimeslots");
      console.log("THIS IS BEFORE");
      const result = await sedTimeblockFunc({
        startTime: startDateTime,
        endTime: endDateTime,
      });
      
      console.log("THIS IsAFTER");
      // const data = result.data;
      setResponse("data written to newmeetings");
    } catch (ex) {
      console.error(ex);
      console.log(`Error: -------`, ex);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Response: {response} </Text>

      <Button onPress={doCreateTimeslots}>CONFIRM: send timeslots</Button>
    </View>
  );
};

export default BackendTimeslotCreate;

const styles = StyleSheet.create({ container: { alignItems: "center" } });

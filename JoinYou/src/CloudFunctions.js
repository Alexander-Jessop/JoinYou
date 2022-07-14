import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import moment from "moment";

const CloudFunctions = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const app = fbContext.app;
  const db = fbContext.db;
  // const [count, setCount] = useState("n/a");
  const [response, setResponse] = useState("Havent called function yet");

  // const doInitializeInfl = async () => {
  //   // console.log(`cloudfuncs is : `, cloudFuncs)
  //   try {
  //     const myInitializeFunc = httpsCallable(
  //       cloudFuncs,
  //       "initializeNewInfluencer"
  //     );
  //     console.log("THIS IS BEFORE");
  //     const result = await myInitializeFunc({
  //       startTime: 9,
  //       endTime: 14,
  //       meetingLength: 60,
  //     });
  //     console.log("THIS IsAFTER");
  //     const data = result.data;
  //     setResponse(data);
  //   } catch (ex) {
  //     console.error(ex);
  //     console.log(`Error: -------`, ex);
  //   }
  // };

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
      const data = result.data;
      setResponse(data);
    } catch (ex) {
      console.error(ex);
      console.log(`Error: -------`, ex);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Response from the function: {response} </Text>
      {/* <Button onPress={doInitializeInfl}>
        run the do initialize influencer code
      </Button> */}
      <Button onPress={doCreateTimeslots}>run Danielles sendData</Button>
    </View>
  );
};

export default CloudFunctions;

const styles = StyleSheet.create({ container: { alignItems: "center" } });

import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import moment from "moment";

const CloudFunctions = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  // const app = fbContext.app;
  // const db = fbContext.db;
  // const [count, setCount] = useState("n/a");
  const [response, setResponse] = useState("Havent called function yet");

  // const getUsersCount = async () => {
  //   try {
  //     const getNumberOfUsers = httpsCallable(cloudFuncs, "getNumberOfUsers");
  //     const result = await getNumberOfUsers();
  //     const data = result.data;
  //     console.log(`data is:`, data);
  //     setCount(data.numUsers);
  //   } catch (ex) {
  //     console.log("yikes! ", ex.message);
  //     throw ex;
  //   }
  // };

  // const addRandoUser = async () => {
  //   try {
  //     console.log("Function to add a new user to firestore database");
  //     const addUser = httpsCallable(cloudFuncs, "addRandoUser");
  //     const result = await addUser();
  //     const data = result.data;
  //     console.log("New user added", data);
  //   } catch (ex) {
  //     console.log("yikes! ", ex.message);
  //     throw ex;
  //   }
  // };

// function consoleLogTimes(){
//   console.log(`LOGGING THE ITMES`)
//   let inflChooseDate = "2022-07-12";
//   let inflChooseStartTime = "9:00";
//   let inflChooseEndTime = "13:00"
//   let influencerStart = moment(inflChooseDate +' '+ inflChooseStartTime).toDate();
//   let influencerEnd = moment(inflChooseDate +' '+ inflChooseEndTime).toDate();

//   console.log(`starts at:`, influencerStart);
//   console.log(`ends at  :`, influencerEnd);
// }


  const doInitializeInfl = async () => {
    // console.log(`cloudfuncs is : `, cloudFuncs)
    try {
      const myInitializeFunc = httpsCallable(
        cloudFuncs,
        "initializeNewInfluencer"
      );

      // We create a moment object from a string.
      // let inflChooseDate = "2022-07-12";
      // let inflChooseStartTime = "18:00";
      // let influencerStart = moment(inflChooseDate).startOf(inflChooseStartTime);

      console.log(myInitializeFunc);
      console.log("THIS IS BEFORE");
      const result = await myInitializeFunc({
        startTime: 9,
        endTime: 14,
        meetingLength: 60,
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
      <Button onPress={doInitializeInfl}>
        run the do initialize influencer code
      </Button>
      {/* <Button onPress={consoleLogTimes}>
        log the times
      </Button> */}
    </View>
  );
};

export default CloudFunctions;

const styles = StyleSheet.create({ container: { alignItems: "center" } });

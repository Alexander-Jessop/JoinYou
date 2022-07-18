import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import moment from "moment";
import { AuthContext } from "./AuthProvider";

const BackendTimeslotCreate = (props) => {
  const profileData = props.profileData;

  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const app = fbContext.app;
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const influencerId = authContext.user.uid;
  // const [count, setCount] = useState("n/a");
  const [response, setResponse] = useState("Havent created timeslots yet");

  const doCreateTimeslots = async () => {
    let startDateTime = new Date("2022-07-13T13:00").valueOf();
    let endDateTime = new Date("2022-07-13T14:00").valueOf();
    let influencerName = profileData.displayName;
    let influencerId = profileData.uid;

    // let x = startDateTime.getTimezoneOffset()
    // console.log(`timezoneoffset is: `, x)
    console.log(startDateTime.valueOf());
    console.log(endDateTime.valueOf());

    try {
      // front end
      const sedTimeblockFunc = httpsCallable(cloudFuncs, "createTimeslots");
      console.log("THIS IS BEFORE");
      const result = await sedTimeblockFunc({
        influencerName: influencerName,
        startTime: startDateTime,
        endTime: endDateTime,
        inflId: influencerId,
      });

      console.log("THIS IsAFTER");
      // const data = result.data;
      setResponse("data written to newmeetings", result);
    } catch (ex) {
      console.error(ex);
      console.log(`Error: -------`, ex);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={doCreateTimeslots}
        mode="contained"
        color="#007F5F"
        style={styles.submit}
      >
        Submit
      </Button>
    </View>
  );
};

export default BackendTimeslotCreate;

const styles = StyleSheet.create({
  container: {
    height: "77%",
    width: "100%",
  },
  timePicker: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    marginTop: 30,
  },
  submit: {
    marginTop: 40,
    marginBottom: 18,
  },
});
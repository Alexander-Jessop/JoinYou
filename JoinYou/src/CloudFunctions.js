import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { FirebaseContext } from "./FirebaseProvider";
import { httpsCallable } from "firebase/functions";

const CloudFunctions = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const db = fbContext.db;
  const [count, setCount] = useState("n/a");
  const [rsponse, setResponse] = useState("Havent called function yet");

  const getUsersCount = async () => {
    try {
      const getNumberOfUsers = httpsCallable(cloudFuncs, "getNumberOfUsers");
      const result = await getNumberOfUsers();
      const data = result.data;
      console.log(`data is:`, data);
      setCount(data.numUsers);
    } catch (ex) {
      console.log("yikes! ", ex.message);
      throw ex;
    }
  };

  const addRandoUser = async () => {
    try {
      console.log("Function to add a new user to firestore database");
      const addUser = httpsCallable(cloudFuncs, "addRandoUser");
      const result = await addUser();
      const data = result.data;
      console.log("New user added", data);
    } catch (ex) {
      console.log("yikes! ", ex.message);
      throw ex;
    }
  };
  const doInitializeInfl = async () => {
    const myInitializeFunc = httpsCallable(
      cloudFuncs,
      "initializeNewInfluencer"
    );
    const result = await myInitializeFunc({
      startTime: "11:00",
      endTime: "14:00",
      meetingLength: 15,
    });
    const data = result.data;
    setResponse(data);
  };

  return (
    <View style={styles.container}>
      <Text>CloudFunctions {count} </Text>
      <Button onPress={getUsersCount}> click it</Button>
      <Text>Number of users {count} </Text>
      <Button onPress={addRandoUser}> Add a user</Button>
      <Text>Response from the function {response} </Text>
      <Button onPress={doInitializeInfl}> run the do initialize influencer code</Button>
    </View>
  );
};

export default CloudFunctions;

const styles = StyleSheet.create({ container: { alignItems: "center" } });

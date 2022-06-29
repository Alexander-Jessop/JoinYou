import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { FirebaseContext } from "../src/FirebaseProvider";
import FlatButton from "./ui/FlatButton";

const FunctionsTesting = () => {
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const [count, setCount] = useState("n/a");

  const getUsersCount = async () => {
    const getNumberOfUsers = httpsCallable(cloudFuncs, "getNumberOfUsers");
    const result = await getNumberOfUsers();
    const data = result.data;
    setCount(data.numUsers);
  };

  return (
    <View>
      <Text>Num of Heroes: {count}</Text>
      <FlatButton title="Num of users: {count}" onPress={getUsersCount} />
    </View>
  );
};

export default FunctionsTesting;

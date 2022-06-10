import React, { useContext } from "react";
import { Text, View } from "react-native";
import { FirebaseContext } from "../src/FirebaseProvider";
const RestOfApp = () => {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;

  return (
    <View>
      <Text>{JSON.stringify(app)}</Text>
    </View>
  );
};

export default RestOfApp;

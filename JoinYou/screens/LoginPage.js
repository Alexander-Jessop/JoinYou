import { View, Text } from "react-native";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const LoginPage = () => {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;

  return (
    <View>
      <Text>{JSON.stringify(app)}</Text>
    </View>
  );
};

export default LoginPage;

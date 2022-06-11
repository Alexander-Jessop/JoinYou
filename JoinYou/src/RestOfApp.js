import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "./AuthProvider";

const RestOfApp = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <View>
      <Text>{user ? "you are logged in!" : "not logged in 😔"}</Text>
    </View>
  );
};

export default RestOfApp;

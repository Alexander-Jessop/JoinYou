import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const InitialScreen = () => {
  return (
    <View>
      <Text>Register as a new user</Text>
      <Button title="REGISTER" />
      <Text>Already have an account?</Text>
      <Button title="LOGIN" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InitialScreen;

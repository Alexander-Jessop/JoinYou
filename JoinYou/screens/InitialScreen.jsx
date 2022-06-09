import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const InitialScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Register as a new user</Text>
      <Button
        title="REGISTER"
        onPress={() => navigation.navigate("Register")}
      />
      <Text>Already have an account?</Text>
      <Button title="LOGIN" onPress={() => navigation.navigate("Login")} />
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

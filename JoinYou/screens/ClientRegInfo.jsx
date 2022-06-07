import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";

const ClientRegInfo = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const create = () => {
    addDoc(collection(db, "users"), {
      email: email,
      username: username,
      password: password,
    })
      .then(() => {
        //Data saved succesfully
        console.log("Data Submitted!");
      })
      .catch((error) => {
        //Data failed to write
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Enter your email address:</Text>
      <TextInput
        value={email}
        onChangeText={(enteredEmail) => setEmail(enteredEmail)}
        placeholder="Email"
        style={styles.textBoxes}
      ></TextInput>

      <Text>Enter your username:</Text>
      <TextInput
        value={username}
        onChangeText={(enteredUsername) => setUsername(enteredUsername)}
        placeholder="Username"
        style={styles.textBoxes}
      ></TextInput>

      <Text>Enter your password:</Text>
      <TextInput
        value={password}
        onChangeText={(enteredPassword) => setPassword(enteredPassword)}
        placeholder="Password"
        style={styles.textBoxes}
      ></TextInput>

      <Button title="Continue" onPress={create} />
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
  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    //borderColor: "gray",
    //borderWidth: 0.2,
    //borderRadius: 10
  },
});

export default ClientRegInfo;

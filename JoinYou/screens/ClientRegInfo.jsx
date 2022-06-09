import { Button, View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";

const ClientRegInfo = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const create = () => {
    navigation.navigate("Tags");
    addDoc(collection(db, "users"), {
      email: email,
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
      <View>
        <Text>Enter your email address:</Text>
        <TextInput
          value={email}
          onChangeText={(enteredEmail) => setEmail(enteredEmail)}
          placeholder="Email"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <View>
        <Text>Confirm your email address:</Text>
        <TextInput
          value={confirmEmail}
          onChangeText={(enteredConfirmEmail) =>
            setConfirmEmail(enteredConfirmEmail)
          }
          placeholder="Confirm Email"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <View>
        <Text>Enter your password:</Text>
        <TextInput
          value={password}
          onChangeText={(enteredPassword) => setPassword(enteredPassword)}
          placeholder="Password"
          style={styles.textBoxes}
        ></TextInput>

        <View>
          <Text>Confirm your password:</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={(enteredConfirmPassword) =>
              setConfirmPassword(enteredConfirmPassword)
            }
            placeholder="Confirm Password"
            style={styles.textBoxes}
          ></TextInput>
        </View>
      </View>

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
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export default ClientRegInfo;

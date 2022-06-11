import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const onContinueHandler = () => {
    navigation.navigate("Tags");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
        <Text>Enter your password:</Text>
        <TextInput
          value={password}
          onChangeText={(enteredPassword) => setPassword(enteredPassword)}
          placeholder="Password"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <Button title="Continue" onPress={onContinueHandler} />
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

export default RegisterPage;

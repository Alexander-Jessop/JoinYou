import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const onContinueHandler = () => {
    navigation.replace("Tags");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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

      {/* <View>
        <Text>Confirm your email address:</Text>
        <TextInput
          value={confirmEmail}
          onChangeText={(enteredConfirmEmail) =>
            setConfirmEmail(enteredConfirmEmail)
          }
          placeholder="Confirm Email"
          style={styles.textBoxes}
        ></TextInput>
      </View> */}

      <View>
        <Text>Enter your password:</Text>
        <TextInput
          value={password}
          onChangeText={(enteredPassword) => setPassword(enteredPassword)}
          placeholder="Password"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      {/* <View>
        <Text>Confirm your password:</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(enteredConfirmPassword) =>
            setConfirmPassword(enteredConfirmPassword)
          }
          placeholder="Confirm Password"
          style={styles.textBoxes}
        ></TextInput>
      </View> */}

      <Button title="Continue" onPress={onContinueHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RegisterForm;

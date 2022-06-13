import React, { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../src/AuthProvider";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//https://firebase.google.com/docs/auth/web/start#sign_up_new_users

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const authContext = useContext(AuthContext);
  const login = authContext.login;

  const onContinueHandler = () => {
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email.toLowerCase() === confirmEmail.toLowerCase();
    const passwordsAreEqual = password === confirmPassword;

    if (
      emailIsValid &&
      passwordIsValid &&
      emailsAreEqual &&
      passwordsAreEqual
    ) {
      Alert.alert("Account Created Succesfully!");
      navigation.replace("InfoPage");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      login(email, password);
    } else {
      Alert.alert("Invalid Credentials!");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Enter your email address:</Text>
        <TextInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          placeholder="Email"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <View>
        <Text>Confirm your email address:</Text>
        <TextInput
          value={confirmEmail}
          onChangeText={(e) => setConfirmEmail(e)}
          placeholder="Confirm Email"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <Text>{"\n"}</Text>

      <View>
        <Text>Enter your password:</Text>
        <TextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <View>
        <Text>Confirm your password:</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(e) => setConfirmPassword(e)}
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.textBoxes}
        ></TextInput>
      </View>
      <Text>(password must be at least 7 characters) {"\n"} </Text>

      <Button title="Continue" onPress={onContinueHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default RegisterForm;

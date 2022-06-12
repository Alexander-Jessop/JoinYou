import React, { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, View, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../src/AuthProvider";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const login = authContext.login;
  const createUserData = authContext.createUserData;

  const onContinueHandler = () => {
    login(user.email, user.password);
    createUserData(user);
    Alert.alert("Account Created!");
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
          onChangeText={(e) => setEmail(e)}
          placeholder="Email"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      {/* <View>
        <Text>Confirm your email address:</Text>
        <TextInput
          value={confirmEmail}
          onChangeText={(e) => setConfirmEmail(e)}
          placeholder="Confirm Email"
          style={styles.textBoxes}
        ></TextInput>
      </View> */}

      <View>
        <Text>Enter your password:</Text>
        <TextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
          placeholder="Password"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      {/* <View>
        <Text>Confirm your password:</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(e) => setConfirmPassword(e)}
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

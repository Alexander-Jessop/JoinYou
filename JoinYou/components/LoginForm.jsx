import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { AuthContext } from "../src/AuthProvider";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <Button title="LOGIN" onPress={() => loginFn(email, password)} />
      <Button title="LOG OUT" onPress={() => logoutFn()} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;

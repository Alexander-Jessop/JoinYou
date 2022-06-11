import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { AuthContext } from "../src/AuthProvider";

const LoginForm = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const loginError = authContext.authError;

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
      {loginError && <Text>{loginError}</Text>}
      <Button title="LOGIN" onPress={() => loginFn(email, password)} />
      <Button title="LOG OUT" onPress={() => logoutFn()} />
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;

import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const loginError = authContext.authError;
  const user = authContext.user;

  const navigation = useNavigation();

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
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}
      />
      {loginError && <Text>{loginError}</Text>}
      <Button
        title="LOGIN"
        onPress={() => {
          loginFn(email, password);
          if (user) {
            navigation.replace("Home");
          }
        }}
      />
      {/* <Button title="LOG OUT" onPress={() => logoutFn()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;

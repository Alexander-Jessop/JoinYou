import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../src/AuthProvider";
import LoginForm from "../components/LoginForm";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const navigation = useNavigation();

  return (
    <View>
      <Text>
        {"\n"}
        {"\n"}
        {user
          ? "You are logged in as: " + user.email
          : "You are not logged in."}
      </Text>

      <LoginForm />
      <Text>
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
      </Text>
      <Button title="REGISTER" onPress={() => navigation.replace("Register")} />
    </View>
  );
};

export default LoginPage;

import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../src/AuthProvider";
import LoginForm from "../../components/registration/LoginForm";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const navigation = useNavigation();

  return (
    <View>
      <LoginForm />
    </View>
  );
};

export default LoginPage;

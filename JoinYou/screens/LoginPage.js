import { View, Text, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../src/AuthProvider";
import LoginForm from "../components/LoginForm";

const LoginPage = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <View>
      <Text>
        {"\n"}
        {"\n"}
        {user ? "you are logged in!" : "not logged in 😔"}
      </Text>
      <LoginForm />

      <Button
        title="REGISTER"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginPage;

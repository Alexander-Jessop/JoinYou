import React, { useContext } from "react";
import { Text, View } from "react-native";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import TagsPage from "../screens/TagsPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RestOfApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: "Register as new user" }}
        />
        <Stack.Screen
          name="Tags"
          component={TagsPage}
          options={{ title: "Select your interests:" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RestOfApp;

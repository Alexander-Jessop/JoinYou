import React, { useContext } from "react";
import { Text, View } from "react-native";
import LoginPage from "../screens/LoginPage";
import RegisterPage from "../screens/RegisterPage";
import InfoPage from "../screens/InfoPage";
import TagsPage from "../screens/TagsPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

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
          name="InfoPage"
          component={InfoPage}
          options={{ title: "Enter your information" }}
        />
        <Stack.Screen
          name="Tags"
          component={TagsPage}
          options={{ title: "Select your interests:" }}
        />

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RestOfApp;

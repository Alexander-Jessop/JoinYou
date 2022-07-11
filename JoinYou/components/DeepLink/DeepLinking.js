import 'react-native-gesture-handler';
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../Screens/feed/HomeScreen";
import CategoryDropdown from "../feed/CategoryDropdown.jsx";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const prefix = Linking.makeUrl("/");

const Stack = createNativeStackNavigator();

const DeepLinking = () => {

  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        HomeScreen: 'homescreen',
        CategoryDropdown: 'categoryDropdown',
      },
    },
  };

  
  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }

  useEffect = () => {
    Linking.addEventListener("url", handleDeepLink);

    return () => {
      Linking.removeEventListener("url");
    };
  }, [];

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoryDropdown" component={CategoryDropdown} />
      </Stack.Navigator>
    </NavigationContainer>
      
    
    // * // <View style={styles.container}>
    // //   <TextInput>
    // //     {data ? JSON.stringify(data) : "DeepLinking Navigation JoinYou"}
    // //   </TextInput>
    // //   <StatusBar style="auto" />
    // // </View> */
  );
}

export default DeepLinking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});  
import React from "react";
import { StatusBar } from "expo-status-bar";
import FirebaseProvider from "./src/FirebaseProvider";
import AuthProvider from "./src/AuthProvider";
import RestOfApp from "./src/RestOfApp";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

/*This file is the entry point for the app. 
It imports the FirebaseProvider and AuthProvider, and then renders the rest of the app with React Paper.*/

// https://callstack.github.io/react-native-paper/theming.html#using-the-theme-in-your-own-components - Theming docs for react-native-paper

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    primary: "#D4F2EA",
    secondary: "#007F5F",
    tertiary: "#33302F",
  },
};

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <StatusBar style="light" />
          <RestOfApp />
        </PaperProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

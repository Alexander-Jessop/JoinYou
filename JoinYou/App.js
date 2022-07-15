
import React from "react";
import { StatusBar } from "expo-status-bar";
import FirebaseProvider from "./src/FirebaseProvider";
import AuthProvider from "./src/AuthProvider";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
// import CloudFunctions from "./src/CloudFunctions";
import RestOfApp from "./src/RestOfApp"

//test

/*This file is the entry point for the app. 
It imports the FirebaseProvider and AuthProvider, and then renders the rest of the app with React Paper.*/

// https://callstack.github.io/react-native-paper/theming.html#using-the-theme-in-your-own-components - Theming docs for react-native-paper

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PaperProvider>
          <StatusBar style="dark" />
          <RestOfApp />
        </PaperProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

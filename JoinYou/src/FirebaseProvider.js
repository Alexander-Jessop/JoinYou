import React, { createContext } from "react";
import { View, StyleSheet } from "react-native";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwHLovveAci3BMdA1Pkq1YsUhe-74pYX0",
  authDomain: "joinyou-3a118.firebaseapp.com",
  projectId: "joinyou-3a118",
  storageBucket: "joinyou-3a118.appspot.com",
  messagingSenderId: "127232884185",
  appId: "1:127232884185:web:b70d1e7dfde2c11614edc8",
  measurementId: "G-Q6TK0LBB7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  const children = props.children;
  const theValues = { app };

  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default FirebaseProvider;

import React, { createContext } from "react";

import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSah-NxXBnlpzKH1TvuciTvSpvMOmPS7g",
  authDomain: "joinyou-test.firebaseapp.com",
  projectId: "joinyou-test",
  storageBucket: "joinyou-test.appspot.com",
  messagingSenderId: "1095871205585",
  appId: "1:1095871205585:web:a68a76e195cab2e797f5f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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

export default FirebaseProvider;

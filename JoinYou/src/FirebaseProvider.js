import React, { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getFunctions} from "firebase/functions"


const firebaseConfig = {
  apiKey: "AIzaSyAwHLovveAci3BMdA1Pkq1YsUhe-74pYX0",
  authDomain: "joinyou-3a118.firebaseapp.com",
  projectId: "joinyou-3a118",
  storageBucket: "joinyou-3a118.appspot.com",
  messagingSenderId: "127232884185",
  appId: "1:127232884185:web:b70d1e7dfde2c11614edc8",
  measurementId: "G-Q6TK0LBB7B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage(app);
const cloudFuncs = getFunctions(app)

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  const children = props.children;
  const theValues = { app, auth, db, storage, cloudFuncs };

  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;

import React, { useState, createContext, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseProvider";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const children = props.children;
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;

  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);

      if (userCred) {
        console.log("Logged in!!", userCred.user);
        setAuthError(null);
      } else {
        console.log("Login failed!");
        setAuthError("Login FAILED");
      }
    } catch (ex) {
      console.log("AUTH FAILURE!", ex.message);
      setAuthError(ex.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const createUserData = async (user) => {
    console.log(`db is: `, db);
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      let newDoc = await setDoc(doc(db, "test-users", user.uid), userData);
      console.log("New user created!", newDoc);
      return newDoc;
    } catch (error) {
      console.log("Error creating user data", error);
      return false;
    }
  };

  const updateUserData = async (user, displayName, selectedTimezone) => {
    console.log(`db is: `, db);
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        timezone: selectedTimezone,
      };
      let newDoc = await setDoc(doc(db, "test-users", user.uid), userData);
      console.log("New user created!", newDoc);
      return newDoc;
    } catch (error) {
      console.log("Error creating user data", error);
      return false;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub;
  }, [auth]);

  const theValues = {
    user,
    authError,
    login,
    logout,
    createUserData,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

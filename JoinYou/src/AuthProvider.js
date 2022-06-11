import React, { useState, createContext, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseProvider";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const children = props.children;
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;

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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub;
  }, [auth]);

  const theValues = { user, authError, login, logout };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

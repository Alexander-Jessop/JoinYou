import React, { useState, createContext, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseProvider";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const children = props.children;
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();

  //Firebase context
  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;

  //Log in function
  //https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
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

  //Logout function
  //https://firebase.google.com/docs/auth/web/password-auth#next_steps
  const logout = async () => {
    await signOut(auth);
  };

  //Original function provided by Dani
  //Creates a Firestore db document with the same uid/email as the Firebase Authentication user
  //https://firebase.google.com/docs/firestore/manage-data/add-data
  const createUserData = async (user) => {
    console.log(`db is: `, db);
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
      };
      let newDoc = await setDoc(doc(db, "users", user.uid), userData);
      console.log("New user created!", newDoc);
      return newDoc;
    } catch (error) {
      console.log("Error creating user data", error);
      return false;
    }
  };

  //Modified function with timezone / display name / interests
  //Creates a Firestore db document with the same uid/email as the Firebase Authentication user
  //Plus a Display Name and Timezone, Plus an empty array of "interests"
  const updateUserData = async (
    user,
    displayName,
    checkedExpert,
    selectedTimezone,
    interests
  ) => {
    console.log(`db is: `, db);
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        isExpert: checkedExpert,
        timezone: selectedTimezone,
        interests: interests,
      };
      let newDoc = await setDoc(doc(db, "users", user.uid), userData);
      console.log("New user created!", newDoc);
      return newDoc;
    } catch (error) {
      console.log("Error creating user data", error);
      return false;
    }
  };

  //Update function, for "interests" tags
  //Updates the "interests" array for Firestore db user
  //https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateUserInterests = async (interestsArray) => {
    const userRef = doc(db, "users", user.uid);

    // Set the "interests" field of the user
    await updateDoc(userRef, {
      interests: interestsArray,
    });
  };
  
  const theValues = {
    user,
    authError,
    login,
    logout,
    createUserData,
    updateUserData,
    updateUserInterests,
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub;
  }, [auth]);


  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

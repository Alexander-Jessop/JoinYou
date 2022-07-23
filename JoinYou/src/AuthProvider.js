import React, { useState, createContext, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseProvider";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const children = props.children;
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
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
        console.log("AuthProvider: User logged in:", userCred.user.email);
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
    if (user) {
      console.log(`AuthProvider: ${user.email} is logging out...`);
    }
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
    // console.log(`db is: `, db);
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

  //Updates the "price" for Firestore db user
  //https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateUserPrice = async (selectedPrice) => {
    const userRef = doc(db, "users", user.uid);

    // Set the "interests" field of the user
    await updateDoc(userRef, {
      price: selectedPrice,
    });
  };

  //Updates the Timeslot document with the client's information
  //https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateTimeslot = async (
    timeslotId,
    clientProfile,
    meetingDescription,
    photoDescription,
    photoUrl,
    videoUrl
  ) => {
    try {
      console.log("Updating timeslot...");
      const timeslotRef = doc(db, "Timeslots", timeslotId);

      //if photoDescription/photoUrl/videoUrl are empty, set them to null
      //(doing this prevents an error from the updateDoc() function)
      if (!photoDescription) {
        photoDescription = null;
      }
      if (!photoUrl) {
        photoUrl = null;
      }
      if (!videoUrl) {
        videoUrl = null;
      }

      //update the timeslot document
      await updateDoc(timeslotRef, {
        booked: true,
        clientId: clientProfile.uid,
        clientName: clientProfile.displayName,
        meetingDescription: meetingDescription,
        photoDescription: photoDescription,
        photoUrl: photoUrl,
        videoUrl: videoUrl,
      });
      console.log("Succesfully updated timeslot", timeslotId);
    } catch (err) {
      console.log("Error updating timeslot", err);
    }
  };

  //Sets the user data from Firebase Authentication user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      return unsub;
    });
    if (user) {
      console.log(
        `AuthProvider: onAuthStateChanged() - New User: ${user.email}`
      );
    } else {
      console.log(`AuthProvider: User is ${user}  (No one is logged in)`);
    }
  }, [auth]);

  //Sets the profile data from the Firestore Database user
  useEffect(() => {
    if (user) {
      const getData = async () => {
        //Get a single document from Firestore databse, by UID
        //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setProfile(docSnap.data());
      };
      getData();
    }
  }, [user]);

  const theValues = {
    user,
    profile,
    authError,
    login,
    logout,
    createUserData,
    updateUserData,
    updateUserInterests,
    updateUserPrice,
    updateTimeslot,
  };

  useEffect(() => {
    if (user) {
      const unsub = onAuthStateChanged(auth, (user) => {
        console.log(
          "AuthProvider: onAuthStateChanged() - new User!!",
          user.email
        );
        setUser(user);
      });
      return unsub;
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};;;;;;;

export default AuthProvider;

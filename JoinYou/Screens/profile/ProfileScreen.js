import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { useLinkProps } from "@react-navigation/native";

const ProfileScreen = (props) => {
  // const navigation = props.navigation;
  // const route = props.route;
  const { navigation, route } = props;

  const [profileData, setProfileData] = useState({});

  console.log("route.params is ", route.params);
  const profileID = route.params.profileID;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  useEffect(() => {
    const getData = async () => {
      //Get a single document from Firestore db.
      //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(db, "users", profileID);
      const docSnap = await getDoc(docRef);
      setProfileData(docSnap.data());
    };
    getData();
  }, [profileID]);

  return (
    <View>
      <Text>{profileData.displayName}</Text>
      <Text>Expertise in: {profileData.interests?.join(", ")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;

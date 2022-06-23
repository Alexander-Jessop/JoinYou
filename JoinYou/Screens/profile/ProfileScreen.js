import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { useLinkProps } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState({});

  const { navigation, route } = props;
  const profileID = route.params.profileID;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  console.log("use is: ", user);

  useEffect(() => {
    const getData = async () => {
      //Get a single document from Firestore databse, by UID
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

      <Button
        onPress={() =>
          navigation.navigate("Upcoming", {
            profileData: profileData,
          })
        }
      >
        See Upcoming Appointments
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;

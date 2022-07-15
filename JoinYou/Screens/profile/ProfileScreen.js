import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { useLinkProps } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";

import Booking from "../../components/Scheduler/Booking";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState({});

  const { navigation, route } = props;
  const profileID = route.params.profileID;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const authContext = useContext(AuthContext);
  const user = authContext.user;

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

  if (user.uid === profileID) {
    //Your own profile page, as an expert
    return (
      <View>
        <Text>{profileData.displayName}</Text>
        <Text>Interested in: {profileData.interests?.join(", ")}</Text>

        <Button onPress={() => navigation.navigate("NewTimeslot")}>
          Add New Timeslot
        </Button>

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
  } else {
    //Someone else's profile page
    return (
      <View>
        <Text>{profileData.displayName}</Text>
        <Text>Expertise in: {profileData.interests?.join(", ")}</Text>
        <Button
          onPress={() =>
            navigation.navigate("Booking", {
              profileData: profileData,
            })
          }
        >
          View Availability
        </Button>
        
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default ProfileScreen;

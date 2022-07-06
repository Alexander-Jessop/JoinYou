import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { Text, Button, Avatar, Card } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import AgendaView from "../../components/Scheduler/AgendaView";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState({});

  const { navigation, route } = props;
  const profileID = route.params.profileID;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const logoutFn = authContext.logout;

  useEffect(() => {
    if (!user) {
      navigation.replace("Login");
    }
  }, [user]);

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

  if (user) {
    if (user.uid === profileID && profileData.isExpert === true) {
      //Your own profile page, as an expert
      let avatarID = profileData?.displayName?.substring(0, 1);
      const profileAvatar = () => (
        <Avatar.Text size={100} label={avatarID} backgroundColor="#007F5F" />
      );

      return (
        <View style={styles.content}>
          <Button
            title="LOG OUT"
            color="#007F5F"
            onPress={() => {
              logoutFn();
              //navigation.replace("Login");
            }}
          >
            Logout
          </Button>
          <Text style={styles.avatar}> {profileAvatar()} </Text>
          <Text style={styles.userName}>{profileData.displayName}</Text>
          <Text style={styles.expertise}>
            Expertise in: {profileData.interests?.join(", ")}
          </Text>

          <Button
            style={styles.button}
            color="#007F5F"
            onPress={() => navigation.navigate("Set Availability")}
          >
            Set Availability
          </Button>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Upcoming Appointments</Text>
              <View style={styles.agenda}>
                <AgendaView typeOfUser={"influencer"} />
              </View>
            </Card.Content>
          </Card>
        </View>
      );
    } else if (user.uid === profileID && profileData.isExpert === false) {
      //Your own profile page, as a regular
      let avatarID = profileData?.displayName?.substring(0, 1);
      const profileAvatar = () => (
        <Avatar.Text size={100} label={avatarID} backgroundColor="#007F5F" />
      );

      return (
        <View style={styles.content}>
          <Button
            title="LOG OUT"
            color="#007F5F"
            onPress={() => {
              logoutFn();
              //navigation.replace("Login");
            }}
          >
            Logout
          </Button>
          <Text style={styles.avatar}> {profileAvatar()} </Text>
          <Text style={styles.userName}>{profileData.displayName}</Text>
          <Text style={styles.expertise}>
            Interested in: {profileData.interests?.join(", ")}
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Upcoming Appointments</Text>
              <View style={styles.agenda}>
                <AgendaView typeOfUser={"client"} />
              </View>
            </Card.Content>
          </Card>
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
  } else {
    // navigation.replace("Login");
    return null;
  }
};

const styles = StyleSheet.create({
  avatar: {
    textAlign: "center",
    marginTop: 20,
  },
  expertise: {
    textAlign: "center",
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  button: {
    marginLeft: 25,
    marginRight: 25,
  },
  view: {
    marginTop: 325,
    width: "90%",
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 110,
  },
  agenda: { width: "100%", height: "74%" },
  card: { width: "100%", height: "100%" },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default ProfileScreen;

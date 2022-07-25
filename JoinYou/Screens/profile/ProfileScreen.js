import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { Text, Button, Avatar, Card } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import AgendaView from "../../components/Scheduler/AgendaView";
import { prodErrorMap } from "firebase/auth";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState({});
  const [price, setPrice] = useState(null);

  const { navigation, route } = props;
  const profileID = route.params.profileID;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const logoutFn = authContext.logout;

  useEffect(() => {
    if (!user) {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
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

  useEffect(() => {
    setPrice(profileData.price);
    console.log("price is here on refresh", price);
  }, [profileData]);

  let avatarID = profileData?.displayName?.substring(0, 1);
  const profileAvatar = () => (
    <Avatar.Text size={100} label={avatarID} backgroundColor="#007F5F" />
  );

  if (user) {
    if (user.uid === profileID && profileData.isExpert === true) {
      //Your own profile page, as an expert
      return (
        <View style={styles.content}>
          <Button
            style={{ marginTop: 50 }}
            title="LOG OUT"
            color="#007F5F"
            icon="logout"
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
          <Text style={{ marginBottom: 10 }}>
            Cost of Appointment: ${price}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              style={styles.button}
              color="#007F5F"
              mode="contained"
              onPress={() =>
                navigation.navigate("Set Price", {
                  profileData: profileData,
                  setPrice: setPrice,
                })
              }
            >
              Set Price
            </Button>

            <Button
              style={styles.button}
              color="#007F5F"
              mode="contained"
              onPress={() => {
                if (profileData.price) {
                  navigation.navigate("Set Availability", {
                    profileData: profileData,
                  });
                } else {
                  Alert.alert(
                    "Please set your price before setting your availability."
                  );
                }
              }}
            >
              Set Availability
            </Button>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Appointments</Text>
              <View style={styles.agenda}>
                <AgendaView typeOfUser={"influencer"} />
              </View>
            </Card.Content>
          </Card>
        </View>
      );
    } else if (user.uid === profileID && profileData.isExpert === false) {
      //Your own profile page, as a regular
      return (
        // <View style={{ backgroundColor: "#D4F2EA" }}>
        <View style={styles.content}>
          <Button
            style={{ padding: 25, marginTop: 25 }}
            title="LOG OUT"
            color="#007F5F"
            icon="logout"
            onPress={() => {
              logoutFn();
              //navigation.replace("Login");
            }}
          >
            Logout
          </Button>
          <Text style={styles.avatar}> {profileAvatar()} </Text>
          <Text style={styles.userName}>{profileData.displayName}</Text>
          <Text
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            Interested in: {profileData.interests?.join(", ")}
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>Appointments</Text>
              <View style={styles.agenda}>
                <AgendaView typeOfUser={"client"} />
              </View>
            </Card.Content>
          </Card>
        </View>
        // </View>
      );
    } else {
      //Someone else's profile page
      return (
        <View style={styles.content}>
          <Text style={styles.avatar}> {profileAvatar()} </Text>
          <Text style={styles.userName}>{profileData.displayName}</Text>
          <Text style={styles.expertise}>
            Expertise in: {profileData.interests?.join(", ")}
          </Text>

          <Button
            color="#007F5F"
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
  },
  expertise: {
    textAlign: "center",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  button: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    // marginTop: 15,
    width: "100%",
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

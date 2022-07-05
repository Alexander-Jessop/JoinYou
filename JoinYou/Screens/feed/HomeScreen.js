import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MainList from "../../components/feed/MainList";
import { Text, Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const logoutFn = authContext.logout;
  const user = authContext.user;

  //const navigation = useNavigation();

  return (
    <ScrollView>
      <Button
        color="#007F5F"
        title="See all categories"
        onPress={() => navigation.navigate("Categories")}
      >
        See All Categories
      </Button>

      <MainList />

      <Button
        title="See My Profile Page"
        color="#007F5F"
        onPress={() =>
          navigation.navigate("Profile", {
            profileID: user.uid,
          })
        }
      >
        See My Profile Page
      </Button>

      <Button
        title="LOG OUT"
        color="#007F5F"
        onPress={() => {
          logoutFn();
          navigation.replace("Login");
        }}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

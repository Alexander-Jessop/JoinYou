import React, { useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MainList from "../../components/feed/MainList";
import { Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const logoutFn = authContext.logout;
  const user = authContext.user;

  //const navigation = useNavigation();

  return (
    <ScrollView>
      <Button
        title="See all categories"
        onPress={() => navigation.navigate("Categories")}
      >
        See All Categories
      </Button>

      <MainList />

      <Button
        title="See My Profile Page"
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

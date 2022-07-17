import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MainList from "../../components/feed/MainList";
import { Text, Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  //const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
    }
  }, [user]);

  return (
    <ScrollView>
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
        color="#007F5F"
        title="See all categories"
        onPress={() => navigation.navigate("Categories")}
      >
        Filter By Category
      </Button>

      <MainList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

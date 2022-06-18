import React, { useContext } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MainList from "../../components/feed/MainList";
import HomeList from "../../components/feed/HomeList";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const logoutFn = authContext.logout;

  //const navigation = useNavigation();

  return (
    <ScrollView>
      <Button
        title="LOG OUT"
        onPress={() => {
          logoutFn();
          navigation.replace("Login");
        }}
      />

      <Text>THIS IS THE HOME SCREEN</Text>

      <MainList />

      <Button
        title="See all categories"
        onPress={() => navigation.navigate("Categories")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

import React, { useContext } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import TagsForm from "../components/registration/TagsForm";
import ExpertList from "../components/feed/ExpertList";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const logoutFn = authContext.logout;

  const navigation = useNavigation();

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
      <ExpertList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

import React, { useContext } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { AuthContext } from "../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import TagsForm from "../components/registration/TagsForm";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const logoutFn = authContext.logout;

  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="LOG OUT"
        onPress={() => {
          logoutFn();
          navigation.replace("Login");
        }}
      />

      <TagsForm />

      <Text>THIS IS THE HOME SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

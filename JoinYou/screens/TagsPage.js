import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { AuthContext } from "../src/AuthProvider";

const TagsPage = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const createUserData = authContext.createUserData;

  return (
    <View>
      <Text>Select your interests:</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TagsPage;

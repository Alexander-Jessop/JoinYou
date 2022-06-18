import React, { useContext, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import InfoForm from "../../components/registration/InfoForm";
import { AuthContext } from "../../src/AuthProvider";

const InfoPage = () => {
  //const authContext = useContext(AuthContext);
  //const updateUserData = authContext.updateUserData;

  return (
    <View>
      <InfoForm
      //updateUserData={updateUserData}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoPage;

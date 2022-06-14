import React, { useContext, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import timezones from "../components/ui/timezones.json";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import InfoForm from "../components/InfoForm";

const InfoPage = () => {
  return (
    <View>
      <InfoForm />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoPage;

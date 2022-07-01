import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ConfirmationPage from "../../components/Scheduler/ConfirmationPage";

const ConfirmationScreen = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;

  return (
    <View>
      <ConfirmationPage />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ConfirmationScreen;

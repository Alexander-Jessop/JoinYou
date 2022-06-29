import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ConfirmationScreen = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;

  return (
    <View>
      <Text>Confirmation Page</Text>
      <Button onPress={navigation.navigate("Appointment")}>Testing </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ConfirmationScreen;

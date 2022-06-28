import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ConfirmationScreen = (props) => {
  const { navigation, route } = props;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;

  return (
    <View>
      <Text>Confirmation Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ConfirmationScreen;

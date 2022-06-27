import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CalendarView from "../../components/Scheduler/CalendarView";

const CalendarScreen = (props) => {
  const { navigation, route } = props;
  const profileData = route.params.profileData;
  console.log("profileData is: ", profileData);
  return (
    <View>
      <Text>Select a day to meet with {profileData.displayName}:</Text>
      <CalendarView />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;

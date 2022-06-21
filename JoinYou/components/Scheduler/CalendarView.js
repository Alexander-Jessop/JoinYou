import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  LocaleConfig,
  Calendar,
  CalendarList,
  Agenda,
} from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

//https://www.npmjs.com/package/react-native-calendars

const CalendarView = () => {
  const selectedDate = [];

  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("Appointments", {
      dateId: selectedDate,
    });
  }

  return (
    <CalendarList
      horizontal={true}
      disableAllTouchEventsForDisabledDays={true}
      pagingEnabled={true}
      onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}
      pastScrollRange={2}
      futureScrollRange={4}
      showScrollIndicator={true}
      onDayPress={(day) => {
        {
          pressHandler();
        }
        selectedDate.push(day.dateString);
        console.log("selected day", day);
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CalendarView;

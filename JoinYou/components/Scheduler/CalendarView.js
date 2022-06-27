import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  LocaleConfig,
  Calendar,
  CalendarList,
  Agenda,
} from "react-native-calendars";

//https://www.npmjs.com/package/react-native-calendars

const CalendarView = () => {
  return (
    <CalendarList
      horizontal={true}
      disableAllTouchEventsForDisabledDays={true}
      pagingEnabled={true}
      onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}
      pastScrollRange={2} // records of past months
      futureScrollRange={6} // how far into the future in months
      showScrollIndicator={true}
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CalendarView;

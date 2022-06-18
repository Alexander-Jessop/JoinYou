import React from "react";
import { View, StyleSheet } from "react-native";
import {
  LocaleConfig,
  Calendar,
  CalendarList,
  Agenda,
} from "react-native-calendars";

//https://www.npmjs.com/package/react-native-calendars

const AgendaView = () => {
  return (
    <View style={styles.container}>
      <Agenda
        loadItemsForMonth={(month) => {
          console.log("trigger items loading");
        }}
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        onDayChange={(day) => {
          console.log("day changed");
        }}
        pastScrollRange={5}
        futureScrollRange={12}
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        renderDay={(day, item) => {
          return <View />;
        }}
        renderEmptyDate={() => {
          return <View />;
        }}
        renderKnob={() => {
          return <View />;
        }}
        renderEmptyData={() => {
          return <View />;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        hideKnob={true}
        showClosingKnob={false}
        disabledByDefault={true}
        onRefresh={() => console.log("refreshing...")}
        refreshing={false}
        refreshControl={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default AgendaView;

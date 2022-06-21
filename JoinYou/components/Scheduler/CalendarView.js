import React from "react";
import { CalendarList } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

//https://www.npmjs.com/package/react-native-calendars

const CalendarView = () => {
  const navigation = useNavigation();

  function pressHandler(selectedDate) {
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
        pressHandler(day.dateString);
        console.log("selected day", day);
      }}
    />
  );
};

export default CalendarView;

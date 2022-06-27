import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import moment from "moment";

const TimeSlots = () => {
  const [timeSlot, setTimeSlot] = useState([]);
  

  const createTimeSlots = (fromTime, toTime) => {
    let startTime = moment(fromTime, "HH:mm");
    let endTime = moment(toTime, "HH:mm");
    if (endTime.isBefore(startTime)) {
      endTime.add(1, "day");
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime, "HH:mm"));
      startTime.add(15, "minutes"); // Blocks of time they want - take block input + 5mins buffer time
    }
    return arr;
  };

  
  useEffect(() => {
    setTimeSlot(createTimeSlots("08:00", "20:00")); // Times they want to work between DYNAMIC input will defaul to TODAY
  }, []);

  // console.log(timeSlot);
  return (
    <ScrollView style={styles.container}>
      <View>
        {timeSlot.map((item, index) => {
          console.log(typeof item);
          return (
            <View key={index}>
              <Text>{item.toString()}</Text>
              <Divider />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
});

export default TimeSlots;

import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const TimeslotDetails = (props) => {
  const { route } = props;
  const timeslotId = route.params.timeslotId;

  return (
    <View>
      <Text>{timeslotId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimeslotDetails;

import { Button, View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import timezones from "../../util/timezones.json";
import { Picker } from "@react-native-picker/picker";

const TimezonePicker = () => {
  const [selectedTimezone, setSelectedTimezone] = useState();

  return (
    <View>

      <Picker
        selectedValue={selectedTimezone}
        onValueChange={(itemValue, itemIndex) => setSelectedTimezone(itemValue)}
        style={{ height: 30, width: 350 }}
        itemStyle={{ fontSize: 12 }}
      >
        {timezones.map((timezone) => (
          <Picker.Item
            label={timezone.text}
            value={timezone.utc[0]}
            key={timezone.utc[0]}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimezonePicker;

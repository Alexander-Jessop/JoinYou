import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import DatepickerRange from "react-native-range-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const NewTimeslotScreen = () => {
  // const [startTime, setStartTime] = useState("");
  // console.log("start time: ", startTime);
  // const [endTime, setEndTime] = useState("");
  // console.log("end time: ", startTime);

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      textColor: "#007F5F",
      color: "#007F5F",
      display: "spinner",
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <View style={styles.container}>
            <DatepickerRange
              untilDate="26062017"
              showClose={false}
              titleFormat="MM YYYY"
              buttonColor="#007F5F"
              todayColor="#D4F2EA"
              maxMonth={3}
              selectedBackgroundColor="#007F5F"
              dayHeaderDividerColor="#007F5F"
              showSelectionInfo={false}
              onConfirm={(startDate, untilDate) =>
                this.setState({ startDate, untilDate })
              }
            />
          </View>
          <View style={styles.timePicker}>
            <View>
              <Divider />
              <Button
                onPress={showTimepicker}
                title="Show time picker"
                color="#007F5F"
                style={styles.button}
              >
                Start time picker
              </Button>
            </View>
            <View>
              <Divider />
              <Button
                onPress={showTimepicker}
                title="Show time picker!"
                color="#007F5F"
                style={styles.button}
              >
                End time picker
              </Button>
            </View>
          </View>
          <Button mode="contained" color="#007F5F" style={styles.submit}>
            Submit
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "79%",
    width: "100%",
  },
  timePicker: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    marginTop: 30,
  },
  submit: {
    marginTop: 40,
  },
});

export default NewTimeslotScreen;

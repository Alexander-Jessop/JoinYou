import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import DatepickerRange from "react-native-range-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import BackendTimeslotCreate from "../../src/BackendTimeslotCreate";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { httpsCallable } from "firebase/functions";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

// https://github.com/apaajabolehd/react-native-range-datepicker#readme

const NewTimeslotScreen = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const profileData = route.params.profileData;
  console.log(`profileData isNEWTIMESLOTSCREEN:`, profileData);
  const [disabled, setDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  console.log("start time: ", startTime);
  console.log(
    "start time in database:",
    moment(startTime).format("MM/DD/YYYY")
  );
  console.log("selectedDate is: ", selectedDate);
  const [endTime, setEndTime] = useState("");
  console.log("end time: ", endTime);
  let shortHandDate = JSON.stringify(selectedDate);
  let timeStampDate = shortHandDate.split("T")[0].replace(/['"]+/g, "");
  let timeStampStart = moment(startTime).format("hh:mm:ss a");
  let timeStampEnd = moment(endTime).format("hh:mm:ss a");
  console.log("timeStampStart", timeStampStart);
  console.log("timeStampEnd", timeStampEnd);

  let endMomentStringFormat = `${timeStampDate} ${timeStampEnd}`;
  let momentStringFormat = `${timeStampDate} ${timeStampStart}`;
  let startDisplay = `${timeStampStart}`;
  let endDisplay = `${timeStampEnd}`;
  console.log("endMomentStringFormat", endMomentStringFormat);
  console.log("momentStringFormat", momentStringFormat);
  let finalStartTimeTimeStamp = moment(
    momentStringFormat,
    "YYYY-MM-DD hh:mm:ss a"
  );
  let finalEndTimeTimeStamp = moment(
    endMomentStringFormat,
    "YYYY-MM-DD hh:mm:ss a"
  );
  let startTimeSeconds = finalStartTimeTimeStamp.unix();
  let endTimeSeconds = finalEndTimeTimeStamp.unix();
  console.log("EndtimeSeconds", endTimeSeconds);
  console.log("startTimeSeconds", startTimeSeconds);
  console.log("finalStartTimeTimeStamp", finalStartTimeTimeStamp);
  console.log("finalEndTimeTimeStamp", finalEndTimeTimeStamp);
  console.log("timeStampDate is: ", timeStampDate);
  console.log("shortHandDate is : ", shortHandDate);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e) => setStartTime(e.nativeEvent.timestamp),
      mode: currentMode,
      is24Hour: true,
      textColor: "#007F5F",
      color: "#007F5F",
    });
  };
  const timeMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (f) => setEndTime(f.nativeEvent.timestamp),
      mode: currentMode,
      is24Hour: true,
      textColor: "#007F5F",
      color: "#007F5F",
    });
  };

  const showStartTimepicker = () => {
    showMode("time");
  };
  const showEndTimepicker = () => {
    timeMode("time");
  };

  // ------------------------------------------------------------------
  const fbContext = useContext(FirebaseContext);
  const cloudFuncs = fbContext.cloudFuncs;
  const [response, setResponse] = useState("Havent created timeslots yet");

  const doCreateTimeslots = async () => {
    let startDateTime = finalStartTimeTimeStamp.valueOf();
    let endDateTime = finalEndTimeTimeStamp.valueOf();
    let influencerName = profileData.displayName;
    let influencerId = profileData.uid;
    console.log(startDateTime.valueOf());
    console.log(endDateTime.valueOf());
    try {
      // front end
      const sedTimeblockFunc = httpsCallable(cloudFuncs, "createTimeslots");
      console.log("THIS IS BEFORE");
      const result = await sedTimeblockFunc({
        influencerName: influencerName,
        startTime: startDateTime,
        endTime: endDateTime,
        inflId: influencerId,
      });
      console.log("THIS IsAFTER");
      // const data = result.data;
      setResponse("data written to newmeetings", result);
    } catch (ex) {
      console.error(ex);
      console.log(`Error: -------`, ex);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Availability Set", `You have set a time on ${timeStampDate}`, [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Home", {
            profileData,
          });
        },
      },
    ]);

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
              showButton={false}
              onConfirm={(startDate, untilDate) =>
                this.setState({ startDate, untilDate })
              }
              onSelect={(startDate, untilDate) => {
                console.log("startDate, untilDate", startDate, untilDate);
                setSelectedDate(startDate);
              }}
            />
          </View>
          <View style={styles.timePicker}>
            <View>
              <Divider />
              <View>
                <Button
                  onPress={showStartTimepicker}
                  title="Show time picker"
                  color="#007F5F"
                  style={styles.button}
                >
                  Start time
                </Button>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {!startDisplay.includes("Invalid date") && (
                  <Text>{startDisplay}</Text>
                )}
              </View>
            </View>

            <View>
              <Divider />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                  onPress={showEndTimepicker}
                  title="Show time picker!"
                  color="#007F5F"
                  style={styles.button}
                >
                  End time
                </Button>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {!endDisplay.includes("Invalid date") && (
                  <Text>{endDisplay}</Text>
                )}
              </View>
            </View>
          </View>
          <View>
            <Button
              mode="contained"
              color="#007F5F"
              style={styles.submit}
              onPress={() => {
                createTwoButtonAlert();
                setDisabled(true);
                doCreateTimeslots();
                setTimeout(() => {
                  setDisabled(false);
                }, 2000);
              }}
              disabled={disabled}
            >
              Submit
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "77%",
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
    marginBottom: 18,
  },
});

export default NewTimeslotScreen;

import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import timezones from "../../util/timezones.json";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Card, Checkbox, Text, TextInput, Button } from "react-native-paper";

const InfoForm = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].text);
  const [checkedExpert, setCheckedExpert] = useState(false);
  const [checkedExpertTwo, setCheckedExpertTwo] = useState(false);

  const navigation = useNavigation();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const createUserData = authContext.createUserData;
  const updateUserData = authContext.updateUserData;

  const onContinueHandler = async () => {
    updateUserData(user, displayName, checkedExpert, selectedTimezone, []);
    navigation.replace("Tags");
  };

  return (
    <View style={styles.content}>
      <View style={styles.view}>
        <Card>
          <Card.Title
            title="Enter Your Details"
            titleStyle={{
              marginBottom: 0,
              paddingBottom: 0,
              color: "#007F5F",
            }}
          />
          <View
            style={{ paddingLeft: 15, paddingBottom: 15, paddingRight: 15 }}
          >
            <Text>Enter Your Display Name:</Text>
            <TextInput
              theme={{
                colors: {
                  primary: "#007F5F",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
              value={displayName}
              onChangeText={(e) => setDisplayName(e)}
              placeholder="Display Name"
              style={styles.input}
            ></TextInput>

            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Are you an expert?</Text>
              <Checkbox
                status={checkedExpert ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckedExpert(!checkedExpert);
                }}
              />
              <Text style={styles.label}>Yes</Text>
              <Checkbox
                status={checkedExpertTwo ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckedExpertTwo(!checkedExpertTwo);
                }}
              />
              <Text style={styles.label}>No</Text>
            </View>

            <Text style={{ marginTop: 40 }}>Select your timezone:</Text>
            <View>
              <Picker
                selectedValue={selectedTimezone}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTimezone(itemValue)
                }
                style={{ height: 30, width: 350 }}
                itemStyle={{ fontSize: 12 }}
              >
                {timezones.map((timezone) => (
                  <Picker.Item
                    label={timezone.text}
                    value={timezone.text}
                    key={timezone.text}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <Text>{"\n"}</Text>
          <Button
            color="#007F5F"
            mode="contained"
            title="Continue"
            onPress={onContinueHandler}
          >
            Continue
          </Button>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 60,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
  },
  view: {
    marginTop: 70,
    width: "90%",
    justifyContent: "center",
    overflow: "hidden",
  },
  input: {
    color: "#FFF",
    height: 45,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  label: {
    marginTop: 10,
  },
});

export default InfoForm;

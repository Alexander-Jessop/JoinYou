import React, { useContext, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import timezones from "../ui/timezones.json";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";

const InfoForm = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].text);
  const [checkedExpert, setCheckedExpert] = useState(false);

  const navigation = useNavigation();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const createUserData = authContext.createUserData;
  const updateUserData = authContext.updateUserData;

  const onContinueHandler = async () => {
    updateUserData(user, displayName, checkedExpert, selectedTimezone);
    navigation.replace("Tags");
  };

  return (
    <View>
      <View>
        <Text>{"\n"}</Text>
        <Text>Enter your Display Name:</Text>
        <TextInput
          value={displayName}
          onChangeText={(e) => setDisplayName(e)}
          placeholder="Display Name"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <Text>{"\n"}</Text>
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Are you an expert?</Text>
        <Checkbox
          status={checkedExpert ? "checked" : "unchecked"}
          onPress={() => {
            setCheckedExpert(!checkedExpert);
          }}
        />
      </View>

      <Text>{"\n"}</Text>
      <Text>Select your timezone:</Text>
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

      <Text>{"\n"}</Text>
      <Button title="Continue" onPress={onContinueHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoForm;

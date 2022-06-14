import React, { useContext, useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import timezones from "../ui/timezones.json";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const InfoForm = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].text);

  const navigation = useNavigation();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const createUserData = authContext.createUserData;

  const onContinueHandler = async () => {
    userUpdateFn = props.userUpdateFn;
    updateUserFn(user, displayName, selectedTimezone, []);
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
              key={timezone.utc[0]}
            />
          ))}
        </Picker>
      </View>

      <Text>{"\n"}</Text>
      <Button title="Continue" onPress={props.pressFunction} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoForm;

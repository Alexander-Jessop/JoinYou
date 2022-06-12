import React, { useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";

const InfoPage = () => {
  const [displayName, setDisplayName] = useState("");

  const onContinueHandler = () => {};

  return (
    <View>
      <Text>Info Page</Text>

      <View>
        <Text>Enter your Display Name:</Text>
        <TextInput
          value={displayName}
          onChangeText={(e) => setDisplayName(e)}
          placeholder="Display Name"
          style={styles.textBoxes}
        ></TextInput>
      </View>

      <Button title="Continue" onPress={onContinueHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoPage;

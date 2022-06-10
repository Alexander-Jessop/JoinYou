import { React, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import ImagePicker from "./ImagePicker";

const ImgForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
    console.log(enteredText);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    backgroundColor: "#fff",
  },
});

export default ImgForm;

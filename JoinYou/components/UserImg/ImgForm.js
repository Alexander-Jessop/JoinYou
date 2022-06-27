import { React, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ImagePicker from "./ImagePicker";
import { Card } from "react-native-paper";

const ImgForm = () => {
  return (
    <ScrollView style={styles.form}>
      <Card>
        <Card.Content>
          <Card.Title title="Add Photos" titleStyle={styles.cardTitle} />
          <View>
            <ImagePicker />
          </View>
        </Card.Content>
      </Card>
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
    marginTop: 10,
  },
  input: {
    color: "#FFF",
    marginTop: 2,
    mode: "outlined",
    margin: 10,
    height: 60,
  },
  cardTitle: {
    color: "#007F5F",
    alignItems: "center",
    // textAlign: "center", move the title to the middle
  },
});

export default ImgForm;

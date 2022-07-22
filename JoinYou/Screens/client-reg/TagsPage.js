import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { Card } from "react-native-paper";
import TagsForm from "../../components/registration/TagsForm";

const TagsPage = () => {
  return (
    <ScrollView>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            marginTop: 70,
            width: "90%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <TagsForm />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default TagsPage;

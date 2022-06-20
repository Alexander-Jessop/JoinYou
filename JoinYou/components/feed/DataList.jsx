import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DataList = (props) => {
  return (
    <View>
      {props.filteredData.map((expert) => {
        return (
          <View key={expert.uid}>
            <Text>Name: {expert.displayName}</Text>

            <Text>Expertise in: {expert.interests.join(", ")}</Text>

            <Text>{"\n"}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default DataList;

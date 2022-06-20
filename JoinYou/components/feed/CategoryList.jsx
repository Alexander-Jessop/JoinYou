import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CategoryList = (props) => {
  return (
    <View>
      {props.expertsByCategory.map((expert) => {
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

export default CategoryList;

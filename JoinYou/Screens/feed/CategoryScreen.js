import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

const CategoryScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Aquariums"
        onPress={() => navigation.navigate("Aquariums")}
      />

      <Button title="Cooking" onPress={() => navigation.navigate("Cooking")} />

      <Button title="Fashion" onPress={() => navigation.navigate("Fashion")} />

      <Button
        title="Fitness"
        onPress={() => navigation.navigate("Aquariums")}
      />

      <Button
        title="Gardening"
        onPress={() => navigation.navigate("Gardening")}
      />

      <Button
        title="Terrariums"
        onPress={() => navigation.navigate("Terrariums")}
      />

      <Button
        title="Videography"
        onPress={() => navigation.navigate("Videography")}
      />

      <Button title="Other" onPress={() => navigation.navigate("Other")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CategoryScreen;

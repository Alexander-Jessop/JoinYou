import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

const CatagoryGridTile = ({ title, color }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable android_ripple={{ color: "#ccc" }} style={styles.button}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
    borderRadius: 10,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CatagoryGridTile;

import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import UserImgItem from "./UserImgItem";

const UserImgList = ({ images }) => {
  if (!images) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No images</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UserImgItem image={item} />}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 20,
  },
});

export default UserImgList;

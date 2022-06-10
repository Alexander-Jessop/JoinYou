import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

const UserImgItem = ({ image, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: image.imageUri }} />
      <View>
        <Text>{image.title}</Text>
        <Text>{image.description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default UserImgItem;

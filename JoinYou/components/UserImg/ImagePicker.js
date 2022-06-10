import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { launchCameraAsync } from "expo-image-picker";

const ImagePicker = () => {
  const takePhotoHandler = async () => {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.75,
    });
    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Snap Photo" onPress={takePhotoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImagePicker;

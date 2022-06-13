import React, { useState } from "react";
import { View, StyleSheet, Button, Image, Alert, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

const ImagePicker = () => {
  const [pickedImg, setPickedImg] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuffiecient Permissions!",
        "You need to grant camera permissions to use this feature."
      );
      return false;
    }
    return true;
  }

  const takePhotoHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.75,
    });
    setPickedImg(image.uri);
    console.log(image, image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImg) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImg }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Snap Photo" onPress={takePhotoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;

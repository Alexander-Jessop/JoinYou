import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { TextInput, Button } from "react-native-paper";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const ImagePicker = () => {
  const [enteredDescription, setEnteredDescription] = useState("");

  const changeDescriptionHandler = (enteredText) => {
    setEnteredDescription(enteredText);
    console.log(enteredText);
  };
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
      aspect: [6, 6],
      quality: 0.75,
    });
    setPickedImg(image.uri);
    console.log("This is the image obj: ", image);
    console.log(image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImg) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImg }} />;
  }

  const savePhotoHandler = () => {
    const imageRef = ref(storage, `images / ${pickedImg}`);
    uploadBytes(imageRef, pickedImg).then(() => {
      alert("Image Uploaded");
    });
  };

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button
        title="Snap Photo"
        onPress={takePhotoHandler}
        mode="contained"
        color="#007F5F"
      >
        SNAP PHOTO
      </Button>
      <TextInput
        style={styles.input}
        onChangeText={changeDescriptionHandler}
        value={enteredDescription}
        label="Add A Description"
        theme={{
          colors: {
            primary: "#007F5F",
            underlineColor: "transparent",
            background: "transparent",
          },
        }}
      />
      <Button
        onPress={savePhotoHandler}
        color="#007F5F"
        style={styles.flatbutton}
        title="Submit"
      >
        Submit
      </Button>
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

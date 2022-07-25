import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, Alert, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { TextInput, Button } from "react-native-paper";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { areCookiesEnabled } from "@firebase/util";
import { fbUriToFirebaseStorage } from "./ImageUpload";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const ImagePicker = (props) => {
  const navigation = useNavigation();

  const profileData = props.profileData;
  const selectedSlot = props.selectedSlot;
  const videoUrl = props.videoUrl;

  const firebaseContext = useContext(FirebaseContext);
  const storage = firebaseContext.storage;

  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const [photoDescription, setPhotoDescription] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const [pickedImg, setPickedImg] = useState();
  const [uploading, setUploading] = useState(false);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const changeDescriptionHandler = (enteredText) => {
    setPhotoDescription(enteredText);
    console.log(enteredText);
  };

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
    setPickedImg(image);
    // console.log("This is the image obj: ", image);
    // console.log(image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImg) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImg.uri }} />
    );
  }

  useEffect(() => {
    if (pickedImg) {
      Alert.alert("Image Uploaded!");

      navigation.navigate("Confirmation", {
        profileData,
        selectedSlot,
        photoUrl,
        photoDescription,
        videoUrl,
      });
    }
  }, [photoUrl]);

  const savePhotoHandler = () => {
    if (pickedImg) {
      fbUriToFirebaseStorage(
        storage,
        pickedImg,
        "images",
        (val) => {
          console.log("val is: ", val);
        },
        (url) => {
          setPhotoUrl(url);
          console.log("ImagePicker: Upload complete! URL is: ", url);
        }
      );
    } else {
      Alert.alert("You must take an image before saving.");
    }
  };

  console.log("pickedImg", pickedImg);

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button
        title="Snap Photo"
        onPress={takePhotoHandler}
        mode="contained"
        color="#007F5F"
        icon="camera"
      >
        SNAP PHOTO
      </Button>
      <TextInput
        style={styles.input}
        onChangeText={changeDescriptionHandler}
        value={photoDescription}
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
        onPress={() => {
          if (pickedImg) {
            setUploading(true);
          }
          savePhotoHandler();
        }}
        color="#007F5F"
        title="Submit"
        disabled={uploading}
        icon="upload"
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

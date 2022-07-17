import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { fbUriToFirebaseStorage } from "./VideoUpload";
import { useNavigation } from "@react-navigation/native";

const Recording = (props) => {
  const navigation = useNavigation();

  const { route } = props;
  const profileData = route.params.profileData;
  const selectedSlot = route.params.selectedSlot;
  const photoUrl = route.params.photoUrl;
  const photoDescription = route.params.photoDescription;

  const firebaseContext = useContext(FirebaseContext);
  const storage = firebaseContext.storage;

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(cameraPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (videoUrl) {
      Alert.alert("Video Uploaded!");

      navigation.navigate("Confirmation", {
        profileData,
        selectedSlot,
        photoUrl,
        photoDescription,
        videoUrl,
      });
    }
  }, [videoUrl]);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion Permissions</Text>;
  } else if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  const recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: "720p",
      maxDuration: 30,
      mute: false,
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  console.log("video is: ", video);

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      // shareAsync(video.uri);
      // setVideo(undefined);
      fbUriToFirebaseStorage(
        storage,
        video,
        "videos",
        (val) => {
          console.log("val is: ", val);
        },
        (url) => {
          setVideoUrl(url);
          console.log("Recording: Upload complete! URL is: ", url);
        }
      );
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          source={{ uri: video.uri }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLoooping
        />
        <Button title="Share" onPress={shareVideo} />
        {/* {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined} */}
        <Button title="Trash" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? "Stop Recording" : "Record Video"}
          onPress={isRecording ? stopRecording : recordVideo}
        />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default Recording;

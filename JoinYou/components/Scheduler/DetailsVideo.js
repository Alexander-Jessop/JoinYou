import React, { startTransition } from "react";
import { View, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { Button, Text } from "react-native-paper";

const DetailsVideo = (props) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  console.log("timeslotData", timeslotData);
  const { route } = props;
  const timeslotData = route.params.timeslotData;

  if (timeslotData.videoUrl) {
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: timeslotData.videoUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            color="#007F5F"
            mode="contained"
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            {status.isPlaying ? "Pause" : "Play"}
          </Button>
        </View>
      </View>
    );
  } else {
    return <Text>No video available</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsVideo;

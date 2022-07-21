import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  RecyclerViewBackedScrollView,
} from "react-native";
import JoinScreen from "./theScreens/JoinScreen";
import CallScreen from "./theScreens/CallScreen";
import RoomScreen from "./theScreens/RoomScreen";
import { useNavigation } from "@react-navigation/native";
// import RoomScreen from "./screens/RoomScreen";
// import CallScreen from "./screens/CallScreen";
// import JoinScreen from "./screens/JoinScreen";

export default function Something(props) {
  const { route } = props;
  const screens = {
    ROOM: "JOIN_ROOM",
    CALL: "CALL",
    JOIN: "JOIN",
  };
  const roomId = route.params.roomId;
  const typeOfUser = route.params.typeOfUser;
  // const [roomId, setRoomId] = useState("");

  if (typeOfUser === "influencer") {
    let content = <CallScreen roomId={roomId} />;
    return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
  } else if (typeOfUser === "client") {
    let content = <JoinScreen roomId={roomId} />;
    return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

// render join screen if typeOfUser is influencer

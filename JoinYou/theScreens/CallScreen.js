import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
import { FirebaseContext } from "../src/FirebaseProvider";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../src/AuthProvider";
import { Button } from "react-native-paper";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function CallScreen({ setScreen, screens, roomId }) {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigation = useNavigation();

  const { db } = useContext(FirebaseContext);

  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    // setLocalStream();
    // setRemoteStream();
    // setCachedLocalPC();
    // cleanup
    navigation.navigate("Profile", { profileID: user.uid });
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? "front" : "environment";
    const videoSourceId = devices.find(
      (device) => device.kind === "videoinput" && device.facing === facing
    );
    const facingMode = isFront ? "user" : "environment";
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const startCall = async (id) => {
    console.log("startCall id", id);
    const collectionRef = collection(db, "rooms");
    const roomRef = doc(collectionRef, id);
    await setDoc(roomRef, {
      nothing: "nothing",
    });
    console.log("blah");
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);

    const callerCandidatesCollection = collection(
      db,
      `rooms/${id}/callerCandidates`
    );
    localPC.onicecandidate = async (e) => {
      if (!e.candidate) {
        console.log("Start Call Got final candidate!");
        return;
      }
      await addDoc(callerCandidatesCollection, e.candidate.toJSON());
      // callerCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = (e) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log("RemotePC received the stream call", e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    const roomWithOffer = { offer };

    console.log("I GOT HERE !!!!!!!!!!!!");
    await setDoc(roomRef, roomWithOffer);
    console.log("I ADDED SHIT");
    // await roomRef.set(roomWithOffer);

    onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (!localPC.currentRemoteDescription && data.answer) {
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await localPC.setRemoteDescription(rtcSessionDescription);
      }
    });
    const calleeCollection = collection(db, `rooms/${id}/calleeCandidates`);
    onSnapshot(calleeCollection, async (snapshot) => {
      // roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <>
      <View style={{ display: "flex", flex: 1, padding: 10 }}>
        <View style={styles.rtcview}>
          {localStream && (
            <RTCView
              style={styles.rtc}
              streamURL={localStream && localStream.toURL()}
            />
          )}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && (
            <RTCView
              style={styles.rtc}
              streamURL={remoteStream && remoteStream.toURL()}
            />
          )}
        </View>
      </View>
      <View style={styles.callButtons}>
        <View styles={styles.buttonContainer}>
          <Button
            title="stop call"
            onPress={onBackPress}
            color="#007F5F"
            mode="contained"
            icon="stop"
          >
            Stop Call
          </Button>
        </View>
        <View styles={styles.buttonContainer}>
          {!localStream && (
            <Button
              title="Click to start stream"
              onPress={startLocalStream}
              color="#007F5F"
              mode="contained"
            >
              Start Stream
            </Button>
          )}
          {localStream && (
            <Button
              title="start call"
              onPress={() => startCall(roomId)}
              disabled={!!remoteStream}
              color="#007F5F"
              mode="contained"
              icon="play"
            >
              {" "}
              Start Call
            </Button>
          )}
        </View>
      </View>

      {localStream && (
        <View style={styles.toggleButtons}>
          <Button
            title="Switch camera"
            onPress={switchCamera}
            color="#007F5F"
            mode="contained"
            icon="camera-flip"
          >
            Switch Camera
          </Button>
          <Button
            title={`${isMuted ? "Unmute" : "Mute"} stream`}
            onPress={toggleMute}
            disabled={!remoteStream}
            color="#007F5F"
            mode="contained"
            icon={isMuted ? "volume-high" : "volume-off"}
          >{`${isMuted ? "Unmute" : "Mute"} stream`}</Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    margin: 5,
  },
  rtc: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  toggleButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  callButtons: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    margin: 5,
  },
});

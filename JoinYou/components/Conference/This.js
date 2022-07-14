import { useState, useContext, useRef } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
} from "react-native-webrtc";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { Button, TextInput } from "react-native-paper";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

function This() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const configuration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [roomId, setRoomId] = useState(null);

  let peerConnection = null;

  async function createRoom() {
    const roomRef = doc(db, "rooms", roomId);
    // might need code below to create a room
    // const collectionRef = await collection(db, "rooms");
    // console.log("Create PeerConnection with configuration: ", configuration);
    // console.log("roomRef is: ", roomRef);
    peerConnection = new RTCPeerConnection(configuration);

    // registerPeerConnectionListeners();
    // console.log(
    //   "registerPeerConnectionListeners() is : ",
    //   registerPeerConnectionListeners()
    // );

    // console.log("peerConnection is: ", peerConnection);

    localStream.getTracks().forEach((track) => {
      peerConnection?.addStream(track, localStream);
    });
    // Code for collecting ICE candidates below
    const callerCandidatesCollection = collection(
      db,
      `rooms/${roomId}/callerCandidates`
    );

    peerConnection.addEventListener("icecandidate", (event) => {
      if (!event.candidate) {
        console.log("Got final candidate!", event);
        return;
      }
      // console.log("Got candidate: ", event.candidate);
      addDoc(callerCandidatesCollection, event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    // console.log("Created offer:", offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await setDoc(doc(db, "rooms", roomId), roomWithOffer);

    peerConnection.addEventListener("track", (event) => {
      // console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        // console.log("Add a track to the remoteStream:", track);
        remoteStream.addStream(track);
      });
    });

    // Listening for remote session description below
    onSnapshot(roomRef, async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        // console.log("Got remote description: ", data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    const calleeCollection = collection(db, `rooms/${roomId}/calleeCandidates`);
    onSnapshot(calleeCollection, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
  }

  function joinRoom() {
    // not needed for our project
    // document.querySelector("#createBtn").disabled = true;
    // document.querySelector("#joinBtn").disabled = true;
    // onPress handles function in JSX on bottom of page
    // document.querySelector("#confirmJoinBtn").addEventListener(
    //   "click",

    console.log("Join room: ", roomId);
    // No need to inform the user if they're the callee
    // document.querySelector(
    //   "#currentRoom"
    // ).innerText = `Current room is ${roomId} - You are the callee!`;
    joinRoomById(roomId);

    // );
    // roomDialog.open();
  }

  async function joinRoomById() {
    // redundant code as it's within block scope
    // const db = firebase.firestore();
    // console.log("Im here:", roomId);
    const roomRef = doc(collection(db, "rooms"), roomId);
    // console.log("roomRef is: ", roomRef);
    const roomSnapshot = await getDoc(roomRef);
    // console.log("Got room:", roomSnapshot.exists);
    // console.log("roomSnapshot is : ", roomSnapshot);
    if (roomSnapshot.exists) {
      // console.log("Create PeerConnection with configuration: ", configuration);
      peerConnection = new RTCPeerConnection(configuration);
      // console.log("peerConnection is: ", peerConnection);
      localStream.getTracks().forEach((track) => {
        peerConnection.addStream(track, localStream);
      });

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = collection(
        db,
        `rooms/${roomId}/calleeCandidates`
      );
      peerConnection.addEventListener("icecandidate", (event) => {
        console.log("event: ", event);
        if (!event.candidate) {
          console.log("Got final candidate!");
          return;
        }
        addDoc(calleeCandidatesCollection, event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      peerConnection.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          // console.log("Add a track to the remoteStream:", track);
          remoteStream.addStream(track);
        });
      });

      // Code for creating SDP answer below
      const offer = roomSnapshot.data().offer;
      // console.log("Got offer:", offer);
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.createAnswer();
      // console.log("Created answer:", answer);
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await setDoc(roomRef, roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      const callerCollection = collection(
        roomRef,
        `rooms/${roomId}/callerCandidates`
      );
      onSnapshot(callerCollection, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            // console.log(
            //   `Got new remote ICE candidate: ${JSON.stringify(data)}`
            // );
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
    }
  }

  async function openUserMedia(e) {
    const stream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
    setRemoteStream(new MediaStream());
    // document.querySelector("#remoteVideo").srcObject = remoteStream;  ******* need to update this

    // console.log("Stream:", document.querySelector("#localVideo").srcObject); ******* need to update this
    // Will add if extra time allows for it
    // document.querySelector("#cameraBtn").disabled = true;
    // document.querySelector("#joinBtn").disabled = false;
    // document.querySelector("#createBtn").disabled = false;
    // document.querySelector("#hangupBtn").disabled = false;
  }

  async function hangUp(e) {
    const tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    if (peerConnection) {
      peerConnection.close();
    }
    //  Will add if extra time allows for it
    // document.querySelector("#localVideo").srcObject = null;
    // document.querySelector("#remoteVideo").srcObject = null;
    // document.querySelector("#cameraBtn").disabled = false;
    // document.querySelector("#joinBtn").disabled = true;
    // document.querySelector("#createBtn").disabled = true;
    // document.querySelector("#hangupBtn").disabled = true;
    // document.querySelector("#currentRoom").innerText = "";

    // Delete room on hangup
    if (roomId) {
      // redundant code as it's within block scope
      // const db = firebase.firestore();
      const roomRef = await getDoc(collection(db, "rooms"), roomId);
      const calleeCollection = collection(
        db,
        `rooms/${roomId}/calleeCandidates`
      );
      const calleeCandidates = await getDocs(calleeCollection);
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await getDocs(
        collection(db, `rooms/${roomId}/calleCandidates`),
        roomId
      );

      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }

    // document.location.reload(true); can't documet.reload() in reactnative
  }

  // function registerPeerConnectionListeners() {
  //   peerConnection.addEventListener("icegatheringstatechange", () => {
  //     console.log(
  //       `ICE gathering state changed: ${peerConnection.iceGatheringState}`
  //     );
  //   });

  //   peerConnection.addEventListener("connectionstatechange", () => {
  //     console.log(`Connection state change: ${peerConnection.connectionState}`);
  //   });

  //   peerConnection.addEventListener("signalingstatechange", () => {
  //     console.log(`Signaling state change: ${peerConnection.signalingState}`);
  //   });

  //   peerConnection.addEventListener("iceconnectionstatechange ", () => {
  //     console.log(
  //       `ICE connection state change: ${peerConnection.iceConnectionState}`
  //     );
  //   });
  // }

  // const start = async () => {
  //   console.log("start");
  //   if (!stream) {
  //     let s;
  //     try {
  //       s = await mediaDevices.getUserMedia({ video: true, audio: true });
  //       setStream(s);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  // const stop = () => {
  //   console.log("stop");
  //   if (stream) {
  //     stream.release();
  //     setStream(null);
  //   }
  // };
  console.log("remoteStream is: ", remoteStream);
  console.log("localStream is: ", localStream);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {localStream && (
          <RTCView streamURL={localStream.toURL()} style={{ flex: 1 }} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        {remoteStream && (
          <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} />
        )}
      </View>
      <View>
        <TextInput
          onChangeText={(e) => setRoomId(e)}
          placeholder="Enter Room ID"
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button onPress={openUserMedia}>Start</Button>
        <Button onPress={createRoom}>Create Room</Button>
        <Button onPress={joinRoomById}>Join</Button>
        <Button onPress={hangUp}>Stop</Button>
        {/* replace stop with hangUp when ready */}
      </View>
    </SafeAreaView>
  );
}
export default This;

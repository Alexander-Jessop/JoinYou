import { useState, useContext } from "react";
import { View, Text } from "react-native";
import { mediaDevices, RTCView } from "react-native-webrtc";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { Button, Avatar, Card, TextInput } from "react-native-paper";

const fbContext = useContext(FirebaseContext);
const db = fbContext.db;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

// function WebRTC() {
//   const [stream, setStream] = useState(null);

//   const start = async () => {
//     console.log("start");
//     if (!stream) {
//       let s;
//       try {
//         s = await mediaDevices.getUserMedia({ video: true audio: true });
//         setStream(s);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };

//   const stop = () => {
//     console.log("stop");
//     if (stream) {
//       stream.release();
//       setStream(null);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" />
//       <View style={{ flex: 1 }}>
//         {stream && <RTCView streamURL={stream.toURL()} style={{ flex: 1 }} />}
//       </View>
//       <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
//         <Button title="Start" onPress={start} />
//         <Button title="Stop" onPress={stop} />
//       </View>
//     </SafeAreaView>
//   );
// }

function WebRTC() {
  const [currentPage, setcCurrentPage] = useState("home");
  const [joinCode, setJoinCode] = useState("");

  return (
    <View>
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setcCurrentPage}
        />
      ) : (
        <Video mode={currentPage} callId={joinCode} setPage={setcCurrentPage} />
      )}
    </View>
  );
}

function Menu({ joinCode, setJoinCode, setPage }) {
  return (
    <View>
      <View>
        <Button onPress={() => setPage("create")}>Create Call</Button>
      </View>
      <View>
        <TextInput
          label="Join With Code"
          placeholder="Join With Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        ></TextInput>
        <View>
          <Button onPress={() => setPage("Join")}>Answer</Button>
        </View>
      </View>
    </View>
  );
}

function Video({ mode, callId, setPage }) {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState(callId);

  const localRef = useRef();
  const remoteRef = useRef();

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === "create") {
      const callDoc = db.collection("calls").doc();
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      setRoomId(callDoc.id);

      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
      await callDoc.set({ offer });

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    } else if (mode === "join") {
      const callDoc = db.collection("calls").doc(callId);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };
      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        sdp: answerDescription.sdp,
        type: answerDescription.type,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
    pc.onconnectionstatechange = (event) => {
      console.log(pc.connectionState);
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      let roomRef = db.collection("calls").doc(roomId);
      await roomRef
        .collection("answerCandidates")
        .get()
        .then((snapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef
        .collection("offerCandidates")
        .get()
        .then((snapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef.delete();
    }
    window.location.reload();
  };

  return (
    <View>
      <View>
        <Video ref={localRef} autoPlay playsInline />
      </View>
      <Button onPress={hangUp}>Hang Up</Button>
      <Button
        onPress={() => {
          navigator.clipboard.writeText(roomId);
        }}
      >
        Copy Joining Code
      </Button>
      <View>
        <Video ref={remoteRef} autoPlay playsInline />
      </View>
    </View>
  );
}

export default WebRTC;

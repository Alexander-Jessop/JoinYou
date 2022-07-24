import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text, TextInput, Title } from "react-native-paper";

const ConfirmationPage = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const profileData = route.params.profileData;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;
  const photoUrl = route.params.photoUrl;
  const photoDescription = route.params.photoDescription;
  const videoUrl = route.params.videoUrl;

  const [meetingDescription, setMeetingDescription] = useState("");

  // console.log("videoUrl is: ", videoUrl);

  const onPaymentHandler = () => {
    if (meetingDescription.length < 1) {
      Alert.alert("You must enter a description for your meeting.");
    } else {
      navigation.navigate("Payment", {
        profileData,
        selectedSlot,
        selectedDate,
        meetingDescription,
        photoUrl,
        photoDescription,
        videoUrl,
      });
    }
  };

  return (
    <View
      style={{
        marginTop: 40,
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 70,
          marginLeft: 40,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Card>
          <Card.Content>
            <Title
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#007F5F",
              }}
            >
              Booking an appointment with:
            </Title>
            <Title
              style={{
                textAlign: "center",

                fontSize: 19,
              }}
            >
              {profileData.displayName}
            </Title>
            <Title
              style={{
                textAlign: "center",
                fontSize: 19,
              }}
            >
              {selectedSlot.startTime} on {selectedDate}
            </Title>
            <Text style={{ marginTop: 15 }}>Describe Your Appointment</Text>
            <TextInput
              label="200 Characters max"
              multiline={true}
              maxLength={200}
              selectionColor="#007f5f"
              underlineColor="#007f5f"
              activeOutlineColor="#007f5f"
              activeUnderlineColor="#007f5f"
              onChangeText={(e) => setMeetingDescription(e)}
            />
            <View style={{ marginTop: 20, marginBottom: 5 }}>
              <Button
                color="#007F5F"
                onPress={() => {
                  navigation.navigate("Video", {
                    profileData,
                    selectedSlot,
                    meetingDescription,
                    photoUrl,
                    photoDescription,
                  });
                }}
              >
                Take a Video
              </Button>
              <Button
                style={{ marginTop: 5 }}
                color="#007F5F"
                onPress={() => {
                  navigation.navigate("Photo", {
                    profileData,
                    selectedSlot,
                    meetingDescription,
                    videoUrl,
                  });
                }}
              >
                Take a Photo
              </Button>
            </View>
            <Button color="#007F5F" mode="contained" onPress={onPaymentHandler}>
              Payment
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "#007f5f",
  },
});

export default ConfirmationPage;

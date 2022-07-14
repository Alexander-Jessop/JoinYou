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

  console.log("videoUrl is: ", videoUrl);

  const onPaymentHandler = () => {
    if (meetingDescription.length > 0) {
      Alert.alert("You must enter a description for your meeting.");
    } else if (!videoUrl) {
      Alert.alert("You must upload at least a video for your meeting.");
    } else {
      navigation.navigate("Payment", {
        selectedSlot,
        profileData,
      });
    }
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Title>
            Booking an appointment with: {profileData.displayName} at{" "}
            {selectedSlot.startTime} on {selectedDate}
          </Title>

          <TextInput
            label="Describe your appointment (200 characters max)"
            multiline={true}
            maxLength={200}
            selectionColor="#007f5f"
            underlineColor="#007f5f"
            activeOutlineColor="#007f5f"
            activeUnderlineColor="#007f5f"
            onChangeText={(e) => setMeetingDescription(e)}
          />

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
        </Card.Content>
      </Card>

      <Button color="#007F5F" mode="contained" onPress={onPaymentHandler}>
        Payment
      </Button>
    </View>
  );
};;

const styles = StyleSheet.create({
  button: {
    color: "#007f5f",
  },
});

export default ConfirmationPage;

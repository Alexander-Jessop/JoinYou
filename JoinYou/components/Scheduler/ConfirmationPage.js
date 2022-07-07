import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text, TextInput, Title } from "react-native-paper";

const ConfirmationPage = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const selectedDate = route.params.selectedDate;
  const selectedSlot = route.params.selectedSlot;

  const [description, setDescription] = useState("");

  return (
    <View>
      <Card>
        <Card.Content>
          <Title>
            Booking an appointment for: {selectedSlot}, {selectedDate}
          </Title>

          <TextInput
            label="Describe your appointment (200 characters max)"
            multiline={true}
            maxLength={200}
            selectionColor="#007f5f"
            underlineColor="#007f5f"
            activeOutlineColor="#007f5f"
            activeUnderlineColor="#007f5f"
            onChangeText={(e) => setDescription(e)}
          />

          <Button
            color="#007F5F"
            onPress={() => {
              navigation.navigate("Video");
            }}
          >
            Take a Video
          </Button>
          <Button
            color="#007F5F"
            onPress={() => {
              navigation.navigate("Photo");
            }}
          >
            Take a Photo
          </Button>
        </Card.Content>
      </Card>

      <Button
        color="#007F5F"
        mode="contained"
        onPress={() => {
          navigation.navigate("Payment");
        }}
      >
        Payment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "#007f5f",
  },
});

export default ConfirmationPage;

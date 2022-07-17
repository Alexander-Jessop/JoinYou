import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, Title } from "react-native-paper";

const PaymentSuccess = (props) => {
  const { route } = props;
  const profileData = route.params.profileData;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;

  const navigation = useNavigation();
  return (
    <View>
      <Card>
        <Title>
          {"\n"}
          {"\n"}
          Payment Complete!
          {"\n"}
          {"\n"}You are scheduled for an appointment with{" "}
          {profileData.displayName} at {selectedSlot.startTime} on{" "}
          {selectedDate}!{"\n"}
          {"\n"} You can view your upcoming appointments on your profile page.
        </Title>
      </Card>
      <Button
        color="#007F5F"
        onPress={() => {
          navigation.reset({
            routes: [{ name: "Home" }],
          });
        }}
      >
        Go Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PaymentSuccess;

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
    <View
      style={{
        marginTop: 60,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          marginTop: 125,
          width: "90%",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Card style={{ padding: 10 }}>
          <Title style={{ textAlign: "center" }}>
            {"\n"}
            Payment Complete!
            {"\n"}
            {"\n"}You are scheduled for an appointment with{" "}
            {profileData.displayName} at {selectedSlot.startTime} on{" "}
            {selectedDate}
            {"\n"}
            {"\n"} You can view your upcoming appointments on your profile page.
            {"\n"}
          </Title>
        </Card>
        <Button
          color="#007F5F"
          mode="contained"
          icon="home"
          onPress={() => {
            navigation.reset({
              routes: [{ name: "Home" }],
            });
          }}
        >
          Go Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PaymentSuccess;

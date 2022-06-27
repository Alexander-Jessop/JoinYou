import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#007F5F",
          image: <Image source={require("../../assets/onboarding-img1.png")} />,
          title: "Connect With The World",
          subtitle: "A New Way To Connect",
        },
        {
          backgroundColor: "#007F5F",
          image: <Image source={require("../../assets/onboarding-img2.png")} />,
          title: "Share Your Expertise",
          subtitle:
            "Share Your Thoughts And Develop Your Skills With Similar Kinds Of People",
        },
        {
          backgroundColor: "#007F5F",
          image: <Image source={require("../../assets/onboarding-img3.png")} />,
          title: "Become The Star",
          subtitle: "Let The Spot Light Capture You",
        },
      ]}
      onSkip={() => {
        navigation.replace("Register");
      }}
      onDone={() => {
        navigation.replace("Register");
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    felx: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default OnboardingScreen;

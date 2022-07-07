import React, { useContext, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Onboarding from "react-native-onboarding-swiper";
import { AuthContext } from "../../src/AuthProvider";

const OnboardingScreen = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigation = useNavigation();

  //if a user is logged in, navigation.reset to Home Screen
  //https://reactnavigation.org/docs/navigation-prop/#reset
  useEffect(() => {
    if (user) {
      navigation.reset({
        routes: [{ name: "Home" }],
      });
    }
  }, [user]);

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

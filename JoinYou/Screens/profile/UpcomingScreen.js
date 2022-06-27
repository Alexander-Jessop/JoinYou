import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

const UpcomingScreen = (props) => {
  const { navigation, route } = props;
  const profileData = route.params.profileData;

  return (
    <View>
      <Text>Upcoming Appointments for {profileData.displayName}</Text>
    </View>
  );
};

export default UpcomingScreen;

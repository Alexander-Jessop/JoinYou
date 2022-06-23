import { View, Text } from "react-native";
import React from "react";

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

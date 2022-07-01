import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const ConfirmationPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("Video");
        }}
      >
        Take Video
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Photo");
        }}
      >
        Take Photo
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ConfirmationPage;

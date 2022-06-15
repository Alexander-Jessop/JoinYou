import { View, Text } from "react-native";
import React from "react";
import CategoryList from "../../components/feed/CategoryList";

const Gardening = () => {
  return (
    <View>
      <CategoryList category="Gardening" />
    </View>
  );
};

export default Gardening;

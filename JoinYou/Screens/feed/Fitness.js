import { View, Text } from "react-native";
import React from "react";
import CategoryList from "../../components/feed/CategoryList";

const Fitness = () => {
  return (
    <View>
      <CategoryList category="Fitness" />
    </View>
  );
};

export default Fitness;

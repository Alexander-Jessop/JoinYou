import { View, Text } from "react-native";
import React from "react";
import CategoryList from "../../components/feed/CategoryList";

const Cooking = () => {
  return (
    <View>
      <CategoryList category="Cooking" />
    </View>
  );
};

export default Cooking;

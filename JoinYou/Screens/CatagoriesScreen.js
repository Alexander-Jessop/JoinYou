import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../Data/dummy-data";
import CatagoryGridTile from "../components/CatagoryGrid/CatagoryGridTile";

const renderCategoryItem = (itemData) => {
  return (
    <CatagoryGridTile title={itemData.item.title} color={itemData.item.color} />
  );
};

const CatagoriesScreen = () => {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default CatagoriesScreen;

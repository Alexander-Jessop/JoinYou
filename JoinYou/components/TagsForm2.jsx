import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { AuthContext } from "../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const categories = [
  "Aquariums",
  "Cooking",
  "Fashion",
  "Gardening",
  "Fitness",
  "Videography",
  "Other",
];

const TagsForm = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => {
      return { title: category, selected: false };
    })
  );

  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateUserInterests = authContext.updateUserInterests;

  const onFinishHandler = () => {
    const interestArray = categories.filter((category, index) => {
      return selectedCategories[index];
    });
    updateUserInterests(interestArray);
    navigation.replace("Home");
  };

  const onFinishHandler = () => {
    const interestArray = selectedCategories
      .filter((category) => {
        return category.selected;
      })
      .map((category) => {
        return category.title;
      });
    updateUserInterests(interestArray);
    navigation.replace("Home");
  };

  return (
    <View>
      {selectedCategories.map((category, index) => {
        return (
          <View key={category.title} style={styles.checkboxContainer}>
            <Checkbox
              status={category.selected ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedCategories((current) => {
                  return current.map((c, i) => {
                    if (i === index) {
                      return {
                        ...c,
                        selected: !c.selected,
                      };
                    } else {
                      return c;
                    }
                  });
                });
              }}
            />
            <Text style={styles.label}>{category.title}</Text>
          </View>
        );
      })}
      <Button title="Finish" onPress={onFinishHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default TagsForm;

import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
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
    Array(categories.length).fill(false)
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

  return (
    <View>
      {selectedCategories.map((category, index) => {
        return (
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={category ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedCategories((current) => {
                  return current.map((c, i) => {
                    if (i === index) {
                      return !c;
                    } else {
                      return c;
                    }
                  });
                });
              }}
            />
            <Text style={styles.label}>{categories[index]}</Text>
          </View>
        );
      })}
      <Text>{"\n"}</Text>
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

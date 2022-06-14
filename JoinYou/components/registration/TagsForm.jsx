import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const tags = [
  "Aquariums",
  "Cooking",
  "Fashion",
  "Gardening",
  "Fitness",
  "Videography",
  "Other",
];

const TagsForm = () => {
  const [selectedTags, setSelectedTags] = useState(
    Array(categories.length).fill(false)
  );

  const navigation = useNavigation();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateUserInterests = authContext.updateUserInterests;

  const onFinishHandler = () => {
    const interestArray = tags.filter((tag, index) => {
      return selectedTags[index];
    });
    updateUserInterests(interestArray);
    navigation.replace("Home");
  };

  return (
    <View>
      {selectedTags.map((tag, index) => {
        return (
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={tag ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedTags((current) => {
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
            <Text style={styles.label}>{tags[index]}</Text>
          </View>
        );
      })}
      <Text>{"\n"}</Text>
      <Button title="Finish" onPress={onFinishHandler} />
      <Button
        title="CONSOLE LOG"
        onPress={() => {
          console.log(selectedTags);
        }}
      />
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

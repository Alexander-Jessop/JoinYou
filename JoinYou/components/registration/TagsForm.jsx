import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Checkbox, Button } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

import tags from "../../util/tags.json";

const TagsForm = () => {
  const [selectedTags, setSelectedTags] = useState(
    Array(tags.length).fill(false)
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
          <View style={styles.checkboxContainer} key={tags[index]}>
            <Checkbox
              status={tag ? "checked" : "unchecked"}
              key={tags[index]}
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
      <Button
        color="#007F5F"
        mode="contained"
        title="Finish"
        onPress={onFinishHandler}
      >
        Finish
      </Button>
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

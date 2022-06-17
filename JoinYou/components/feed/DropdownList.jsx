import React from "react";
import { View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import tags from "../../util/tags";

const DropdownList = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const onPressHandler = () => {};

  return (
    <List.Section title="categories">
      <List.Accordion
        title="See All Categories"
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
      >
        {tags.map((tag) => {
          return (
            <List.Item
              title={tag}
              onPress={() => {
                console.log(tag);
              }}
            />
          );
        })}
      </List.Accordion>
    </List.Section>
  );
};

const styles = StyleSheet.create({});

export default DropdownList;

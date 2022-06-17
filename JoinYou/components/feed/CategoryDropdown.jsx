import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { FirebaseContext } from "../../src/FirebaseProvider";
import tags from "../../util/tags.json";
import { List } from "react-native-paper";
//https://callstack.github.io/react-native-paper/list-accordion.html

const CategoryDropdown = (props) => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [expertsByCategory, setExpertsByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Aquariums");
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    let collectionRef = collection(db, "users");
    let queryRef = query(collectionRef, orderBy("displayName"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let usersData = querySnap.docs.map((doc) => doc.data());

        let expertsData = usersData?.filter((user) => {
          return user.isExpert;
        });

        let filteredByCategory = expertsData?.filter((expert) => {
          return expert.interests.includes(selectedCategory);
        });

        setExpertsByCategory(filteredByCategory);
      }
    });
    return unsubscribe;
  }, [selectedCategory]);

  return (
    <ScrollView>
      <List.Section title="categories">
        <List.Accordion
          title="See All Categories"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}
        >
          {tags.map((tag) => {
            return (
              <List.Item title={tag} onPress={() => setSelectedCategory(tag)} />
            );
          })}
        </List.Accordion>
      </List.Section>

      <View>
        {expertsByCategory.map((expert) => {
          return (
            <View key={expert.uid}>
              <Text style={{ fontSize: 20 }}>Name: {expert.displayName}</Text>

              <Text style={{ fontSize: 16 }}>
                Expertise in: {expert.interests.join(", ")}
              </Text>

              <Text>{"\n"}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default CategoryDropdown;
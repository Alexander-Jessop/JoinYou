import {
  collection,
  onSnapshot,
  orderBy,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { FirebaseContext } from "../../src/FirebaseProvider";
import tags from "../../util/tags.json";
import { List } from "react-native-paper";
//https://callstack.github.io/react-native-paper/list-accordion.html
import DataList from "./DataList";

const CategoryDropdown = (props) => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [expertsByCategory, setExpertsByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    //Get multiple documents from a collection with a filter.
    //Changed .forEach() to .map()
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const getData = async () => {
      const q = query(collection(db, "users"), where("isExpert", "==", true));
      const querySnapshot = await getDocs(q);
      const expertArray = querySnapshot.docs.map((doc) => doc.data());

      //Second filter. Filtering by selected category.
      const filteredByCategory = expertArray.filter((expert) => {
        return expert.interests.includes(selectedCategory);
      });

      setExpertsByCategory(filteredByCategory);
    };
    getData();
  }, [selectedCategory]);

  return (
    <ScrollView>
      <List.Section>
        <List.Accordion
          title={selectedCategory}
          titleStyle={{ color: "#007F5F", fontSize: 20 }}
          left={(props) => <List.Icon {...props} />}
          expanded={expanded}
          onPress={handlePress}
        >
          {tags.map((tag) => {
            return (
              <List.Item
                title={tag}
                key={tag}
                onPress={() => {
                  setSelectedCategory(tag);
                  setExpanded(false);
                }}
              />
            );
          })}
        </List.Accordion>
      </List.Section>

      <View>
        <DataList data={expertsByCategory} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default CategoryDropdown;

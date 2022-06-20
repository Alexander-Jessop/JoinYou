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
import CategoryList from "./CategoryList";

const CategoryDropdown = (props) => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [expertsByCategory, setExpertsByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("See All Categories");
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    // //Query snapshot that returns all users in the firestore db.
    // let collectionRef = collection(db, "users");
    // let queryRef = query(collectionRef, orderBy("displayName"));
    // const unsubscribe = onSnapshot(queryRef, (querySnap) => {
    //   if (querySnap.empty) {
    //     console.log("No docs found");
    //   } else {
    //     //Map over the query results and store them in usersData.
    //     let usersData = querySnap.docs.map((doc) => doc.data());

    //     //Filter only the experts from usersData.
    //     let expertsData = usersData?.filter((user) => {
    //       return user.isExpert;
    //     });

    //     //Filter the list of experts by category.
    //     let filteredByCategory = expertsData?.filter((expert) => {
    //       return expert.interests.includes(selectedCategory);
    //     });

    //     //Set expertsByCategory state to the filtered list.
    //     setExpertsByCategory(filteredByCategory);
    //   }
    // });
    // return unsubscribe;

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
      <List.Section title="categories">
        <List.Accordion
          title={selectedCategory}
          left={(props) => <List.Icon {...props} icon="folder" />}
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
        <CategoryList expertsByCategory={expertsByCategory} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default CategoryDropdown;

import { collection, query, where, getDocs } from "firebase/firestore";

import React, { useState, useContext, useEffect } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { FirebaseContext } from "../../src/FirebaseProvider";

const ExpertList = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [experts, setExperts] = useState([]);

  //New method from firestore documentation. Changed .forEach() to .map()
  useEffect(() => {
    //Get multiple documents from a collection with a filter
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const getData = async () => {
      const q = query(collection(db, "users"), where("isExpert", "==", true));
      const querySnapshot = await getDocs(q);
      const expertArray = querySnapshot.docs.map((doc) => doc.data());
      console.log("querySnapshot.docs: ", querySnapshot.docs);
      setExperts(expertArray);
    };
    getData();
  }, []);

  return (
    <ScrollView>
      <View>
        {experts.map((expert) => {
          return (
            <View key={expert.uid}>
              <Text>{"\n"}</Text>

              <Text style={{ fontSize: 20 }}>Name: {expert.displayName}</Text>

              <Text style={{ fontSize: 16 }}>
                Expertise in: {expert.interests?.join(", ")}
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

export default ExpertList;

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import { FirebaseContext } from "../../src/FirebaseProvider";

const ExpertsList = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [experts, setExperts] = useState([]);

  useEffect(() => {
    //query snapshot that returns all experts in the firestore db
    let collectionRef = collection(db, "users");
    let queryRef = query(collectionRef, orderBy("displayName"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        //map over the query results and store them in usersData
        let usersData = querySnap.docs.map((doc) => doc.data());

        //filter only the experts from usersData
        let expertsData = usersData.filter((user) => {
          return user.isExpert;
        });

        setExperts(expertsData);
      }
    });
    return unsubscribe;
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

export default ExpertsList;

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
import DataList from "./DataList";

const ExpertsList = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [experts, setExperts] = useState([]);

  //Initial method from superheroes
  useEffect(() => {
    //query snapshot that returns all users in the firestore db
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

        //set the Expert state to only the experts
        setExperts(expertsData);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <View>
      <DataList data={experts}>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ExpertsList;

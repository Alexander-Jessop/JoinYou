import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { FirebaseContext } from "../../src/FirebaseProvider";

const MainList = () => {
  const [expertsByCategory, setExpertsByCategory] = useState([]);
  const [userInterests, setUserInterests] = useState("Other");

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const auth = fbContext.auth;

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const uid = authContext.user.uid;

  useEffect(() => {
    if (userInterests) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef);

      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("No docs found");
        } else {
          let usersData = querySnap.docs.map((doc) => doc.data());

          let expertsData = usersData?.filter((user) => {
            return user.isExpert;
          });

          let filteredByCategory = expertsData?.filter((expert) => {
            return expert.interests.some((interest) =>
              userInterests.includes(interest)
            );
          });

          setExpertsByCategory(filteredByCategory);
        }
      });
      return unsubscribe;
    }
  }, [userInterests]);

  useEffect(() => {
    //get a single document from Firestore
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
    const setData = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      console.log("docSnap.data().interests is: ", docSnap.data().interests);
      setUserInterests(docSnap.data().interests);
    };
    setData();
  }, [auth]);

  return (
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
  );
};

const styles = StyleSheet.create({});

export default MainList;

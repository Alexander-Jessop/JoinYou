import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MainList from "../../components/feed/MainList";
import { Text, Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  //const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.reset({
        routes: [{ name: "Login" }],
      });
    }
  }, [user]);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Profile Page"
          color="#007F5F"
          icon="account-circle"
          onPress={() =>
            navigation.navigate("Profile", {
              profileID: user.uid,
            })
          }
        >
          Profile Page
        </Button>
        <Button
          color="#007F5F"
          title="Filter By Category"
          onPress={() => navigation.navigate("Categories")}
        >
          Filter By Category
        </Button>
      </View>

      <MainList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

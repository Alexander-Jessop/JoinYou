import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const DataList = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {props.data.map((expert) => {
        return (
          <View style={styles.content}>
            <Card
              title={expert.displayName}
              key={expert.uid}
              style={styles.card}
              onPress={() => {
                navigation.navigate("Profile", {
                  profileID: expert.uid,
                });
              }}
            >
              <Card.Content>
                <Title>Name: {expert.displayName}</Title>

                <Paragraph>
                  Expertise in: {expert.interests.join(", ")}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  content: {
    margin: 10,
  },
});

export default DataList;

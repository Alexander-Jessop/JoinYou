import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const DataList = (props) => {
  return (
    <ScrollView>
      {props.data.map((expert) => {
        return (
          <Card title={expert.displayName} key={expert.uid} style={styles.card}>
            <Card.Content>
              <Title>Name: {expert.displayName}</Title>

              <Paragraph>Expertise in: {expert.interests.join(", ")}</Paragraph>

              <Text>{"\n"}</Text>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 30,
  },
});

export default DataList;

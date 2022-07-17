import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Button, Text, Paragraph } from "react-native-paper";

const VideoPicker = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.form}>
      <Card>
        <Card.Content>
          <Card.Title
            title="Add an Intro Video"
            titleStyle={styles.cardTitle}
          />
          <Paragraph>
            It is important for your expert to be prepared for the meeting.
            Please record a short video explaining the purpose of the meeting.
          </Paragraph>

          <View>
            <Button
              title="Record Video"
              onPress={() => {
                navigation.navigate("Recording");
              }}
              mode="contained"
              color="#007F5F"
            >
              RECORD VIDEO
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default VideoPicker;

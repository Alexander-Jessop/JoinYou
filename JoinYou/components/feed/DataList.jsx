import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const DataList = (props) => {
  const navigation = useNavigation();
  const data = props.data;

  // let avatarID = profileData?.displayName?.substring(0, 1);
  // const profileAvatar = () => (
  //   <Avatar.Text size={100} label={avatarID} backgroundColor="#007F5F" />
  // );

  return (
    <ScrollView>
      {data.map((expert) => {
        return (
          <View style={styles.content} key={expert.uid}>
            <Card
              title={expert.displayName}
              key={expert.uid}
              style={styles.card}
              onPress={() => {
                navigation.navigate("Booking", {
                  profileID: expert.uid,
                });
              }}
            >
              <Card.Content>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ marginRight: 37.5 }}>
                    <Avatar.Text
                      size={75}
                      label={expert.displayName?.substring(0, 1)}
                      backgroundColor="#007F5F"
                    />
                  </View>
                  <View>
                    <Title>{expert.displayName}</Title>

                    <Text>
                      Expert in: {"\n"}
                      {expert.interests.join(`, `)}
                      {/* {expert.interests.join(`,${"\n"}`)} */}
                    </Text>
                  </View>
                </View>
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
    overflow: "hidden",
    backgroundColor: "#D4F2EA",
  },
  content: {
    margin: 10,
  },
});

export default DataList;

import React, { useState } from "react";
import { Text, View, FlatList, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../Constant/Styles";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TransitionPresets } from "react-navigation-stack";

const MessageScreen = ({ navigation }) => {
  const name = navigation.getParam("name");

  const [messagesList, setMessagesList] = useState([
    {
      id: "1",
      message: "Hello Sir",
      time: "9:35 AM",
      isSender: true,
      isSeen: true,
    },
    {
      id: "2",
      message: "Hello how are you",
      time: "9:36 AM",
      isSender: false,
      isSeen: null,
    },
    {
      id: "3",
      message: "I need urgently consultation about aquarium",
      time: "9:37 AM",
      isSender: false,
      isSeen: null,
    },
    {
      id: "4",
      message: "I'm down for two days.",
      time: "9:38 AM",
      isSender: true,
      isSeen: false,
    },
  ]);

  function header() {
    return (
      <View style={styles.headerContainerStyle}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding * 2.0 }}
          >
            {name}
          </Text>
        </View>
      </View>
    );
  }

  function messages() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            alignItems: item.isSender == true ? "flex-end" : "flex-start",
            marginHorizontal: Sizes.fixPadding,
            marginVertical: Sizes.fixPadding - 5.0,
          }}
        >
          <View
            style={{
              ...styles.messageContainerStyle,
              backgroundColor:
                item.isSender == true ? Colors.primary : "#E0E0E0",
              borderBottomLeftRadius:
                item.isSender == true ? Sizes.fixPadding - 5.0 : 0.0,
              borderBottomRightRadius:
                item.isSender == true ? 0.0 : Sizes.fixPadding - 5.0,
            }}
          >
            <Text
              style={
                item.isSender == true
                  ? { ...Fonts.white16Regular }
                  : { ...Fonts.black16Regular }
              }
            >
              {item.message}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {item.isSender == true ? (
              item.isSeen == true ? (
                <Ionicons
                  name="checkmark-done-sharp"
                  size={18}
                  color="#2497F3"
                  style={{ marginTop: Sizes.fixPadding }}
                />
              ) : (
                <Ionicons
                  name="checkmark-sharp"
                  size={18}
                  color="#2497F3"
                  style={{ marginTop: Sizes.fixPadding }}
                />
              )
            ) : null}
            <Text
              style={{
                ...Fonts.gray14Regular,
                marginLeft: Sizes.fixPadding - 3.0,
                marginTop: Sizes.fixPadding,
              }}
            >
              {item.time}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={messagesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function addMessage({ message }) {
    const oldMessages = messagesList;
    let date = Date();
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let AmPm = hour >= 12 ? "PM" : "AM";
    let finalhour = hour >= 12 ? hour - 12 : hour;

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      time: `${finalhour}:${minute} ${AmPm}`,
      isSender: true,
      isSeen: false,
    };

    oldMessages.push(newMessage);
    setMessagesList(oldMessages);
  }

  function typeMessage() {
    const [message, setMessage] = useState("");

    return (
      <View style={styles.bottomContainerStyle}>
        <View style={styles.textFieldContainerStyle}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a Message"
            style={{ ...Fonts.white16Regular }}
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.sendButtonStyle}>
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={Colors.primary}
            onPress={() => {
              if (message != "") {
                addMessage({ message: message });
                setMessage("");
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {header()}
      {messages()}
      {typeMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 55.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.9,
  },
  messageContainerStyle: {
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    borderTopLeftRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainerStyle: {
    flexDirection: "row",
    marginBottom: Sizes.fixPadding,
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding,
  },
  textFieldContainerStyle: {
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 3.0,
    flex: 1,
    paddingLeft: Sizes.fixPadding,
  },
  sendButtonStyle: {
    height: 50.0,
    width: 50.0,
    borderRadius: 25.0,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Sizes.fixPadding,
  },
});

MessageScreen.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default MessageScreen;
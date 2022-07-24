import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../../src/AuthProvider";

const SetPrice = (props) => {
  const { navigation, route } = props;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateUserPrice = authContext.updateUserPrice;

  const [selectedPrice, setSelectedPrice] = useState(null);
  const prices = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ];

  useEffect(() => {
    props.route.params.setPrice(selectedPrice);
  }),
    [selectedPrice];

  return (
    <Card style={{ alignItems: "center" }}>
      <Picker
        selectedValue={selectedPrice}
        style={{ height: 50, width: 150, alignItems: "center" }}
        onValueChange={(itemValue, itemIndex) => setSelectedPrice(itemValue)}
      >
        {prices.map((price) => (
          <Picker.Item label={`$${price}`} value={price} key={price} />
        ))}
      </Picker>
      <Button
        color="#007F5F"
        onPress={() => {
          if (selectedPrice) {
            Alert.alert(`Your appointments now cost: $${selectedPrice}`);
            updateUserPrice(selectedPrice);
            navigation.navigate("Profile", {
              profileID: user.uid,
              price: selectedPrice,
            });
          }
        }}
      >
        Set Price
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default SetPrice;

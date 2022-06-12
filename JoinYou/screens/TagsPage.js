import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { AuthContext } from "../src/AuthProvider";

const TagsPage = () => {
  const [checkedAquariums, setCheckedAquariums] = useState(false);
  const [checkedCooking, setCheckedCooking] = useState(false);
  const [checkedFashion, setCheckedFashion] = useState(false);
  const [checkedFitness, setCheckedFitness] = useState(false);
  const [checkedGardening, setCheckedGardening] = useState(false);
  const [checkedTerrariums, setCheckedTerrariums] = useState(false);
  const [checkedVideography, setCheckedVideography] = useState(false);
  const [checkedOther, setCheckedOther] = useState(false);

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateUserInterests = authContext.updateUserInterests;

  const onFinishHandler = () => {
    console.log(user);
    updateUserInterests(["Aquariums"]);
  };

  return (
    <View>
      <Text>Select your interests:</Text>
      <View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedAquariums ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedAquariums(!checkedAquariums);
            }}
          />
          <Text style={styles.label}>Aquariums</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedCooking ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedCooking(!checkedCooking);
            }}
          />
          <Text style={styles.label}>Cooking</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedFashion ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedFashion(!checkedFashion);
            }}
          />
          <Text style={styles.label}>Fashion</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedFitness ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedFitness(!checkedFitness);
            }}
          />
          <Text style={styles.label}>Fitness</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedGardening ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedGardening(!checkedGardening);
            }}
          />
          <Text style={styles.label}>Gardening</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedTerrariums ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedTerrariums(!checkedTerrariums);
            }}
          />
          <Text style={styles.label}>Terrariums</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedVideography ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedVideography(!checkedVideography);
            }}
          />
          <Text style={styles.label}>Videography</Text>
        </View>
        <Text>{"\n"}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={checkedOther ? "checked" : "unchecked"}
            onPress={() => {
              setCheckedOther(!checkedOther);
            }}
          />
          <Text style={styles.label}>Other</Text>
        </View>
        <Text>{"\n"}</Text>
      </View>

      <Button title="Finish" onPress={onFinishHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TagsPage;

import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { Checkbox } from "react-native-paper";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const TagsPage = () => {
  const [checkedAquariums, setCheckedAquariums] = useState(false);
  const [checkedCooking, setCheckedCooking] = useState(false);
  const [checkedFashion, setCheckedFashion] = useState(false);
  const [checkedFitness, setCheckedFitness] = useState(false);
  const [checkedGardening, setCheckedGardening] = useState(false);
  const [checkedTerrariums, setCheckedTerrariums] = useState(false);
  const [checkedVideography, setCheckedVideography] = useState(false);
  const [checkedOther, setCheckedOther] = useState(false);

  const navigation = useNavigation();

  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateUserInterests = authContext.updateUserInterests;

  const onFinishHandler = () => {
    const interestArray = [];

    if (checkedAquariums) {
      interestArray.push("Aquariums");
    }
    if (checkedCooking) {
      interestArray.push("Cooking");
    }
    if (checkedFashion) {
      interestArray.push("Fashion");
    }
    if (checkedFitness) {
      interestArray.push("Fitness");
    }
    if (checkedGardening) {
      interestArray.push("Gardening");
    }
    if (checkedTerrariums) {
      interestArray.push("Terrariums");
    }
    if (checkedVideography) {
      interestArray.push("Videograhpy");
    }
    if (checkedOther) {
      interestArray.push("Other");
    }

    updateUserInterests(interestArray);
    navigation.replace("Home");
  };

  return (
    <ScrollView>
      <View style={styles.containter}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default TagsPage;

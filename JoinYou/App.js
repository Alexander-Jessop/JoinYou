import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InitialScreen from "./screens/InitialScreen";
import ClientRegInfo from "./screens/ClientRegInfo";
import ClientRegTags from "./screens/ClientRegTags";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Register" component={ClientRegInfo} />
        <Stack.Screen name="Tags" component={ClientRegTags} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

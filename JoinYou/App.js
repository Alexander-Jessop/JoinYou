import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RestOfApp from "./src/RestOfApp";
import FirebaseProvider from "./providers/FirebaseProvider";

export default function App() {
  return (
    <FirebaseProvider>
      <RestOfApp />
    </FirebaseProvider>
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

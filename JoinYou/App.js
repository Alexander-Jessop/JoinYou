import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RestOfApp from "./src/RestOfApp";
import FirebaseProvider from "./src/FirebaseProvider";
import AuthProvider from "./src/AuthProvider";

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <RestOfApp />
      </AuthProvider>
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

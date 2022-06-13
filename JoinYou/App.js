import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AllLoadedImgs from "./Screens/AllLoadedImgs";
import AddImg from "./Screens/AddImg";
import IconButton from "./components/ui/IconButton";
import RestOfApp from "./src/RestOfApp";
import FirebaseProvider from "./src/FirebaseProvider";
import AuthProvider from "./src/AuthProvider";

// const Stack = createNativeStackNavigator();

// function AuthStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//     </Stack.Navigator>
//   );
// }

// function AuthenticatedStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       <Stack.Screen name="Welcome" component={WelcomeScreen} />
//     </Stack.Navigator>
//   );
// }

// function ImgUpload() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="All Images"
//         component={AllLoadedImgs}
//         options={({ navigation }) => ({
//           title: "All uploaded Images",
//           headerRight: ({ tintColor }) => (
//             <IconButton
//               icon="add"
//               size={24}
//               color={tintColor}
//               onPress={() => navigation.navigate("Add Image")}
//             />
//           ),
//         })}
//       />
//       <Stack.Screen
//         name="Add Image"
//         component={AddImg}
//         options={{ title: "Add a New Image" }}
//       />
//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   return (
//     <NavigationContainer>
//       <ImgUpload />
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <RestOfApp />
        high I am Zach hi I'm nathaly
      </AuthProvider>
    </FirebaseProvider>
  );
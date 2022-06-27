import HomeScreen from "../Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext } from "./AuthProvider";
import SignupScreen from "../Screens/SignupScreen";
import LoginScreen from "../Screens/LoginScreen";
import AddImg from "../Screens/AddImg";
import ImgDetails from "../Screens/ImgDetails.js";
import AllLoadedImgs from "../Screens/AllLoadedImgs";
import IconButton from "../components/ui/IconButton";
import LoginPage from "../Screens/client-reg/LoginPage";
import RegisterPage from "../Screens/client-reg/RegisterPage";
import InfoPage from "../Screens/client-reg/InfoPage";
import TagsPage from "../Screens/client-reg/TagsPage";
import CategoryScreen from "../Screens/feed/CategoryScreen";
import TimeSlots from "../components/Scheduler/TimeSlots";

const Stack = createNativeStackNavigator();

const RestOfApp = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Login"
  //         component={LoginPage}
  //         options={{ title: "Welcome" }}
  //       />

  //       <Stack.Screen
  //         name="Register"
  //         component={RegisterPage}
  //         options={{ title: "Register as new user" }}
  //       />

  //       <Stack.Screen
  //         name="InfoPage"
  //         component={InfoPage}
  //         options={{ title: "Enter your information" }}
  //       />

  //       <Stack.Screen
  //         name="Tags"
  //         component={TagsPage}
  //         options={{ title: "Select your interests:" }}
  //       />

  //       <Stack.Screen name="Home" component={HomeScreen} />

  //       <Stack.Screen name="Categories" component={CategoryScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  //   function AuthStack() {
  //     return (
  //       <Stack.Navigator
  //         screenOptions={{
  //           headerStyle: { backgroundColor: Colors.primary500 },
  //           headerTintColor: "white",
  //           contentStyle: { backgroundColor: Colors.primary100 },
  //         }}
  //       >
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Signup" component={SignupScreen} />
  //       </Stack.Navigator>
  //     );
  //   }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CalendarTEST" component={TimeSlots} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RestOfApp;

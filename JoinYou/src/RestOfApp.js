import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AuthContext } from "./AuthProvider";
import SignupScreen from "../Screens/SignupScreen";
import LoginScreen from "../Screens/LoginScreen";
import AddImg from "../Screens/AddImg";
import ImgDetails from "../Screens/ImgDetails.js";
import AllLoadedImgs from "../Screens/AllLoadedImgs";
import IconButton from "../components/ui/IconButton";

const Stack = createNativeStackNavigator();

const RestOfApp = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  function ImgUpload() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="All Images"
          component={AllLoadedImgs}
          options={({ navigation }) => ({
            title: "All uploaded Images",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("Add Image")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Add Image"
          component={AddImg}
          options={{ title: "Add a New Image" }}
        />
      </Stack.Navigator>
    );
  }

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

  function Navigation() {
    return (
      <NavigationContainer>
        <ImgUpload />
      </NavigationContainer>
    );
  }

  return <Navigation />;
};

export default RestOfApp;

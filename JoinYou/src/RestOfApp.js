import HomeScreen from "../Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View } from "react-native";
//import { Colors } from "react-native/Libraries/NewAppScreen";
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
import Aquariums from "../Screens/feed/Aquariums";
import Cooking from "../Screens/feed/Cooking";
import Fashion from "../Screens/feed/Fashion";
import Fitness from "../Screens/feed/Fitness";
import Gardening from "../Screens/feed/Gardening";
import Terrariums from "../Screens/feed/Terrariums";
import Videography from "../Screens/feed/Videography";
import Other from "../Screens/feed/Other";

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: "Welcome" }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: "Register as new user" }}
        />

        <Stack.Screen
          name="InfoPage"
          component={InfoPage}
          options={{ title: "Enter your information" }}
        />

        <Stack.Screen
          name="Tags"
          component={TagsPage}
          options={{ title: "Select your interests:" }}
        />

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Categories" component={CategoryScreen} />
        <Stack.Screen name="Aquariums" component={Aquariums} />
        <Stack.Screen name="Cooking" component={Cooking} />
        <Stack.Screen name="Fashion" component={Fashion} />
        <Stack.Screen name="Fitness" component={Fitness} />
        <Stack.Screen name="Gardening" component={Gardening} />
        <Stack.Screen name="Terrariums" component={Terrariums} />
        <Stack.Screen name="Videography" component={Videography} />
        <Stack.Screen name="Other" component={Other} />
      </Stack.Navigator>
    </NavigationContainer>
  );

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

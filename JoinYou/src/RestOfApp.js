import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen component imports
import LoginPage from "../Screens/client-reg/LoginPage";
import RegisterPage from "../Screens/client-reg/RegisterPage";
import InfoPage from "../Screens/client-reg/InfoPage";
import TagsPage from "../Screens/client-reg/TagsPage";
import CategoryScreen from "../Screens/feed/CategoryScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";

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

        <Stack.Screen name="Home" component={WelcomeScreen} />

        <Stack.Screen name="Categories" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

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

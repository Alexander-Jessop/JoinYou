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
import HomeScreen from "../Screens/feed/HomeScreen";
import ProfileScreen from "../Screens/profile/ProfileScreen";
// Schedule Screen
import AgendaView from "../components/Scheduler/AgendaView";
import CalendarView from "../components/Scheduler/CalendarView";

const Stack = createNativeStackNavigator();

const RestOfApp = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

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
      </Stack.Navigator>
    </NavigationContainer>
  );

  function Navigation() {
    return (
      <NavigationContainer>
        <Appointment />
      </NavigationContainer>
    );
  }
  return <Navigation />;
  // };

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="Calendar" component={CalendarView} />
  //       <Stack.Screen name="Appointments" component={AgendaView} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
};
export default RestOfApp;

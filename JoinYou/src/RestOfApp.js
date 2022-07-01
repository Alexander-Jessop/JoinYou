import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Screen component imports
import LoginPage from "../Screens/client-reg/LoginPage";
import RegisterPage from "../Screens/client-reg/RegisterPage";
import InfoPage from "../Screens/client-reg/InfoPage";
import TagsPage from "../Screens/client-reg/TagsPage";
import CategoryScreen from "../Screens/feed/CategoryScreen";
import HomeScreen from "../Screens/feed/HomeScreen";
import ProfileScreen from "../Screens/profile/ProfileScreen";
import UpcomingScreen from "../Screens/profile/UpcomingScreen";
// Schedule Screen
import AgendaView from "../components/Scheduler/AgendaView";
import CalendarView from "../components/Scheduler/CalendarView";
import Booking from "../components/Scheduler/Booking";
// OnBoarding
import OnboardingScreen from "../Screens/OnBoarding/OnboardingScreen";
import CalendarScreen from "../Screens/profile/CalendarScreen";
// Profile
import TimeSlots from "../components/Scheduler/TimeSlots";
// image
import AddImg from "../Screens/StillImg/AddImg";
import Recording from "../components/VideoCamera/Recording";
import ConfirmationScreen from "../Screens/profile/ConfirmationScreen";
import NewTimeslotScreen from "../Screens/profile/NewTimeslotScreen";
import Twilio from "../components/Conference/Twilio";

const Stack = createNativeStackNavigator();

const RestOfApp = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunced", "true");
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  if (firstLaunch === null) {
    return null;
  } else if (firstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OnBoarding"
            component={OnboardingScreen}
            options={{ header: () => null }}
          />
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
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Upcoming" component={AgendaView} />
          <Stack.Screen name="NewTimeslot" component={NewTimeslotScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Categories" component={CategoryScreen} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen name="Appointment" component={AgendaView} />
          <Stack.Screen name="Video" component={Recording} />
          <Stack.Screen name="Photo" component={AddImg} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginPage />;
  }

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>

  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
};
export default RestOfApp;

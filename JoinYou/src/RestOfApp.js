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
// Schedule Screen
import AgendaView from "../components/Scheduler/AgendaView";
import Booking from "../components/Scheduler/Booking";
import ConfirmationPage from "../components/Scheduler/ConfirmationPage";
// OnBoarding
import OnboardingScreen from "../Screens/OnBoarding/OnboardingScreen";
// Profile
import ProfileScreen from "../Screens/profile/ProfileScreen";
import TimeslotDetails from "../components/Scheduler/TimeslotDetails";
import DetailsVideo from "../components/Scheduler/DetailsVideo";
import SetPrice from "../Screens/profile/SetPrice";
// image
import ImgForm from "../components/UserImg/ImgForm";
import Recording from "../components/VideoCamera/Recording";
import NewTimeslotScreen from "../Screens/profile/NewTimeslotScreen";
import Something from "../Something";
//payment
import Payment from "../components/StripePayment/Payment";
import PaymentSuccess from "../components/StripePayment/PaymentSucess";

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
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="InfoPage"
            component={InfoPage}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Tags"
            component={TagsPage}
            options={{ title: "Select your interests:" }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: null }}
          />
          <Stack.Screen name="Upcoming" component={AgendaView} />
          <Stack.Screen name="Set Availability" component={NewTimeslotScreen} />
          <Stack.Screen name="Set Price" component={SetPrice} />
          <Stack.Screen name="Categories" component={CategoryScreen} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Confirmation" component={ConfirmationPage} />
          <Stack.Screen name="Appointment" component={AgendaView} />
          <Stack.Screen name="Video" component={Recording} />
          <Stack.Screen name="Photo" component={ImgForm} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen
            name="Payment Success"
            component={PaymentSuccess}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Timeslot"
            component={TimeslotDetails}
            options={{ title: "Appointment Details" }}
          />
          <Stack.Screen name="Details Video" component={DetailsVideo} />
          <Stack.Screen name="Meeting" component={Something} />
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

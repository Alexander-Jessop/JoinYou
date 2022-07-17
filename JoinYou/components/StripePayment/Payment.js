import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Card, Text, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../src/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseContext } from "../../src/FirebaseProvider";

//ADD localhost address of your server
const API_URL = "http://localhost:19002";
const StripeProvider = () => {
  return (
    <StripeProvider publishableKey="pk_test_51LGiAGFxGzpzSaMYqjeGs8a8F4Y7pfmZzT8DqKF3lS0GlrUaZ82HWz7inCz7ibeFkVDECDQ6lSR2TylXnq3lT3n100d34Fo1qa">
      <Payment />
    </StripeProvider>
  );
};

const Payment = (props) => {
  const { route } = props;
  const profileData = route.params.profileData;
  const selectedSlot = route.params.selectedSlot;
  const selectedDate = route.params.selectedDate;
  const meetingDescription = route.params.meetingDescription;
  const photoUrl = route.params.photoUrl;
  const photoDescription = route.params.photoDescription;
  const videoUrl = route.params.videoUrl;

  const navigation = useNavigation();
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const updateTimeslot = authContext.updateTimeslot;
  const [profile, setProfile] = useState(null);

  //Sets the profile data from the Firestore Database user
  useEffect(() => {
    const getData = async () => {
      //Get a single document from Firestore databse, by UID
      //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setProfile(docSnap.data());
    };
    getData();
  }, [user]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)

    //temporarily commented out to save time
    // if (!cardDetails?.complete || !email) {
    //   Alert.alert("Please enter Complete card details and Email");
    //   return;
    // } else {

    //eventually replace this with cloud function
    updateTimeslot(
      selectedSlot.DOC_ID,
      profile,
      meetingDescription,
      photoDescription,
      photoUrl,
      videoUrl
    );
    Alert.alert("Payment Successful");
    navigation.replace("Payment Success", {
      profileData,
      selectedSlot,
      selectedDate,
    });
    // }

    // const billingDetails = {
    //   name: name,
    //   email: email,
    // };
    // //2.Fetch the intent client secret from the backend
    // try {
    //   const { clientSecret, error } = await fetchPaymentIntentClientSecret();
    //   //2. confirm the payment
    //   if (error) {
    //     console.log("Unable to process payment");
    //   } else {
    //     const { paymentIntent, error } = await confirmPayment(clientSecret, {
    //       type: "Card",
    //       billingDetails: billingDetails,
    //     });
    //     if (error) {
    //       alert(`Payment Confirmation Error ${error.message}`);
    //     } else if (paymentIntent) {
    //       alert("Payment Successful");
    //       console.log("Payment successful ", paymentIntent);
    //     }
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    // //3.Confirm the payment with the card details
  };

  return (
    <Card style={styles.container}>
      <Title>
        {" "}
        {"\n"} Appointment with: {profileData.displayName}
        {"\n"} Start Time: {selectedSlot.startTime}
        {"\n"} Start Date: {selectedDate}
        {"\n"} $20
        {"\n"}
        {"\n"}
      </Title>

      <Title>Billing Information:</Title>
      <TextInput
        autoCapitalize="none"
        placeholder="Full Name"
        onChange={(value) => setName(value.nativeEvent.text)}
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </Card>
  );
};
export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 15,
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

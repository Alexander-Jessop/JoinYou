import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button, Card, Text, Title } from "react-native-paper";
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
  const profile = authContext.profile;
  const updateTimeslot = authContext.updateTimeslot;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  // const { confirmPayment, loading } = useConfirmPayment();
  const [disabled, setDisabled] = useState(false);

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
  };

  return (
    <Card style={styles.container}>
      <Title style={{ textAlign: "center" }}>
        {" "}
        {"\n"} Appointment with: {profileData.displayName}
        {"\n"} Start Time: {selectedSlot.startTime}
        {"\n"} Start Date: {selectedDate}
        {"\n"} Duration 15 minutes
        {"\n"} Cost: ${profileData.price}
        {"\n"}
      </Title>
      <View style={{ padding: 10 }}>
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
      </View>
      <Button
        onPress={async () => {
          setDisabled(true);
          setTimeout(handlePayPress, 3500);
        }}
        mode="contained"
        title="Pay"
        disabled={disabled}
        color="#007F5F"
        // icon="check"
        style={{}}
      >
        Pay
      </Button>
    </Card>
  );
};
export default Payment;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: 15,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    padding: 15,
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#efefefef",
    borderRadius: 16,
  },
  cardContainer: {
    height: 57,
    marginVertical: 5,
    // padding: 15,
    // marginVertical: 30,
    // marginTop: 50,
  },
});

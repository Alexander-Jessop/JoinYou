import React, {Component} from 'react';
import {StyleSheet,Alert,SafeAreaView,View} from 'react-native';
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";
import { RaisedTextButton } from 'react-native-material-buttons';
import {Toast} from "native-base";

export default class StripePayment extends React.Component {

  // BEGIN TO SETUP PAYMENT BUTTON PRESS EVENT
  onPaymentButtonPress(data){

      if (GlobalInclude.Stripe.Stripe_Mode == 'TEST') {
        if (GlobalInclude.Stripe.Stripe_Test_Key == '') {
          alert('Please setup stripe test key. Path: "/Source/Global/StripeSetup/stripesetup.js"')
        }else {
          this.myStripePayment(GlobalInclude.Stripe.Stripe_Test_Key)
        }
      }else if (GlobalInclude.Stripe.Stripe_Mode == 'LIVE') {
        if (GlobalInclude.Stripe.Stripe_Live_Key == '') {
          alert('Please setup stripe live key. Path: "/Source/Global/StripeSetup/stripesetup.js"')
        }else {
          this.myStripePayment(GlobalInclude.Stripe.Stripe_Live_Key)
        }
      }else {
        alert('Please setup stripe mode as a "Live or Test", Path: "/Source/Global/StripeSetup/stripesetup.js"')
      }

  }
  // END TO SETUP PAYMENT BUTTON PRESS EVENT

  // BEGIN TO START STRIPE PAYMENT METHOD
  myStripePayment (stripe_key){
    // START LOADER EVENT
    this.props.onLoaderEvent(1);

    // BEGIN TO SETUP TEST CREDIT CARD DETAIL ARRAY
    var cardDetails = {
      "card[number]": "4242424242424242",
      "card[exp_month]": "12",
      "card[exp_year]": "2023",
      "card[cvc]": "123"
    };
    // END TO SETUP TEST CREDIT CARD DETAIL ARRAY

    // BEGIN TO SETUP LIVE USER CREDIT CARD DETAIL ARRAY
    // var cardDetails = {
    //   "card[number]": global.card_number,
    //   "card[exp_month]": global.card_exp_month,
    //   "card[exp_year]": global.card_exp_year,
    //   "card[cvc]": global.card_cvc
    // };
    // END TO SETUP LIVE USER CREDIT CARD DETAIL ARRAY

    // BEGIN TO SETUP CREDIT CARD INPUT FORM BODY FOR SERVER REQUEST
    var formBody = [];
    for (var property in cardDetails) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(cardDetails[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // END TO SETUP CREDIT CARD INPUT FORM BODY FOR SERVER REQUEST

    // SEND REQUEST TO STRIPE FOR GET TOKENS
    let { data } = fetch("https://api.stripe.com/v1/tokens", {
      method: "post",
      body: formBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + stripe_key
      }
    })
      .then(response => {
        response.json().then(responseJson => {

                  // BEGIN TO SETUP CHARGE FOR STRIPE
                  var cardcharges = {
                    amount: 1*100,
                    currency: "usd",
                    source: responseJson.id,
                    receipt_email: GlobalInclude.Stripe.Stripe_Receipt_Email,
                    description: "Test Stripe Payment"
                  };
                  // END TO SETUP CHARGE FOR STRIPE

                  // BEGIN TO SETUP CHARGE FORM BODY FOR SERVER REQUEST
                  var formcardBody = [];
                  for (var property in cardcharges) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(cardcharges[property]);

                    formcardBody.push(encodedKey + "=" + encodedValue);
                  }
                  formcardBody = formcardBody.join("&");
                  // END TO SETUP CHARGE FORM BODY FOR SERVER REQUEST


                        // BEGIN TO START SEND REQUEST TO STRIPE FOR CHARGE
                        fetch("https://api.stripe.com/v1/charges", {
                          method: "post",
                          body: formcardBody,
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: "Bearer " + stripe_key
                          }
                         })
                          .then(cardresponce => {
                            cardresponce.json().then(cardresponceJson => {
                              console.log('cardresponce',cardresponceJson);
                                  // STOP LOADER EVENT
                                  this.props.onLoaderEvent(0);

                                  // BEGIN TO START METHOD FOR GET PAYMENT STATUS
                                  if(cardresponceJson.status == 'succeeded'){
                                    Toast.show({
                                        text: 'Payment Success',
                                        textStyle:{textAlign:"center",
                                        color:'#3c763d',
                                        fontSize: 15},
                                        style:{backgroundColor: "#dff0d8",yOffset: 40,alignSelf:"center",alignItems:"center"},
                                    })
                                    this.props.onSuccess(true)
                                  }else {
                                    Toast.show({
                                        text: cardresponceJson.error.message,
                                        textStyle:{textAlign:"center",
                                        color:'#a94442',
                                        fontSize: 15},
                                        style:{backgroundColor: "#f2dede",yOffset: 40,alignSelf:"center",alignItems:"center"},
                                    })
                                    this.props.onSuccess(false)
                                  }
                                  // END TO START METHOD FOR GET PAYMENT STATUS

                              });

                          })
                          .catch(function(err) {
                            Toast.show({
                                text: 'Error while creating charge.',
                                textStyle:{textAlign:"center",
                                color:'#a94442',
                                fontSize: 15},
                                style:{backgroundColor: "#f2dede",yOffset: 40,alignSelf:"center",alignItems:"center"},
                            })
                          });
                          // END TO START SEND REQUEST TO STRIPE FOR CHARGE
            });

        })
        .catch(function(err) {
          Toast.show({
              text: 'Error while creating tokens.',
              textStyle:{textAlign:"center",
              color:'#a94442',
              fontSize: 15},
              style:{backgroundColor: "#f2dede",yOffset: 40,alignSelf:"center",alignItems:"center"},
          })
        });
  }
  // END TO START STRIPE PAYMENT METHOD

render() {
  return (
    <SafeAreaView style={styles.container}>
      {/* BEGIN TO START PAYMENT BUTTON */}
      <RaisedTextButton disabled={this.props.payment_button_status}  style={styles.button} rippleDuration={600} rippleOpacity={0.54} title="Payment"   color={GlobalInclude.Color.PaymentButtonColor} titleColor={GlobalInclude.Color.PaymentButtonTextColor} onPress={() => this.onPaymentButtonPress()}/>
      {/* END TO START PAYMENT BUTTON */}
    </SafeAreaView>
  );
}

}

// BEGIN TO START STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.ContainerColor,
  },
  button: {
    margin: 4,
    height:40
  }
});
// END TO START STYLE

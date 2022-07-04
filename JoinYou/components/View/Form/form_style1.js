/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";
import StipePayment from "../StripePayment/stripepayment.js"
import { CreditCardInput } from "react-native-credit-card-input";
type Props = {};
import {Toast} from 'native-base'

export default class FormStyle1 extends Component<Props> {

      // BEGIN TO START HEADER VIEW
      static navigationOptions = ({navigation}) => {
            const {params = {}} = navigation.state;
              return {
                  headerTitle: (
                      <View style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:17,color:GlobalInclude.Color.HeaderTextColor,fontFamily:GlobalInclude.Font.FontBold}}>Form Style 1</Text>
                      </View>
                  ),
                  headerRight:  <View style={{width:30,height:30}}></View>
                };
        };
        // END TO START HEADER VIEW

       constructor(props) {
          super(props);
            // BEGIN TO START SET STATE
            this.state = {
              payment_button_disabled:true,
              is_loading:0
            };
            // END TO START SET STATE
            this.onSuccess = this.onSuccess.bind(this);
            this.onLoaderEvent = this.onLoaderEvent.bind(this);
        }

      // BEGIN TO START ON CHANGE EVENT FOR CREDIT CARD INPUT
      _onChange =(formData)=>{

            // BEGIN TO START CHECK VALID FORM
            if(formData.valid == true){

              // BEGIN TO START STORE ALL INPUT VALUE IN GLOBAL
              var piecesOfExpDate = formData.values.expiry.split("/");
              global.card_holder_name = formData.values.name;
              global.card_number = formData.values.number;
              global.card_cvc = formData.values.cvc;
              global.card_exp_month = piecesOfExpDate[0];
              global.card_exp_year = piecesOfExpDate[1];
              // END TO START STORE ALL INPUT VALUE IN GLOBAL

              // BEGIN TO START UPDATE BUTTON STATUS
              this.setState({
                payment_button_disabled:false
              })
              // END TO START UPDATE BUTTON STATUS
            }else {
              // BEGIN TO MAKE BLANK STRING IN ALL INPUT VALUE IN GLOBAL
              global.card_holder_name = '';
              global.card_number = '';
              global.card_cvc = '';
              global.card_exp_month = '';
              global.card_exp_year = '';
              // END TO MAKE BLANK STRING IN ALL INPUT VALUE IN GLOBAL

              // BEGIN TO START UPDATE BUTTON STATUS
              this.setState({
                payment_button_disabled:true
              })
              // END TO START UPDATE BUTTON STATUS
            }
            // BEGIN TO START CHECK VALID FORM

      }
      // END TO START ON CHANGE EVENT FOR CREDIT CARD INPUT

      // BEGIN TO START PAYMENT DONE BUTTON EVENT
      onSuccess(success){
        if(success == true){
          this.props.navigation.goBack();
        }
      }
      // END TO START PAYMENT DONE BUTTON EVENT

      onLoaderEvent(status){
        // BEGIN TO SET LOADER STATUS
        this.setState({
          is_loading:status
        })
        // BEGIN TO SET LOADER STATUS


      }

  render() {

    return (

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'android' ? null : "padding"} enabled>

                {/* BEGIN TO SETUP CREDIT CARD FORM VIEW */}
                <ScrollView style={styles.credit_card_container}>
                    <CreditCardInput
                              requiresName
                              requiresCVC
                              labelStyle={styles.label}
                              inputStyle={styles.input}
                              validColor={GlobalInclude.Color.FormValidColor}
                              invalidColor={GlobalInclude.Color.FormInValidColor}
                              placeholderColor={GlobalInclude.Color.FormPlaceHolderColor}
                              onChange={this._onChange} />
                </ScrollView>
                {/* END TO SETUP CREDIT CARD FORM VIEW */}

                {/* BEGIN TO SETUP EMPTY VIEW */}
                <View style={{height:50,backgroundColor:'transparent'}}>
                </View>
                {/* END TO SETUP EMPTY VIEW */}


                {/* BEGIN TO SETUP PAYMENT BUTTON */}
                <View style={styles.payment_button}>
                    <StipePayment navigation={this.props.navigation} onSuccess={this.onSuccess} payment_button_status={this.state.payment_button_disabled} onLoaderEvent={this.onLoaderEvent}/>
                </View>
               {/* END TO SETUP PAYMENT BUTTON */}

               {/* BEGIN LOADER VIEW */}
                     {this.state.is_loading == 1 ?
                         <GlobalInclude.Loader>
                         </GlobalInclude.Loader>
                     :null}
               {/* END LOADER VIEW */}

       </KeyboardAvoidingView>
    );
  }
}

// BEGIN TO START STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.ContainerColor,
  },
  credit_card_container: {
    flex:1
  },
  payment_button: {
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    height:50
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  }
});
// END TO START STYLE

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
import StipePayment from "../Payment/stripepayment.js"
import {Toast} from 'native-base'
import { TextField } from 'react-native-material-textfield';
type Props = {};

export default class FormStyle3 extends Component<Props> {

      // BEGIN TO START HEADER VIEW
      static navigationOptions = ({navigation}) => {
            const {params = {}} = navigation.state;
              return {
                  headerTitle: (
                      <View style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:17,color:GlobalInclude.Color.HeaderTextColor,fontFamily:GlobalInclude.Font.FontBold}}>Form Style 3</Text>
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
              is_loading:0,
              cvv:'',
              number:'',
              date:'',
              ccname:''
            };
            // END TO START SET STATE

            this.onSuccess = this.onSuccess.bind(this); // ONSUCCESS METHOD BIND
            this.onLoaderEvent = this.onLoaderEvent.bind(this); // ONLOADER EVENT METHOD BIND
            this.onChangeCvv = this.onChangeCvv.bind(this); // ONCHANGE CVV METHOD BIND
            this.onChangeDate = this.onChangeDate.bind(this); // ONCHANGE DATE METHOD BIND
            this.onChangeNumber = this.onChangeNumber.bind(this); // ONCHANGE NUMBER METHOD BIND
            this.onChangeCCHolderNameNumber = this.onChangeCCHolderNameNumber.bind(this); // ONCHANGE CC HOLDER NAME METHOD BIND


        }
        componentWillMount(){

          // BEGIN INITIAL SETUP OF GLOBAL VARIABLE
          global.card_number = '';
          global.card_cvc = '';
          global.card_exp_year = '';
          global.card_exp_month = '';
          global.card_holder_name = ''
          // END INITIAL SETUP OF GLOBAL VARIABLE

        }
        // BEGIN TO START ONCHANGE METHOD OF CREDIT CARD HOLDER NAME
        onChangeCCHolderNameNumber(text){
          setTimeout(() => {
          this.setState({
            ccname: text
            })
            },10);
            global.card_holder_name = text;
            setTimeout(() => {
              this.paymentButtonSetup();
            },500);
        }
        // END TO START ONCHANGE METHOD OF CREDIT CARD HOLDER NAME

        // BEGIN TO START ONCHANGE METHOD OF CREDIT CARD CVV
        onChangeCvv(text) {

              // BEGIN TO STORE CVV IN STATE
              setTimeout(() => {
                  this.setState({
                    cvv: text
                    })
              },10);
              // END TO STORE CVV IN STATE

              // BEGIN TO STORE CVV IN GLOBAL
              setTimeout(() => {
                  if(text.length == 3){
                    global.card_cvc = text;
                  }else{
                    global.card_cvc = '';
                  }
              },50);
              // END TO STORE CVV IN GLOBAL

            // BEGIN TO CHANGE STATE OF PAYMENT BUTTON METHOD
            setTimeout(() => {
                this.paymentButtonSetup();
            },500);
            // END TO CHANGE STATE OF PAYMENT BUTTON METHOD
        }
        // END TO START ONCHANGE METHOD OF CREDIT CARD CVV

        // BEGIN TO START ONCHANGE METHOD OF CREDIT CARD DATE
        onChangeDate(text) {

          // BEGIN TO STORE DATE IN STATE
          if((text >'1') && (text.length == 1)) {
            text = '0'+text
          }else if ((text >12) && (text.length == 2)){
            text = '12'
          }

          setTimeout(() => {
              this.setState({
                date: text
              })
          },10);

          if((this.state.date.length == 3) && (text.length == 2)){
            setTimeout(() => {
            this.setState({
              date: text
              })
            },50);
          }else if(text.length == 2){
            setTimeout(() => {
            this.setState({
              date: text+'/'
              })
              },50);
          }
          // END TO STORE DATE IN STATE

          // BEGIN TO STORE DATE IN GLOBAL
          setTimeout(() => {
              if(text.length == 5){
                var piecesOfExpDate = this.state.date.split("/");
                global.card_exp_month = piecesOfExpDate[0];
                global.card_exp_year = piecesOfExpDate[1];
              }else{
                global.card_exp_month = '';
                global.card_exp_year = '';
              }
          },500);
          // END TO STORE DATE IN GLOBAL

          // BEGIN TO CHANGE STATE OF PAYMENT BUTTON METHOD
          setTimeout(() => {
            this.paymentButtonSetup();
          },1000);
          // END TO CHANGE STATE OF PAYMENT BUTTON METHOD
        }
        // END TO START ONCHANGE METHOD OF CREDIT CARD DATE

        // BEGIN TO START ONCHANGE METHOD OF CREDIT CARD NUMBER
        onChangeNumber(text) {
          // BEGIN TO STORE CREDIT CARD NUMBER IN STATE
          setTimeout(() => {
              if((this.state.number.length == 3) && (text.length == 4)){
                this.setState({
                  number: text+' '
                })
              }else if(this.state.number.length == 8 && (text.length == 9)){
                this.setState({
                  number: text+' '
                })
              }else if(this.state.number.length == 13 && (text.length == 14)){
                this.setState({
                  number: text+' '
                })
              }else{
                this.setState({
                  number: text
                })
              }
          },20);
          // END TO STORE CREDIT CARD NUMBER IN STATE

          // BEGIN TO CHANGE STATE OF PAYMENT BUTTON METHOD
          setTimeout(() => {
              global.card_number = this.state.number;
              setTimeout(() => {
                this.paymentButtonSetup();
              },1000);
          },500);
          // END TO CHANGE STATE OF PAYMENT BUTTON METHOD
        }
        // END TO START ONCHANGE METHOD OF CREDIT CARD NUMBER


        paymentButtonSetup(){
          // BEGIN TO SETUP PAYMENT BUTTON STATUS
          if((global.card_number.length == 19) && (global.card_exp_month.length == 2) && (global.card_exp_year.length == 2) && (global.card_cvc.length == 3) && (global.card_holder_name != '')){
            this.setState({
              payment_button_disabled:false
            })
          }else{
            this.setState({
              payment_button_disabled:true
            })
          }
          // END TO SETUP PAYMENT BUTTON STATUS
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

        <ScrollView contentContainerStyle={{backgroundColor:'#f9f9f9',height:265,marginTop:20}}>
            <View style={{width:'100%',height:60,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                {/* BEGIN TO START CC NUMBER TEXTFIELD */}
                <TextField
                  defaultValue=''
                  value={this.state.number}
                  autoCorrect={false}
                  onChangeText={(text)=> this.onChangeNumber(text)}
                  label='Credit Card Number'
                  containerStyle={{width:'90%',alignSelf:"center"}}
                  labelTextStyle={{color:"black"}}
                  baseColor={"black"}
                  tintColor={"black"}
                  errorColor={"red"}
                  maxLength={19}
                  keyboardType='numeric'
                  returnKeyType='done'
                  returnKeyLabel='Done'
                  contextMenuHidden={true}
                />
                {/* END TO START CC NUMBER TEXTFIELD */}
            </View>

            <View style={{flexDirection:'row',width:'90%',marginTop:20,alignSelf:'center'}}>
                <View style={{width:'50%',height:60,justifyContent:'center',alignItems:'flex-start'}}>
                    {/* BEGIN TO START CC DATE TEXTFIELD */}
                    <TextField
                      defaultValue=''
                      value={this.state.date}
                      autoCorrect={false}
                      onChangeText={(text)=> this.onChangeDate(text)}
                      label='Exp. Month/Year'
                      containerStyle={{width:'85%'}}
                      labelTextStyle={{color:"black"}}
                      baseColor={"black"}
                      tintColor={"black"}
                      errorColor={"red"}
                      maxLength={5}
                      keyboardType='numeric'
                      returnKeyType='done'
                      returnKeyLabel='Done'
                      contextMenuHidden={true}
                    />
                    {/* END TO START CC DATE TEXTFIELD */}
                </View>
                <View style={{width:'50%',height:60,justifyContent:'center',alignItems:'flex-end'}}>
                    {/* BEGIN TO START CC CVV TEXTFIELD */}
                    <TextField
                      defaultValue=''
                      value={this.state.cvv}
                      autoCorrect={false}
                      onChangeText={(text)=> this.onChangeCvv(text)}
                      label='CVV'
                      containerStyle={{width:'85%'}}
                      labelTextStyle={{color:"black"}}
                      baseColor={"black"}
                      tintColor={"black"}
                      errorColor={"red"}
                      maxLength={3}
                      keyboardType='numeric'
                      returnKeyType='done'
                      returnKeyLabel='Done'
                      contextMenuHidden={true}
                    />
                    {/* END TO START CC CVV TEXTFIELD */}
                </View>
            </View>
            <View style={{width:'100%',height:60,justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:20}}>
                {/* BEGIN TO START CC HOLDER NAME TEXTFIELD */}
                <TextField
                  defaultValue=''
                  value={this.state.ccname}
                  autoCorrect={false}
                  onChangeText={(text)=> this.onChangeCCHolderNameNumber(text)}
                  label='Credit Card Holder Name'
                  containerStyle={{width:'90%',alignSelf:"center"}}
                  labelTextStyle={{color:"black"}}
                  baseColor={"black"}
                  tintColor={"black"}
                  errorColor={"red"}
                />
                {/* END TO START CC HOLDER NAME TEXTFIELD */}
            </View>

          </ScrollView>

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
    alignItems:'center'
  },
  payment_button: {
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    height:50
  }
});
// END TO START STYLE

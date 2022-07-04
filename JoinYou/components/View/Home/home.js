/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,View,ScrollView,SafeAreaView,Image} from 'react-native';
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";
import { RaisedTextButton } from 'react-native-material-buttons';

//type Props = {};

// BEGIN TO START SETUP MENU LIST
let renderMenuRow = [
 {
   "title":"Credit Card Style 1",
   "route":'FormStyle1'
 },
 {
   "title":"Credit Card Style 2",
   "route":'FormStyle2'
 },
 {
   "title":"Credit Card Style 3",
   "route":'FormStyle3'
 }
]
// END TO START SETUP MENU LIST

export default class Home extends Component<Props> {

  // BEGIN TO START HEADER
  static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
          return {
              headerTitle: (
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                        <Image source={GlobalInclude.StripeLogo} style={{ height:40,resizeMode:'contain'}}/>
                  </View>
              )
            };
   };
   // END TO START HEADER

  // BEGIN TO SETUP REDIRECT TO FORM VIEW
  onMenuRow(data){
    this.props.navigation.navigate(data.route)
  }
  // END TO SETUP REDIRECT TO FORM VIEW

  // BEGIN TO SETUP MENU BUTTON VIEW
  renderMenuRow(id,data) {
    return (
        <RaisedTextButton style={styles.button} rippleDuration={600} rippleOpacity={0.54} title={data.title}   color='#222222' titleColor='white' onPress={() => this.onMenuRow(data)}/>
    );
  }
  // END TO SETUP MENU BUTTON VIEW

  render() {

    return (
      <SafeAreaView style={styles.container}>
           {/* BEGIN TO SETUP MENU ROW VIEW */}
           <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.menuRow}>
                 {
                     renderMenuRow.map((datum,index) => { // This will render a row for each data element.
                         return this.renderMenuRow(index,datum);
                     })
                 }
              </View>
           </ScrollView>
           {/* END TO SETUP MENU ROW VIEW */}
      </SafeAreaView>
    );
  }
}

// BEGIN TO MAKE STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalInclude.Color.ContainerColor,
  },
  button: {
    margin: 4,
    width: 250,
    fontFamily:GlobalInclude.Font.FontLight
  },
  menuRow:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  }
});
// END TO MAKE STYLE

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,View,SafeAreaView,Alert,Dimensions,Image,Text,ScrollView} from 'react-native';
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";
import HtmlText from 'react-native-html-to-text'

type Props = {};
export default class InfoDetail extends Component<Props> {
  // BEGIN START HEADER VIEW
   static navigationOptions = ({navigation}) => {
       const {params = {}} = navigation.state;
         return {
             headerTitle: (
                 <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                       <Text style={{fontFamily:GlobalInclude.Font.FontBold,fontSize:17,color:GlobalInclude.Color.HeaderTextColor}}>{params.header_name}</Text>
                 </View>
             ),
             headerStyle: {backgroundColor: GlobalInclude.Color.HeaderColor},
             headerTintColor: GlobalInclude.Color.HeaderTextColor,
             headerRight:  <View style={{width:30,height:30}}></View>

             };
   };
   // END START HEADER VIEW

   componentWillMount () {

     // BEGIN METHOD FOR SET HEADER TITLE
           this.props.navigation.setParams({
                 header_name:this.props.navigation.getParam('name','')
           });
     // END METHOD FOR SET HEADER TITLE


   }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{backgroundColor:GlobalInclude.Color.ContainerColor}}>
            {/* BEGIN METHOD FOR DISPLAY DESCRIPTION */}
            <View style={{margin:10}}>
              <HtmlText html={this.props.navigation.getParam('description','')} style={{color:GlobalInclude.Color.DescriptionColor,marginTop:3}}/>
            </View>
            {/* END METHOD FOR DISPLAY DESCRIPTION */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// BEGIN TO MAKE STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalInclude.Color.ContainerColor,
  }
});
// END TO MAKE STYLE

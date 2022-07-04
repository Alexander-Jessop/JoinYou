
'use strict';
import React, { Component } from 'react';
import {Text, View,Alert,AsyncStorage,YellowBox } from 'react-native';
import {Button,Footer,Content,FooterTab,Container} from 'native-base';
 // Version can be specified in package.json
import {TabNavigator,createStackNavigator} from 'react-navigation'; // Version can be specified in package.json


//BEGIN TO IMPORT ALL FILE
import GlobalInclude from "../../GlobalInclude/globalinclude.js";
import MainView from "../../../View/Home/home.js"
import Info from '../../../View/Info/info.js'
import InfoDetail from '../../../View/Info/infodetail.js'
import FormStyle1 from "../../../View/Form/form_style1.js"
import FormStyle2 from "../../../View/Form/form_style2.js"
import FormStyle3 from "../../../View/Form/form_style3.js"
//END TO IMPORT ALL FILE

// BEGIN TO REMOVE ALL WARNING
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module createStackNavigator']);
console.disableYellowBox = true;
// END TO REMOVE ALL WARNING

// BEGIN TO DEFINE MENU NAME
let menu_1 = 'Home'
let menu_2 = 'Info'
// END TO DEFINE MENU NAME

// DEFINE TAB COLOR
const TabSelectColor = '#222222'
const TabDeselectColor = '#D3D3D3'

// BEGIN TO MAKE HOME STACK NAVIGATOR
const HomeStack = createStackNavigator({
  MainView: { screen: MainView,navigationOptions: {headerStyle: {
            backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} },
  FormStyle1: { screen: FormStyle1,navigationOptions: {headerStyle: {
            backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} },
  FormStyle2: { screen: FormStyle2,navigationOptions: {headerStyle: {
            backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} },
  FormStyle3: { screen: FormStyle3,navigationOptions: {headerStyle: {
            backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} }
});
// END TO MAKE HOME STACK NAVIGATOR

// BEGIN TO MAKE INFO STACK NAVIGATOR
const InfoStack = createStackNavigator({
    Info: { screen: Info,navigationOptions: {headerStyle: {
              backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} },
    InfoDetail: { screen: InfoDetail,navigationOptions: {headerStyle: {
              backgroundColor: GlobalInclude.Color.HeaderColor,},headerTintColor: GlobalInclude.Color.HeaderTextColor} }

});
// END TO MAKE INFO STACK NAVIGATOR

// BEGIN TO MAKE MAIN SCREEN NAVIGATOR
const MainScreenNavigator = TabNavigator(
  {
    Home: {screen : HomeStack},
    Info: {screen : InfoStack},
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {

      return (
        <View>

        <Footer style={{backgroundColor:GlobalInclude.Color.HeaderColor,color:"white",height:45}}>
          <FooterTab style={{backgroundColor:GlobalInclude.Color.HeaderColor,color:"white",height:45}}>

                {/* BEGIN TO MAKE HOME BUTTON METHOD */}
                <Button style={{backgroundColor:"transparent"}} vertical active={props.navigationState.index === 0} onPress={() => props.navigation.navigate("Home")}>
                    <GlobalInclude.FontAwesome
                      size={20} color={props.navigationState.index === 0 ? TabSelectColor  : TabDeselectColor}
                      name="bars"/>
                    <Text style={{fontSize: 14,color:props.navigationState.index === 0 ? TabSelectColor  : TabDeselectColor}} uppercase={false}>{menu_1}</Text>
                </Button>
                {/* END TO MAKE HOME BUTTON METHOD */}

                {/* BEGIN TO MAKE INFO BUTTON METHOD */}
                <Button style={{backgroundColor:"transparent"}} vertical active={props.navigationState.index === 1} onPress={() => props.navigation.navigate("Info")}>
                    <GlobalInclude.FontAwesome
                      size={20} color={props.navigationState.index === 1 ? TabSelectColor  : TabDeselectColor}
                      name="info-circle"/>
                    <Text style={{fontSize: 14,color:props.navigationState.index === 1 ? TabSelectColor  : TabDeselectColor}} uppercase={false}>{menu_2}</Text>
                </Button>
                {/* END TO MAKE INFO BUTTON METHOD */}

          </FooterTab>
        </Footer>
      </View>
    );
  }
});
// END TO MAKE MAIN SCREEN NAVIGATOR


export default class Example extends React.Component {
static router = MainScreenNavigator.router;

   // BEGIN TO START RENDER METHOD
   render() {
      return (
              <MainScreenNavigator navigation={this.props.navigation}/>
            );
   }
   // END TO START RENDER METHOD
 }

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Alert,ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";
import { RaisedTextButton } from 'react-native-material-buttons';
type Props = {};

// BEGIN TO SETUP MENU LIST
let menu_list =  [
    {
      "title": "Privacy Policy",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in varius nisl. Vestibulum non pellentesque arcu. Nam mauris turpis, commodo aliquam sapien sed, convallis volutpat ex. Quisque eu metus accumsan, vehicula elit eu, tincidunt lectus. In mollis est nec felis commodo, eget aliquam neque pretium. Ut molestie magna vitae purus vulputate, sit amet placerat risus gravida. Nulla sed dui et nunc auctor aliquet quis vel neque. Nulla libero lacus, dignissim sit amet mattis nec, dapibus ac lectus. Curabitur pulvinar dui porta, auctor diam sit amet, imperdiet elit.",
    },
    {
      "title": "Disclaimer",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in varius nisl. Vestibulum non pellentesque arcu. Nam mauris turpis, commodo aliquam sapien sed, convallis volutpat ex. Quisque eu metus accumsan, vehicula elit eu, tincidunt lectus. In mollis est nec felis commodo, eget aliquam neque pretium. Ut molestie magna vitae purus vulputate, sit amet placerat risus gravida. Nulla sed dui et nunc auctor aliquet quis vel neque. Nulla libero lacus, dignissim sit amet mattis nec, dapibus ac lectus. Curabitur pulvinar dui porta, auctor diam sit amet, imperdiet elit.",
    }
  ]
  // END TO SETUP MENU LIST


export default class Info extends Component<Props> {

  // BEGIN TO START HEADER VIEW
  static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
          return {
              headerTitle: (
                  <View style={{flex:1, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:17,color:GlobalInclude.Color.HeaderTextColor,fontFamily:GlobalInclude.Font.FontBold}}>Info</Text>
                  </View>
              )
            };
    };
    // END TO START HEADER VIEW

    constructor(props) {
        super(props);

        // BEGIN TO SETUP STATE
        this.state = {
            SettingList: [],
            success:0
        };
        // END TO SETUP STATE

    }
    SendRequestForSetting () {
        // BEGIN TO SETUP MENU LIST
        this.setState({
            SettingList:menu_list,
            success:1
        })
        // END TO SETUP MENU LIST
    }
    componentWillMount() {
      // BEGIN TO SEND REQUEST FOR MENU LIST
      this.SendRequestForSetting();
      // END TO SEND REQUEST FOR MENU LIST
    }

  //BEGIN SETTING TAB ROW CLICK
  onSettingRow(data){
            this.props.navigation.navigate('InfoDetail',{'name':data.title,'description':data.description});
  }
  //END SETTING TAB ROW CLICK

  //BEGIN SETTING ROW VIEW
  renderSettingRow(id,data) {
         return (
             <RaisedTextButton style={styles.button} rippleDuration={600} rippleOpacity={0.54} title={data.title}   color='#222222' titleColor='white' onPress={() => this.onSettingRow(data)}/>
         );
  }
  //END SETTING ROW VIEW

  render() {
    if (this.state.success == 0) {
      return (
        <View>
          {/* BEGIN LOADER VIEW */}
          <GlobalInclude.Loader> </GlobalInclude.Loader>
            {/* END LOADER VIEW */}
        </View>
      )
    }else {
      return (
        <SafeAreaView style={{flex:1,backgroundColor:GlobalInclude.Color.ContainerColor}}>

              {/* BEGIN SETTING LIST VIEW */}
              <ScrollView>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:10 }}>
                     {
                         this.state.SettingList.map((datum,index) => { // This will render a row for each data element.
                             return this.renderSettingRow(index,datum);
                         })
                     }
                  </View>
               </ScrollView>
               {/* END SETTING LIST VIEW*/}

         </SafeAreaView>
      );
    }

  }
}

// BEGIN TO MAKE STYLE
const styles = StyleSheet.create({
  button: {
    margin: 4,
    width: 250,
    fontFamily:GlobalInclude.Font.FontLight
  }
});
// END TO MAKE STYLE

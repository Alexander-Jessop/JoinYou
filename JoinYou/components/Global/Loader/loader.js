import React, { Component } from "react";
import {StyleSheet,Dimensions} from 'react-native';
import GlobalInclude from "../GlobalInclude/globalinclude.js";
import {View} from "native-base";
import Orientation from 'react-native-orientation';
import ProgressBar from 'react-native-progress/CircleSnail';

class Loader extends React.Component {

  componentDidMount() {
    // ADD ORIENTATION LISTENER
    Orientation.addOrientationListener(this._orientationDidChange)
  }
  componentWillUnmount() {
    // REMOVE ORIENTATION LISTENER
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  // BEGIN METHOD FOR ORIENTATION CHANGE
  _orientationDidChange=(orientation)=> {
    this.render();
  }
  // END METHOD FOR ORIENTATION CHANGE

  render() {

    return(
      <View style={{backgroundColor: 'rgba(52, 52, 52, 0.7)',position: "absolute",top: 0, left: 0, bottom: 0, right: 0}}>
          {/* BEGIN METHOD FOR DISPLAY LOADER VIEW */}
          <View style={{flex: 1,justifyContent:'center',position: "absolute",marginTop: (Dimensions.get('window').height/2)-100,marginLeft: (Dimensions.get('window').width/2)-30,}}>
                <ProgressBar
                  style={{margin: 10}}
                  color={[
                    'purple',
                    'red',
                    'green',
                  ]}
                  size={50}
                />
          </View>
          {/* END METHOD FOR DISPLAY LOADER VIEW */}
      </View>
      );
  }
}

export default Loader;

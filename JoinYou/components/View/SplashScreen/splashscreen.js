import React, { Component } from 'react';
import {YellowBox,View,Image,StyleSheet,Animated} from 'react-native';
import Route from "../../Global/Menu/Route/route.js";
import GlobalInclude from "../../Global/GlobalInclude/globalinclude.js";

// BEGIN REMOVE WARNING
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);
// END REMOVE WARNING



  // BEGIN LOGO ANIMATION
  class ImageLoader extends React.Component {
        state = {
              opacity: new Animated.Value(0),
        }

        onLoad = () => {
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
         }

        render() {
          return (
            <Animated.Image
              onLoad={this.onLoad}
              {...this.props}
              style={[
                {
                  opacity: this.state.opacity,
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.85, 1],
                      })
                    },
                  ],
                },
                this.props.style,
              ]}
            />
            );
          }
    }
   // END LOGO ANIMATION

class SplashScreen extends React.Component {
    constructor() {
        super();
        // BEGIN TO START DEFINE STATE
        this.state = {
            LoginPage: 0,
            is_loading: 0,
        };
        // END TO START DEFINE STATE
    }

    componentWillMount(){
          console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed']; // REMOVE WARNING

          // BEGIN IOS APP START
                setTimeout(() => {
                    this.setState({
                                  LoginPage : 1,
                                  })
                },2000);
          // END IOS APP START
   }


  render() {
    if( this.state.LoginPage == 0 ){
                return (
                        <View style={styles.container}>

                          {/* BEGIN LOGO ANIMATED */}
                          <ImageLoader
                          style={styles.image}
                          source={GlobalInclude.MainLogo}/>
                          {/* END LOGO ANIMATED */}

                        </View>
                       );
      }else {
            // BEGIN APP
            return <Route />
              }
      }
  }

// BEGIN TO START STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width:200,
    height: 130,
    resizeMode:'contain',
  }
});
// END TO START STYLE
module.exports = SplashScreen;

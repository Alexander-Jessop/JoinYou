import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Card, Text, TextInput, Button } from "react-native-paper";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const loginError = authContext.authError;
  const [showPass, setshowPass] = useState(false);
  const user = authContext.user;

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVis = () => {
    setshowPass(!showPass);
  };

  //if a user is logged in, navigation.reset to Home Screen
  //https://reactnavigation.org/docs/navigation-prop/#reset
  useEffect(() => {
    if (user) {
      navigation.reset({
        routes: [{ name: "Home" }],
      });
    }
  }, [user]);

  return (
    <View style={styles.content}>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Title title="JoinYou" titleStyle={styles.cardTitle} />
          <Card.Content>
            <TextInput
              theme={{
                colors: {
                  primary: "#007F5F",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
              style={styles.input}
              label="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
            <TextInput
              theme={{
                colors: {
                  primary: "#007F5F",
                  underlineColor: "transparent",
                  background: "transparent",
                },
              }}
              right={
                <TextInput.Icon
                  name="eye-off-outline"
                  onPress={togglePasswordVis}
                />
              
              style={styles.input}
              label="Password"
              value={password}
              secureTextEntry={showPass ? false : true}
              onChangeText={(e) => setPassword(e)}
              // keyboardType="visible-password" create a ?: with secure text and add button
            />
            {loginError && <Text>{loginError}</Text>}
            <Button style={styles.flatbutton} uppercase={false} color="#007F5F">
              Forgot Email/Password
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              title="LOGIN"
              onPress={() => {
                loginFn(email, password);
                // if (user) {
                //   navigation.replace("Home");
                // }
              }}
            >
              Login
            </Button>
        
          ),

      function facebookButton() {
        return <View
            style={styles.faceBookButtonContainerStyle}>
            <Image source={require('../../assets/images/facebook.png')}
                style={{ height: 30.0, width: 30.0 }}
                resizeMode="contain"
            />
            <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}>Log in with Facebook</Text>
        </View>
    ),

    function googleButton() {
        return <View
            style={styles.googleButtonContainerStyle}>
            <Image source={require('../../assets/images/google.png')}
                style={{ height: 30.0, width: 30.0 }}
                resizeMode="contain"
            />
            <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>Log in with Google</Text>
        </View>
    };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/influencer.jpg')}
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.80)', 'rgba(0,0,0,0.20)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <Text style={{ ...Fonts.white30Bold, marginTop: 100.0, }}>Welcome!</Text>
                    <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}>Login in your account</Text>
                    {phoneNumberInput()}
                    {continueButton()}
                    {otpText()}
                    {facebookButton()}
                    {googleButton()}
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    )
}},

const styles = StyleSheet.create({
    phoneNumberContainerStyle: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: Sizes.fixPadding + 15.0,
        marginTop: Sizes.fixPadding * 9.0,
    },
    faceBookButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        backgroundColor: '#3B5998',
    },
    googleButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 4.0,
        backgroundColor: 'white',
    }
})


            <Button
              color="#007F5F"
              style={styles.flatbutton}
              title="REGISTER"
              onPress={() => navigation.replace("Register")}
            >
              Register
            </Button>
            {/* <Button title="LOG OUT" onPress={() => logoutFn()} /> */}
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    marginTop: 50,
    width: "80%",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#007F5F",
    marginTop: 5,
  },
  flatbutton: {
    marginTop: 5,
  },
  input: {
    color: "#FFF",
    marginTop: 2,
    mode: "outlined",
  },
  cardTitle: {
    color: "#007F5F",
    alignItems: "center",
    // textAlign: "center", move the title to the middle
  },
});

export default LoginForm;

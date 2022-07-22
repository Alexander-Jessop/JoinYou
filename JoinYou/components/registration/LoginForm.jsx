import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import * as Facebook from "expo-facebook";
import { FirebaseContext } from "../../src/FirebaseProvider";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth
  const facebookAuthProvider = fbContext.facebookAuthProvider
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



  const SignInWithFacebook = async () => {
    try {
        await Facebook.initializeAsync('1162142064580816', 'JoinYou');
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
          // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
          const credential = facebookAuthProvider.credentialFromResult(token);
          signInWithCredential(auth, credential)
            .then(user => { // All the details about user are in here returned from firebase
              console.log('Logged in successfully', user)
            })
            .catch((error) => {
              console.log('Error occurred ', error)
            });
        } else {
          // type === 'cancel'
        }
     } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
     }
   }

   async function facebookLogIn() {
    const appId = '1162142064580816'
    const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
    
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      {permissions}
    );
  
    switch (type) {
      case 'success': {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
  
        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data
        
        return Promise.resolve({type: 'success'});
      }
      case 'cancel': {
        return Promise.reject({type: 'cancel'});
      }
    }
  }

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
                  name={showPass ? "eye-off-outline" : "eye-outline"}
                  onPress={togglePasswordVis}
                  color="#007F5F"
                />
              }
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
            <Button
              color="#007F5F"
              style={styles.flatbutton}
              title="REGISTER"
              onPress={() => navigation.replace("Register")}
            >
              Register
            </Button>
            {/* <Button title="LOG OUT" onPress={() => logoutFn()} /> */}
            <TouchableOpacity
              onPress={SignInWithFacebook}
              style={styles.button}
            >
              <Text style={styles.buttonText}> Sign in with Facebook </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={facebookLogIn}
              style={styles.button}
            >
              <Text style={styles.buttonText}> Sign in with Facebook 2</Text>
            </TouchableOpacity>
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

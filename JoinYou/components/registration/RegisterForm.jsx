import React, { useContext, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../src/AuthProvider";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//https://firebase.google.com/docs/auth/web/start#sign_up_new_users
import { Card, Text, TextInput, Button, HelperText } from "react-native-paper";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [matchingPassword, setMatchingPassword] = useState(true);
  const [matchingEmail, setMatchingEmail] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();

  const authContext = useContext(AuthContext);
  const login = authContext.login;

  function pressHandler() {
    navigation.replace("Login");
  }

  const onContinueHandler = () => {
    if (emailIsValid && password && matchingEmail && matchingPassword) {
      Alert.alert("Account Created Succesfully!");
      navigation.replace("InfoPage");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      login(email, password);
    } else {
      Alert.alert("Invalid Credentials!");
    }
  };
  const emailHasErrors = () => {
    return !email.includes("@");
  };
  const emailMatchError = () => {
    return email !== confirmEmail;
  };
  const hasErrors = () => {
    return password.length < 7;
  };
  const passwordMatchError = () => {
    return password !== confirmPassword;
  };

  const togglePasswordVis = () => {
    setShowPass(!showPass);
  };

  return (
    <View style={styles.content}>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Content>
            <Card.Title title="Sign Up" titleStyle={styles.cardTitle} />

            <View>
              <TextInput
                theme={{
                  colors: {
                    primary: "#007F5F",
                    underlineColor: "transparent",
                    background: "transparent",
                  },
                }}
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={(e) => setEmail(e)}
                label="Email"
                onBlur={() => setEmailIsValid(!emailHasErrors())}
              />
              <HelperText type="error" visible={!emailIsValid}>
                Must be a valid e-mail address
              </HelperText>
            </View>

            <View>
              <TextInput
                theme={{
                  colors: {
                    primary: "#007F5F",
                    underlineColor: "transparent",
                    background: "transparent",
                  },
                }}
                style={styles.input}
                keyboardType="email-address"
                value={confirmEmail}
                onChangeText={(e) => setConfirmEmail(e)}
                label="Confirm Email"
                onBlur={() => setMatchingEmail(!emailMatchError())}
              />
              <HelperText type="error" visible={!matchingEmail}>
                E-mails must match
              </HelperText>
            </View>
            <View>
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
                value={password}
                onChangeText={(e) => setPassword(e)}
                label="Password"
                secureTextEntry={showPass ? false : true}
                onBlur={() => setPasswordIsValid(!hasErrors())}
              />
              <HelperText type="error" visible={!passwordIsValid}>
                Password must be at least 7 characters
              </HelperText>
            </View>

            <View>
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
                    color="#007F5F"
                    name={showPass ? "eye-off-outline" : "eye-outline"}
                    onPress={togglePasswordVis}
                  />
                }
                style={styles.input}
                value={confirmPassword}
                onChangeText={(e) => setConfirmPassword(e)}
                label="Confirm Password"
                secureTextEntry={showPass ? false : true}
                onBlur={() => setMatchingPassword(!passwordMatchError())}
              />
              <HelperText type="error" visible={!matchingPassword}>
                Password must be the same
              </HelperText>
            </View>
            <Button
              mode="contained"
              color="#007F5F"
              style={styles.flatbutton}
              title="Continue"
              onPress={onContinueHandler}
            >
              Continue
            </Button>
            <Button color="#007F5F" title="LOGIN" onPress={pressHandler}>
              LOGIN
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 60,
    alignContent: "center",
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
    marginTop: 30,
  },
  input: {
    color: "#FFF",
  },
  cardTitle: {
    color: "#007F5F",
    alignItems: "center",
    // textAlign: "center", move the title to the middle
  },
  text: {
    marginTop: 10,
    color: "#007F5F",
  },
});

export default RegisterForm;

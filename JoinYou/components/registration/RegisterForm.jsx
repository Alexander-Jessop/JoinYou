import React, { useContext, useState } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../src/AuthProvider";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//https://firebase.google.com/docs/auth/web/start#sign_up_new_users
import { Card, TextInput, Button, HelperText } from "react-native-paper";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const hasErrors = () => {
    return !password;
  };

  const authContext = useContext(AuthContext);
  const login = authContext.login;

  const onContinueHandler = () => {
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email.toLowerCase() === confirmEmail.toLowerCase();
    const passwordsAreEqual = password === confirmPassword;

    if (
      emailIsValid &&
      passwordIsValid &&
      emailsAreEqual &&
      passwordsAreEqual
    ) {
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

  return (
    <View style={styles.content}>
      <View style={styles.view}>
        <Card style={styles.card}>
          <Card.Content>
            <Card.Title title="Sign Up" titleStyle={styles.cardTitle} />
            <Card>
              <Card.Content>
                <Text style={styles.text}>Enter your email address:</Text>
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
                />
                <Text style={styles.text}>Confirm your email address:</Text>
                <TextInput
                  theme={{
                    colors: {
                      primary: "#007F5F",
                      underlineColor: "transparent",
                      background: "transparent",
                    },
                  }}
                  style={styles.input}
                  value={confirmEmail}
                  onChangeText={(e) => setConfirmEmail(e)}
                  label="Confirm Email"
                />
              </Card.Content>
            </Card>
            <Text>{"\n"}</Text>
            <Card>
              <Card.Content>
                <View>
                  <Text>Enter your password:</Text>
                  <TextInput
                    theme={{
                      colors: {
                        primary: "#007F5F",
                        underlineColor: "transparent",
                        background: "transparent",
                      },
                    }}
                    style={styles.input}
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    label="Password"
                    secureTextEntry={true}
                  />
                  <HelperText type="error" visible={hasErrors()}>
                    Password must be at least 7 characters
                  </HelperText>
                </View>
                <Text style={styles.text}>Confirm your password:</Text>
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
                    value={confirmPassword}
                    onChangeText={(e) => setConfirmPassword(e)}
                    label="Confirm Password"
                    secureTextEntry={true}
                  />
                  <HelperText type="error" visible={hasErrors()}>
                    Password must be the same
                  </HelperText>
                </View>
              </Card.Content>
            </Card>
            <Text>
              *password must be at least 7 characters {"\n"}
              {"\n"}
              {"\n"}
            </Text>
            <Button
              mode="contained"
              color="#007F5F"
              style={styles.flatbutton}
              title="Continue"
              onPress={onContinueHandler}
            >
              Continue
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
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
    height: 45,
  },
  cardTitle: {
    color: "#007F5F",
    alignItems: "center",
    // textAlign: "center", move the title to the middle
  },
  text: {
    marginTop: 10,
  },
});

export default RegisterForm;

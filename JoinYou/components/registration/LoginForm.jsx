import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../src/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Card, Text, TextInput, Button } from "react-native-paper";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const loginError = authContext.authError;
  const user = authContext.user;

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.content}>
      <Text>
        {"\n"}
        {user
          ? "You are logged in as: " + user.email
          : "You are not logged in."}
        {"\n"}
      </Text>
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
              label="email"
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
              right={<TextInput.Icon name="eye-off-outline" />}
              style={styles.input}
              label="password"
              value={password}
              secureTextEntry={true}
              onChangeText={(e) => setPassword(e)}
              // keyboardType="visible-password" create a ?: with secure text and add button
            />
            {loginError && <Text>{loginError}</Text>}
            <Button style={styles.flatbutton} uppercase={false} color="#007F5F">
              Forgot email/password
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              title="LOGIN"
              onPress={() => {
                loginFn(email, password);
                if (user) {
                  navigation.replace("Home");
                }
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

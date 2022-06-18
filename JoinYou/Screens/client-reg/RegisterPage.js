import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import RegisterForm from "../../components/registration/RegisterForm";

const RegisterPage = () => {
  return <RegisterForm />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export default RegisterPage;

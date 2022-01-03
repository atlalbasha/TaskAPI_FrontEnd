import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function createNewUser() {
    fetch("https://localhost:7162/api/Auth/register", {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        todos: [
          {
            id: 0,
            title: "string",
            isCompleted: false,
          },
        ],
      }),
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.signInView}>
        <CustomInput
          onChangeText={setUsername}
          value={username}
          placeholder={"Username"}
          isPassword={false}
        />

        <CustomInput
          onChangeText={setPassword}
          value={password}
          placeholder={"Password"}
          isPassword={true}
        />

        <CustomInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder={"Confirm Password"}
          isPassword={true}
        />

        <View style={styles.spacer}></View>

        <CustomButton
          title="Create new account"
          isActive={true}
          onPress={() => {
            console.log("register");
            //{createNewUser}
          }}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252b41",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signInView: {
    borderColor: "#3b4053",
    borderRadius: 8,
    borderWidth: 1,
    padding: 32,
  },
  spacer: {
    height: 12,
  },
  white: {
    color: "white",
  },
});

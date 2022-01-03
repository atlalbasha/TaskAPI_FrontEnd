import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  function loginFetch() {
    fetch("https://localhost:7162/api/Auth/login", {
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
    })
      .then((response) => response.json())
      .then((json) => {
        setToken(json);
        navigation.push("Home", json);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>todoMore</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
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

        <View style={styles.spacer}></View>

        <CustomButton
          title="Login"
          isActive={true}
          onPress={() => {
            console.log("login");
            //{loginFetch}
          }}
        />
        <Text style={{ color: "#fff" }}>
          Don't have an account?{" "}
          <Text
            onPress={() => {
              navigation.push("Register");
            }}
            style={{ color: "#0496FF" }}
          >
            Sign up now.
          </Text>
        </Text>
      </View>

      <Text
        style={{ color: "#fff", marginTop: 8 }}
        onPress={() => {
          console.log("forgot password!");
        }}
      >
        Forgot password?
      </Text>
    </View>
  );
};

export default LoginScreen;

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
  header: {
    fontFamily: "FredokaOne_400Regular",
    fontSize: 46,
    color: "white",
  },
  subtitle: {
    marginBottom: 32,
    fontSize: 14,
    color: "white",
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";

const HomeScreen = ({ route, navigation }) => {
  const { userId, token } = route.params;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    sendToken();
  });

  function sendToken() {
    fetch("https://localhost:7162/User/" + userId + "/todos", {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView>
      <Text>Home Screen {token}</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      />
      <Button onPress={sendToken} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

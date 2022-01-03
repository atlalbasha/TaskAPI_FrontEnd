import React from "react";

import { StyleSheet, Text, View, Pressable } from "react-native";

const ButtonStyle = ({ title, isActive, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        disabled={!isActive}
        style={isActive ? styles.button : styles.buttonDisabled}
        onPress={onPress}
      >
        <Text style={isActive ? styles.buttonText : styles.buttonTextDisabled}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default ButtonStyle;

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: "#0496FF",
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 0,
    backgroundColor: "#3B4053",
  },
  buttonText: {
    color: "white",
  },
  buttonTextDisabled: {
    color: "grey",
  },
});

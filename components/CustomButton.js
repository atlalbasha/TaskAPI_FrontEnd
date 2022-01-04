import React from "react";

import { StyleSheet, Text, View, Pressable } from "react-native";

import { useFonts, Nunito_400Regular } from "@expo-google-fonts/nunito";

const ButtonStyle = ({ title, isActive, onPress }) => {
  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
  });

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
    fontFamily: "Nunito_400Regular",
    color: "white",
  },
  buttonTextDisabled: {
    color: "grey",
  },
});

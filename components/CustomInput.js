import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const CustomInput = ({ onChangeText, value, placeholder, isPassword }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType="default"
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 42,
    backgroundColor: "#3b4053",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#3b4053",
    borderWidth: 1,
    borderRadius: 8,
    color: "white",
    marginBottom: 8,
  },
});

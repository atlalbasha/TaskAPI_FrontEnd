import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";

const CustomCard = ({ id, title, isCompleted, onTouch, deleteTodo }) => {
  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });

  return (
    <TouchableOpacity
      onLongPress={() => {
        deleteTodo(id);
      }}
      onPress={() => {
        onTouch(id, isCompleted, title);
      }}
    >
      <View style={styles.container}>
        <View style={styles.isCompleted}>
          <Checkbox
            value={isCompleted}
            color={isCompleted ? "#0496FF" : undefined}
          />
        </View>
        <View style={styles.title}>
          <Text style={!isCompleted ? styles.text : styles.textDone}>
            {title}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              deleteTodo(id);
            }}
          >
            <Ionicons name="trash-sharp" size={20} color="#DD6B55" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    width: 400,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#3B4053",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  title: { flex: 10 },
  isCompleted: { flex: 1 },
  titleColor: { color: "white" },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: "white",
  },
  textDone: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: "white",
    textDecorationLine: "line-through",
  },
});

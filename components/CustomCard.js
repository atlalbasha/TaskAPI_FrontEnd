import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Ionicons } from '@expo/vector-icons'

const CustomCard = ({ id, title, isCompleted, onTouch, deleteTodo }) => {
  console.log(isCompleted)

  return (
    <TouchableOpacity
      onLongPress={() => {
        deleteTodo(id)
      }}
      onPress={() => {
        onTouch(id, isCompleted, title)
      }}
    >
      <View style={styles.container}>
        <View style={styles.isCompleted}>
          <Checkbox
            value={isCompleted}
            color={isCompleted ? '#0496FF' : undefined}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleColor}>{title}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              deleteTodo(id)
            }}
          >
            <Ionicons name="trash-outline" size={24} color="#DD6B55" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CustomCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    //justifyContent: "space-around"
    backgroundColor: '#3B4053',
    borderRadius: 4,
    margin: 4
  },
  title: { flex: 10 },
  isCompleted: { flex: 1 },
  titleColor: { color: 'white' }
})

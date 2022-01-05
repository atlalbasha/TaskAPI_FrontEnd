import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import CustomCard from '../components/CustomCard'
import {
  useFonts,
  JosefinSans_400Regular
} from '@expo-google-fonts/josefin-sans'

const HomeScreen = ({ route }) => {
  const { userId, token } = route.params
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [pleaseEnterTodo, setPleaseEnterTodo] = useState('New Todo')

  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    //FredokaOne_400Regular,
    JosefinSans_400Regular
    //Nunito_400Regular
  })

  useEffect(() => {
    sendToken()
  }, [])

  function onTouch(id, isCompleted, title) {
    console.log(id)
    console.log(isCompleted)
    fetch('https://localhost:7162/Todo/' + id, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        isCompleted: !isCompleted
      })
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json)
        sendToken()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function postTodo() {
    if (newTodo !== '') {
      fetch('https://localhost:7162/Todo/' + userId, {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTodo,
          isCompleted: false
        })
      })
        .then((response) => response.text())
        .then((json) => {
          console.log(json)

          setNewTodo('')
          sendToken()
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setPleaseEnterTodo('Please enter a Todo')
    }
  }

  function sendToken() {
    fetch('https://localhost:7162/User/' + userId + '/todos', {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setTodos(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function deleteTodo(id) {
    console.log(id)

    fetch('https://localhost:7162/Todo/' + id, {
      method: 'DELETE',
      headers: {
        Accept: '*/*'
      }
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json)
        sendToken()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>My todos</Text>
      <View style={styles.todoInput}>
        <View style={{ flex: 4, marginEnd: 8 }}>
          <CustomInput
            onChangeText={setNewTodo}
            value={newTodo}
            placeholder={pleaseEnterTodo}
            isPassword={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton title="Add" onPress={postTodo} isActive={true} />
        </View>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <CustomCard
            title={item.title}
            isCompleted={item.isCompleted}
            id={item.id}
            onTouch={onTouch}
            deleteTodo={deleteTodo}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252b41',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    fontFamily: 'JosefinSans_400Regular',
    marginBottom: 32,
    fontSize: 18,
    color: 'white'
  },
  todoInput: {
    width: 400,
    flexDirection: 'row'
  }
})

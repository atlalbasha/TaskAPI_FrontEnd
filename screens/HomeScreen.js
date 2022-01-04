import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList
} from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import CustomCard from '../components/CustomCard'

const HomeScreen = ({ route, navigation }) => {
  const { userId, token } = route.params
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

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
    <SafeAreaView>
      <View style={styles.headers}>
        <CustomInput
          onChangeText={setNewTodo}
          value={newTodo}
          placeholder={'Add new todo more'}
          isPassword={false}
        />
        <CustomButton title="Add Task" onPress={postTodo} isActive={true} />
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
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headers: {
    flexDirection: 'row'
  }
})

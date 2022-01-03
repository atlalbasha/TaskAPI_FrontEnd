import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button
} from 'react-native'

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  function loginFetch() {
    fetch('https://localhost:7162/api/Auth/login', {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userName,
        password: password,
        todos: [
          {
            id: 0,
            title: 'string',
            isCompleted: false
          }
        ]
      })
    })
      .then((response) => response.json())
      .then((json) => {
        setToken(json)
        navigation.push('Home', json)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <SafeAreaView>
      <Text>Login </Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={loginFetch} />
      <Button title="Register" onPress={() => navigation.push('Register')} />
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, Button } from 'react-native'

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function createNewUser() {
    fetch('https://localhost:7162/api/Auth/register', {
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
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <Text>Register {userName} </Text>
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

      <Button title="Register" onPress={createNewUser} />
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

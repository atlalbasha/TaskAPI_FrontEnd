import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import {
  useFonts,
  JosefinSans_400Regular
} from '@expo-google-fonts/josefin-sans'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showError, setShowError] = useState(false)

  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular
  })

  function createNewUser() {
    if (password == confirmPassword) {
      fetch('https://localhost:7162/api/Auth/register', {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
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
    } else {
      setShowError(true)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        todo<Text style={{ color: '#0496FF' }}>More</Text>
      </Text>
      <Text style={styles.subtitle}>Register a new account</Text>
      <View style={styles.signInView}>
        <CustomInput
          onChangeText={setUsername}
          value={username.trim()}
          placeholder={'Username'}
          isPassword={false}
        />

        <CustomInput
          onChangeText={setPassword}
          value={password.trim()}
          placeholder={'Password'}
          isPassword={true}
        />

        <CustomInput
          onChangeText={setConfirmPassword}
          value={confirmPassword.trim()}
          placeholder={'Confirm Password'}
          isPassword={true}
        />

        <Text style={styles.errorText}>
          {showError ? 'Password no match' : ''}{' '}
        </Text>
        <View style={styles.spacer}></View>

        <CustomButton
          title="Create new account"
          isActive={true}
          onPress={createNewUser}
        />
      </View>
      <View style={styles.spacer}></View>
      <Text style={styles.text}>
        By registering you agree to the{' '}
        <Text style={{ color: '#0496FF' }}>Terms & Conditions</Text>
        {'\n'} and <Text style={{ color: '#0496FF' }}>Privacy Policy</Text> of
        todoMore
      </Text>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252b41',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInView: {
    width: 400,
    borderColor: '#3b4053',
    borderRadius: 8,
    borderWidth: 1,
    padding: 32
  },
  spacer: {
    height: 12
  },
  header: {
    fontFamily: 'FredokaOne_400Regular',
    fontSize: 46,
    color: 'white'
  },
  subtitle: {
    fontFamily: 'JosefinSans_400Regular',
    marginBottom: 32,
    fontSize: 14,
    color: 'white'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: 'white'
  },
  errorText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#DD6B55'
  }
})

import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one'
import { JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans'
import { Nunito_400Regular } from '@expo-google-fonts/nunito'

const LoginScreen = ({ navigation }) => {
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //CUSTOM FONTS
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    JosefinSans_400Regular,
    Nunito_400Regular
  })

  function loginFetch() {
    fetch('https://localhost:7162/api/Auth/login', {
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
    <View style={styles.container}>
      <Text style={styles.header}>
        todo<Text style={{ color: '#0496FF' }}>More</Text>
      </Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <View style={styles.signInView}>
        <CustomInput
          onChangeText={setUsername}
          value={username}
          placeholder={'Username'}
          isPassword={false}
        />

        <CustomInput
          onChangeText={setPassword}
          value={password}
          placeholder={'Password'}
          isPassword={true}
        />

        <View style={styles.spacer}></View>

        <CustomButton title="Login" isActive={true} onPress={loginFetch} />
        <Text style={styles.text}>
          Don't have an account?{' '}
          <Text
            onPress={() => {
              navigation.push('Register')
            }}
            style={{ color: '#0496FF' }}
          >
            Sign up now.
          </Text>
        </Text>
      </View>
      <View style={styles.spacer}></View>
      <Text
        style={styles.text}
        onPress={() => {
          console.log('forgot password!')
        }}
      >
        Forgot password?
      </Text>
    </View>
  )
}

export default LoginScreen

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
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: 'white'
  }
})

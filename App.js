import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#252b41' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            //fontfamily
            fontWeight: 'bold'
          },
          headerShadowVisible: false
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: ''
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: '',
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Login')
                }}
              >
                <Ionicons
                  style={styles.icon}
                  name="log-out-outline"
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginEnd: 8
  }
})

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/home'
import Name from './screens/Name'
import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Email from './screens/Email'
import SignUp from './screens/SignUp'
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
        {/* <Stack.Screen name="Name" component={Name} /> */}
        {/* <Stack.Screen name="Email" component={Email} /> */}
        {/* <Stack.Screen name="Forgot" component={Forgot} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

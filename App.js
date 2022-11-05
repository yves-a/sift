import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './screens/home'
import Name from './screens/Name'
import Login from './screens/Login'
import Forgot from './screens/Forgot'
import Email from './screens/Email'
import SignUp from './screens/SignUp'
import Relationship from "./screens/relationship";
import Intrests from "./screens/intrests";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Relationship" component={Relationship} />
        <Stack.Screen name="Intrests" component={Intrests} />
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
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Name from "./screens/Name";
import Login from "./screens/Login";
import Forgot from "./screens/Forgot";
import Email from "./screens/Email";
import SignUp from "./screens/SignUp";
import Relationship from "./screens/Relationship";
import Interests from "./screens/Interests";
import Swipe from "./screens/Swipe";
import Price from "./screens/Price";
import RecipientName from "./screens/RecipientName";
import Date from "./screens/Date";

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
        <Stack.Screen name="Interests" component={Interests} />
        <Stack.Screen name="Name" component={Name} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Swipe" component={Swipe} />
        <Stack.Screen name="Price" component={Price} />
        <Stack.Screen name="RecipientName" component={RecipientName} />
        <Stack.Screen name="Date" component={Date} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

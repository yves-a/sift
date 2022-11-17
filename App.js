import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
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
import PurchaseDate from "./screens/PurchaseDate";
import Landing from "./screens/Landing";
import Profile from "./screens/Profile";
import Loading from "./screens/Loading";
import InterestsV2 from "./screens/InterestsV2";
import { auth, onAuthStateChanged } from "./firebase.js";

import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// global.currRec = "123";

const loggedIn = true;

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="RecipientName" component={RecipientName} />
      <Stack.Screen name="PurchaseDate" component={PurchaseDate} />
      <Stack.Screen name="Relationship" component={Relationship} />
      <Stack.Screen name="Interests" component={Interests} />
      <Stack.Screen name="Price" component={Price} />
      <Stack.Screen name="Name" component={Name} />
      <Stack.Screen name="Swipe" component={Swipe} />
      <Stack.Screen name="InterestsV2" component={InterestsV2} />
    </Stack.Navigator>
  );
}

function SavedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function SwipeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Swipe" component={Swipe} />
    </Stack.Navigator>
  );
}

function UnauthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (user) {
    global.currRecipient = "123";
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "bookmark";

              if (route.name === "Saved") {
                iconName = focused ? "bookmark" : "bookmark-outline";
              } else if (route.name === "Swipe") {
                iconName = focused ? "gift" : "gift-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            cardStyle: { backgroundColor: "white" },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#3D6F99",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Swipe" component={SwipeStack} />
          <Tab.Screen
            name="Saved"
            component={SavedStack}
            options={{ tabBarBadge: 32 }}
          />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <UnauthenticatedStack />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Name from "./screens/Name";
import Login from "./screens/Login";
import Forgot from "./screens/Forgot";
import Email from "./screens/Email";
import SignUp from "./screens/SignUp";
import Relationship from "./screens/relationship";
import Interests from "./screens/Interests";
import Swipe from "./screens/Swipe";
import Price from "./screens/Price";
import RecipientName from "./screens/RecipientName";
import PurchaseDate from "./screens/PurchaseDate";
import Landing from "./screens/Landing";
import Profile from "./screens/Profile";
import Loading from "./screens/Loading";
import InterestsV2 from "./screens/InterestsV2";
import CreateCollection from "./screens/CreateCollection";
import Gender from "./screens/Gender";
import Age from "./screens/Age";
import Personality from "./screens/Personality";
import Saved from "./screens/Saved";
import FullSaved from "./screens/FullSaved";
import Collection from "./screens/Collection";
import AddSaved from "./screens/AddSaved";
import Product from "./screens/Product";
import EditProfile from "./screens/EditProfile";
import { auth } from "./firebase.js";

import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
// LogBox.ignoreLogs([
//   ["Warning: Async Storage has been extracted from react-native core"],
// ]);
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Age" component={Age} />
      <Stack.Screen name="Personality" component={Personality} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
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
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="FullSaved" component={FullSaved} />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="AddSaved" component={AddSaved} />
      <Stack.Screen name="CreateCollection" component={CreateCollection} />
      <Stack.Screen name="Product" component={Product} />
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
      <Stack.Screen name="Product" component={Product} />
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
    global.currRecipient = user.uid;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = "bookmark";

                if (route.name === "SavedTab" || route.name === "Saved") {
                  iconName = focused ? "bookmark" : "bookmark-outline";
                } else if (
                  route.name === "SwipeTab" ||
                  route.name === "Swipe"
                ) {
                  iconName = focused ? "gift" : "gift-outline";
                } else if (
                  route.name === "ProfileTab" ||
                  route.name === "Profile"
                ) {
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              cardStyle: { backgroundColor: "white" },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: "#3D6F99",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="SwipeTab" component={SwipeStack} />
            <Tab.Screen name="SavedTab" component={SavedStack} />
            <Tab.Screen name="ProfileTab" component={ProfileStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <UnauthenticatedStack />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

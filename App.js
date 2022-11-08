import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import FirstNameInput from "./screens/shoppingFor";
import PurchaseDate from "./screens/buyDate";

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
        {/* <Stack.Screen name="shoppingFor" component={FirstNameInput} /> */}
        {/* <Stack.Screen name="PurchaseDate" component={PurchaseDate} /> */}
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

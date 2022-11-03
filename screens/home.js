import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";

const Home = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Home");
  const [items, setItems] = useState([
    { label: "Relationship", value: "Relationship" },
    { label: "Intrests", value: "Intrests" },
  ]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progressEvent}></View>
      </View>
      <View style={styles.backButton}></View>
      <View style={styles.body}>
        <Text style={styles.header}>Navigation Testing</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Page"
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor:
                pressed || value == "Home" ? "#4F4F4F24" : "#4F4F4F",
            },
            styles.nextButton,
          ]}
          onPress={() => {
            navigation.navigate(value);
          }}
          title="Go to Page"
          accessibilityLabel="Go to the next page, Intrests."
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.1,
    backgroundColor: "#333333",
    height: "100%",
  },
  progressBar: {
    flexDirection: "row",
    flex: 0.03,
    backgroundColor: "#e0e0de",
    width: "100%",
    height: "5%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
    top: "10%",
  },
  backButton: {
    flex: 0.2,
    right: "35%",
    top: "5%",
  },
  body: {
    flex: 0.5,
    width: "80%",
  },
  header: {
    fontSize: 40,
    fontFamily: "SF-Pro-Display",
    color: "#1C1B1F",
    flex: 0.28,
    textAlign: "center",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    top: "10%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

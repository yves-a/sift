import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Dimensions,
  SafeAreaView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";

const Home = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Reading", value: "reading" },
    { label: "Fitness", value: "fitness" },
    { label: "Sports", value: "sports" },
    { label: "Video Games", value: "videoGames" },
    { label: "Cooking & Baking", value: "cookingBaking" },
    { label: "Don't Know", value: "dontKnow" },
  ]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progressEvent}></View>
      </View>
      <View style={styles.backButton}>
        <Pressable
          onPress={() => {
            navigation.navigate("Relationship");
          }}
          title="Go to Page"
          accessibilityLabel="Go back a page."
        >
          <Icon name="chevron-left" size={"40%"} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>What are their favourite hobbies?</Text>

        <DropDownPicker
          style={styles.dropDown}
          multiple={true}
          min={0}
          max={Object.keys(items).length}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select"
        />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed || value == "" ? "#4F4F4F24" : "#4F4F4F",
            },
            styles.nextButton,
          ]}
          onPress={() => {}}
          title="Next"
          accessibilityLabel="Go to the next page, Interests."
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
    flex: 0.5,
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
    flexShrink: 1,
    fontSize: 45,
    fontFamily: "SF-Pro-Display",
    color: "#1C1B1F",
    paddingBottom: "10%",
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

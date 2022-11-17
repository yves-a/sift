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
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";
import CirculeButton from "../components/CircleButton";

const { width, height } = Dimensions.get("window");

const InterestsV2 = ({ navigation, route }) => {
  let [fontsLoaded, error] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  const { recipient } = route.params;

  const [sports, setSports] = useState(false);
  const [reading, setReading] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);
  const [cookingBaking, setCookingBaking] = useState(false);
  const [fitness, setFitness] = useState(false);
  const [videoGames, setVideoGames] = useState(false);

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
            navigation.goBack();
          }}
          title="Go to Page"
          accessibilityLabel="Go back a page."
        >
          <Icon name="chevron-back-outline" size={"40%"} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>What are their favourite hobbies?</Text>

        <View style={{ top: 20 }}>
          <Pressable
            style={{ position: "absolute", left: -20, top: -20 }}
            onPress={() => {
              setReading(!reading);
            }}
          >
            <CirculeButton text={"Reading"} size={120} pressed={reading} />
          </Pressable>
          <Pressable
            style={{ position: "absolute", left: 200, top: -30 }}
            onPress={() => {
              setFitness(!fitness);
            }}
          >
            <CirculeButton text={"Fitness"} size={100} pressed={fitness} />
          </Pressable>
          <Pressable
            style={{ position: "absolute", left: -20, top: 150 }}
            onPress={() => {
              setSports(!sports);
            }}
          >
            <CirculeButton text={"Sports"} size={140} pressed={sports} />
          </Pressable>
          <Pressable
            style={{ position: "absolute", left: 100, top: 70 }}
            onPress={() => {
              setDontKnow(!dontKnow);
            }}
          >
            <CirculeButton text={"Don't Know"} size={100} pressed={dontKnow} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 150, top: 220 }}
            onPress={() => {
              setCookingBaking(!cookingBaking);
            }}
          >
            <CirculeButton
              text={"Cooking & Baking"}
              size={100}
              pressed={cookingBaking}
            />
          </Pressable>
          <Pressable
            style={{ position: "absolute", left: 210, top: 90 }}
            onPress={() => {
              setVideoGames(!videoGames);
            }}
          >
            <CirculeButton
              text={"Video Games"}
              size={150}
              pressed={videoGames}
            />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor:
                pressed ||
                (sports ||
                  fitness ||
                  videoGames ||
                  cookingBaking ||
                  dontKnow ||
                  reading) == ""
                  ? "#4F4F4F24"
                  : "#4F4F4F",
            },
            styles.nextButton,
          ]}
          onPress={() => {
            if (value != "") {
              navigation.navigate("Price", {
                recipient: {
                  ...recipient,
                  interests: value,
                },
              });
            }
          }}
          title="Next"
          accessibilityLabel="Go to the next page, Price."
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InterestsV2;

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
    top: -80,
  },
  header: {
    flexShrink: 1,
    fontSize: 40,
    fontFamily: "SF-Pro-Display",
    color: "#1C1B1F",
    paddingVertical: "10%",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    top: "95%",
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

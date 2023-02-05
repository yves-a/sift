import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import CirculeButton from "../components/CircleButton";

const InterestsV2 = ({ navigation, route }) => {
  const { recipient } = route.params;

  const [sports, setSports] = useState(false);
  const [reading, setReading] = useState(false);
  const [cookingBaking, setCookingBaking] = useState(false);
  const [fitness, setFitness] = useState(false);
  const [videoGames, setVideoGames] = useState(false);
  const [tech, setTech] = useState(false);
  const [music, setMusic] = useState(false);
  const [art, setArt] = useState(false);
  const [travel, setTravel] = useState(false);
  const [fashion, setFashion] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Reading", value: "reading" },
    { label: "Fitness", value: "fitness" },
    { label: "Sports", value: "sports" },
    { label: "Video Games", value: "videogames" },
    { label: "Cooking & Baking", value: "cooking" },
  ]);

  const updateValues = (interest) => {
    if (value.includes(interest)) {
      setValue(value.filter((item) => item !== interest));
    } else {
      setValue([...value, interest]);
    }
  };

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
          <Icon name="chevron-back-outline" size={40} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>What are their interests?</Text>

        <View style={{ top: 40 }}>
          <Pressable
            style={{ position: "absolute", left: -20, top: 30 }}
            onPress={() => {
              setReading(!reading);
              updateValues("reading");
            }}
          >
            <CirculeButton text={"Reading"} size={109} pressed={reading} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 75, top: -40 }}
            onPress={() => {
              setTech(!tech);
              updateValues("tech");
            }}
          >
            <CirculeButton text={"Technology"} size={109} pressed={tech} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 220, top: -60 }}
            onPress={() => {
              setMusic(!music);
              updateValues("music");
            }}
          >
            <CirculeButton text={"Music"} size={115} pressed={music} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 55, top: 105 }}
            onPress={() => {
              setSports(!sports);
              updateValues("sports");
            }}
          >
            <CirculeButton text={"Sports"} size={130} pressed={sports} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 150, top: 210 }}
            onPress={() => {
              setCookingBaking(!cookingBaking);
              updateValues("cooking");
            }}
          >
            <CirculeButton
              text={"Cooking & Baking"}
              size={115}
              pressed={cookingBaking}
            />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 160, top: 40 }}
            onPress={() => {
              setTravel(!travel);
              updateValues("travel");
            }}
          >
            <CirculeButton text={"Travel"} size={100} pressed={travel} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 230, top: 115 }}
            onPress={() => {
              setVideoGames(!videoGames);
              updateValues("videogames");
            }}
          >
            <CirculeButton
              text={"Video Games"}
              size={120}
              pressed={videoGames}
            />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: -30, top: 200 }}
            onPress={() => {
              setFitness(!fitness);
              updateValues("fitness");
            }}
          >
            <CirculeButton text={"Fitness"} size={110} pressed={fitness} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 40, top: 290 }}
            onPress={() => {
              setFashion(!fashion);
              updateValues("fashion");
            }}
          >
            <CirculeButton text={"Fashion"} size={130} pressed={fashion} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 220, top: 310 }}
            onPress={() => {
              setArt(!art);
              updateValues("art");
            }}
          >
            <CirculeButton text={"Art"} size={110} pressed={art} />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            {
              opacity:
                pressed ||
                (sports ||
                  fitness ||
                  videoGames ||
                  cookingBaking ||
                  reading ||
                  tech ||
                  music ||
                  art ||
                  fashion ||
                  travel) == ""
                  ? 0.3
                  : 1,
            },
            styles.nextButton,
          ]}
          onPress={() => {
            if (value != "") {
              navigation.navigate("Price", {
                recipient: {
                  ...recipient,
                  interests: [...recipient.interests, ...value],
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
    flex: 0.7,
    backgroundColor: "#333333",
    height: "100%",
  },
  progressBar: {
    flexDirection: "row",
    backgroundColor: "#e0e0de",
    width: "100%",
    height: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "top",
    top: "7%",
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
    color: "#1C1B1F",
    paddingVertical: "6%",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    top: "115%",
    backgroundColor: "#2F3956",
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

import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import CirculeButton from "../components/CircleButton";

const Personality = ({ navigation, route }) => {
  const { recipient } = route.params;

  const [extraverted, setextraverted] = useState(false);
  const [intraverted, setintraverted] = useState(false);
  const [outdoorsy, setoutdoorsy] = useState(false);
  const [creative, setcreative] = useState(false);
  const [motivated, setmotivated] = useState(false);
  const [chill, setchill] = useState(false);
  const [workaholic, setworkaholic] = useState(false);
  const [active, setactive] = useState(false);
  const [simple, setsimple] = useState(false);
  const [value, setValue] = useState([]);
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
        <Text style={styles.header}>What are they like?</Text>

        <View style={{ top: 20 }}>
          <Pressable
            style={{ position: "absolute", left: -25, top: 100 }}
            onPress={() => {
              setintraverted(!intraverted);
              updateValues("intraverted");
            }}
          >
            <CirculeButton
              text={"Intraverted"}
              size={135}
              pressed={intraverted}
            />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: -5, top: -30 }}
            onPress={() => {
              setchill(!chill);
              updateValues("chill");
            }}
          >
            <CirculeButton text={"Chill"} size={125} pressed={chill} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 220, top: -80 }}
            onPress={() => {
              setworkaholic(!workaholic);
              updateValues("workaholic");
            }}
          >
            <CirculeButton
              text={"Workaholic"}
              size={125}
              pressed={workaholic}
            />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 105, top: 165 }}
            onPress={() => {
              setextraverted(!extraverted);
              updateValues("extraverted");
            }}
          >
            <CirculeButton
              text={"Extraverted"}
              size={130}
              pressed={extraverted}
            />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 100, top: 310 }}
            onPress={() => {
              setoutdoorsy(!outdoorsy);
              updateValues("outdoorsy");
            }}
          >
            <CirculeButton text={"Outdoorsy"} size={115} pressed={outdoorsy} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 120, top: 15 }}
            onPress={() => {
              setsimple(!simple);
              updateValues("simple");
            }}
          >
            <CirculeButton text={"Simple"} size={130} pressed={simple} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 230, top: 115 }}
            onPress={() => {
              setmotivated(!motivated);
              updateValues("motivated");
            }}
          >
            <CirculeButton text={"Motivated"} size={120} pressed={motivated} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: -30, top: 240 }}
            onPress={() => {
              setcreative(!creative);
              updateValues("creative");
            }}
          >
            <CirculeButton text={"Creative"} size={130} pressed={creative} />
          </Pressable>

          <Pressable
            style={{ position: "absolute", left: 220, top: 250 }}
            onPress={() => {
              setactive(!active);
              updateValues("active");
            }}
          >
            <CirculeButton text={"Active"} size={120} pressed={active} />
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            {
              opacity:
                pressed ||
                (extraverted ||
                  creative ||
                  motivated ||
                  outdoorsy ||
                  intraverted ||
                  chill ||
                  workaholic ||
                  active ||
                  simple) == ""
                  ? 0.3
                  : 1,
            },
            styles.nextButton,
          ]}
          onPress={() => {
            if (value != "") {
              navigation.navigate("InterestsV2", {
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

export default Personality;

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.5,
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
    top: "-7%",
  },
  header: {
    flexShrink: 1,
    fontSize: 40,
    color: "#1C1B1F",
    paddingTop: "-5%",
    paddingBottom: "20%",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    top: "110%",
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

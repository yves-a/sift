import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";

const Relationship = ({ navigation, route }) => {
  let [fontsLoaded, error] = useFonts({
    "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  const { recipient } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Significant Other", value: "significantOther" },
    { label: "Friend", value: "friend" },
    { label: "Family", value: "family" },
    { label: "Pet", value: "pet" },
    { label: "Other", value: "other" },
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
          accessibilityLabel="Go to the next page, Interests."
        >
          <Icon name="chevron-back-outline" size={"40%"} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>You're Buying For</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select"
        />
        <Pressable
          onPress={() => {
            if (value != null) {
              navigation.navigate("Interests", {
                recipient: {
                  ...recipient,
                  relationship: value,
                },
              });
            }
          }}
          style={({ pressed }) => [
            {
              backgroundColor:
                pressed || value == null ? "#4F4F4F24" : "#4F4F4F",
            },
            styles.nextButton,
          ]}
          title="Next"
          accessibilityLabel="Go to the next page, Interests."
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Relationship;

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.3,
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

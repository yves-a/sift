import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Gender = ({ navigation, route }) => {
  const { recipient } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

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
          <Icon name="chevron-back-outline" size={40} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>They are a</Text>
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
              navigation.navigate("Age", {
                recipient: {
                  ...recipient,
                  gender: value,
                },
              });
            }
          }}
          style={({ pressed }) => [
            {
              opacity: pressed || value == null ? 0.3 : 1,
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

export default Gender;

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.3,
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
    marginTop: "12%",
  },
  header: {
    fontSize: 42,
    color: "#1C1B1F",
    flex: 0.28,
    marginBottom: "8%",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    top: "10%",
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

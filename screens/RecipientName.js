import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RecipientName = ({ navigation }) => {
  const [textInputName, setTextInputName] = useState("");

  const checkTextInput = () => {
    if (!textInputName.trim()) {
      alert("Please Enter Name");
      return;
    } else {
      navigation.navigate("PurchaseDate", {
        recipient: {
          name: textInputName.trim(),
        },
      });
    }
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
      <View>
        <Text style={styles.head}>You're shopping for</Text>
      </View>
      <TextInput
        placeholder="FIRST NAME"
        style={styles.input}
        onChangeText={(value) => setTextInputName(value)}
      />
      <Pressable
        onPress={() => {
          if (textInputName != "") {
            checkTextInput();
          }
        }}
        style={({ pressed }) => [
          {
            opacity: pressed || textInputName == "" ? 0.3 : 1,
          },
          styles.nextButton,
        ]}
        title="Next"
        accessibilityLabel="Go to the next page, Interests."
      >
        <Text style={styles.text}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.0,
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
    // alignItems: 'center',
    // justifyContent: "top",
    top: "7%",
  },
  buttonActive: {
    backgroundColor: "red",
  },
  backButton: {
    flex: 0.2,
    right: "36%",
    top: "5%",
    alignSelf: "center",
  },
  head: {
    fontSize: 45,
    lineHeight: 52,
    left: "10%",
    marginTop: 100,
    width: "80%",
  },
  input: {
    width: "80%",
    height: 50,
    left: "10%",
    marginTop: 40,
    justifyContent: "center",
    fontSize: 18,
    alignItems: "center",
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    padding: 10,
    color: "black",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 40,
    width: "85%",
    left: "7.5%",
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

export default RecipientName;

import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

const RecipientName = ({ navigation }) => {
  const [onPressInActive, SetOnPressInActive] = useState("#33691E");
  const [textInputName, setTextInputName] = useState("");

  const checkTextInput = () => {
    if (!textInputName.trim()) {
      alert("Please Enter Name");
      return;
    } else {
      // navigation.navigate("Date", { params: { recipientName: textInputName.trim } });
      navigation.navigate("Date");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.head}>You're shopping for</Text>
      </View>
      <TextInput
        placeholder="FIRST NAME"
        style={styles.input}
        onChangeText={(value) => setTextInputName(value)}
      />
      <View style={styles.button}>
        <Button
          style={styles.buto}
          color="white"
          onPress={checkTextInput}
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  buttonActive: {
    backgroundColor: "red",
  },
  input: {
    position: "absolute",
    width: "80%",
    height: 50,
    left: "10%",
    top: 394,
    justifyContent: "center",
    fontSize: 18,
    alignItems: "center",
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    padding: 10,
    color: "black",
  },
  head: {
    position: "absolute",
    fontSize: 45,
    lineHeight: 52,
    left: "10%",
    top: 204,
    width: "80%",
    height: 104,
    lineHeight: 52,
  },
  button: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "absolute",
    width: "80%",
    height: "4.5%",
    left: "10%",
    top: 462,
    opacity: 0.3,
    marginTop: "9%",
    backgroundColor: "rgba(79, 79, 79, 1)",
    borderRadius: 7,
  },
  buto: {
    position: "absolute",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 18,
  },
});

export default RecipientName;

import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { createRecipient } from "../clients/FlaskServer";
import { auth } from "../firebase";

const handleCreateRecipient = async (recipient) => {
  const userId = auth.currentUser.uid;
  const recipientData = {
    ...recipient,
    ownerId: userId,
  };
  console.log(recipientData);
  const response = await createRecipient(recipientData);
  console.log(response);
};

const Price = ({ navigation, route }) => {
  const { recipient } = route.params;

  let [pressIndex1, setPressIndex1] = React.useState(0);
  let [pressIndex2, setPressIndex2] = React.useState(0);
  let [pressIndex3, setPressIndex3] = React.useState(0);
  let [currentIndex, setCurrentIndex] = React.useState(0);

  const setPrices = (index) => {
    if (index == 1) {
      setPressIndex1(1);
      setPressIndex2(0);
      setPressIndex3(0);
    } else if (index == 2) {
      setPressIndex1(1);
      setPressIndex2(1);
      setPressIndex3(0);
    } else {
      setPressIndex1(1);
      setPressIndex2(1);
      setPressIndex3(1);
    }
    setCurrentIndex(index);
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
          <Icon name="chevron-back-outline" size={"40%"} color="#1C1B1F" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.header}>What is your price range?</Text>

        <View style={styles.priceView}>
          <Pressable
            onPress={() => {
              setPrices(1);
            }}
          >
            <Text
              style={{
                ...styles.priceText,
                color: pressIndex1 ? "black" : "grey",
              }}
            >
              $
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setPrices(2);
            }}
          >
            <Text
              style={{
                ...styles.priceText,
                color: pressIndex2 ? "black" : "grey",
              }}
            >
              $
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setPrices(3);
            }}
          >
            <Text
              style={{
                ...styles.priceText,
                color: pressIndex3 ? "black" : "grey",
              }}
            >
              $
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={async () => {
            if (pressIndex1 != null) {
              console.log(recipient);
              await handleCreateRecipient({
                ...recipient,
                price: currentIndex,
              });
              navigation.navigate("Profile", { updatedUser: true });
            }
          }}
          style={({ pressed }) => [
            {
              opacity: pressed || pressIndex1 == 0 ? 0.3 : 1,
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

export default Price;

const styles = StyleSheet.create({
  progressEvent: {
    flex: 0.9,
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
    justifyContent: "top",
    top: "5.5%",
  },
  backButton: {
    flex: 0.2,
    right: "35%",
    top: "5%",
  },
  body: {
    // flex: 0.5,
    width: "80%",
  },
  header: {
    fontSize: 45,
    color: "#1C1B1F",
    paddingBottom: "10%",
  },
  priceView: {
    flexDirection: "row",
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  priceText: {
    fontSize: 80,
    padding: 10,
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
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

import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { getRecommendations } from "../clients/FlaskServer";
import { auth } from "../firebase";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

let currId = 0;

const Swipe = ({ navigation, route }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(async () => {
    if (global.currRec == "123" || global.currRec == null) {
      global.currRec = auth.currentUser.uid;
    }
    console.log("Current: " + global.currRec);
    const id = global.currRec == auth.currentUser.uid ? null : global.currRec;
    const rslt = await getRecommendations(id);
    console.log(rslt);
    setRecommendations(rslt);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen was focused");
      console.log("Current: " + auth.currentUser.uid);
      console.log("Global: " + global.currRec);
      async function fetchData() {
        if (global.currRec == "123" || global.currRec == null) {
          global.currRec = auth.currentUser.uid;
        }
        console.log("Currents: " + global.currRec);
        const id =
          global.currRec == auth.currentUser.uid ? null : global.currRec;

        const rslt = await getRecommendations(id);
        currId = global.currRec;
        setRecommendations(rslt);
      }

      if (currId != global.currRec) {
        console.log("Request Sent");
        fetchData();
      }
    }, [])
  );

  if (recommendations == null || recommendations.length === 0) {
    return <AppLoading />;
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text style={{ top: 40 }}></Text>
      <View
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          top: 50,
          position: "absolute",
          backgroundColor: "white",
        }}
      ></View>
      <Text style={styles.container}></Text>
      <View style={styles.cards}>
        <Cards
          style={{ backgroundColor: "white" }}
          navigation={navigation}
          users={recommendations}
        />
      </View>
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
  },
  cards: {
    backgroundColor: "white",
  },
});

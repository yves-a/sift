import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import { useSharedValue } from "react-native-reanimated";
import ProfileCard from "../components/ProfileCard";
import { auth } from "../firebase";
import { getAllRecipients } from "../clients/FlaskServer";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const COUNT = 3;

const itemSize = 200;

const baseOption = {
  vertical: false,
  width: SCREEN_WIDTH / 1.5,
  height: SCREEN_WIDTH / 1.25,
  style: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
};

const Profile = ({ route, navigation }) => {
  // const [currentUser, setCurrentUser] = useState(0);

  const [recipients, setRecipients] = useState([]);

  useEffect(async () => {
    console.log("useEffect");
    const response = await getAllRecipients(auth.currentUser.uid);
    console.log(response);
    setRecipients([
      { _id: auth.currentUser.uid, name: "Grady (You)" },
      ...response,
    ]);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const response = await getAllRecipients(auth.currentUser.uid);
        const updatedRecipients = [
          { _id: auth.currentUser.uid, name: "Grady (You)" },
          ...response,
        ];
        if (updatedRecipients.length != recipients.length) {
          console.log("Updated Recipients");
          setRecipients(updatedRecipients);
        }
      }
      fetchData();
    }, [])
  );

  return (
    <View>
      <View style={{ backgroundColor: "white", height: 1000 }} />
      <View style={styles.header}>
        <Text style={styles.container}></Text>
        <Text style={styles.headerText}>SIFT</Text>
      </View>
      {/* <Text>{JSON.stringify(recipients)}</Text> */}

      <View style={styles.carouselContainer}>
        <Carousel
          {...baseOption}
          loop
          data={recipients}
          windowSize={10}
          scrollAnimationDuration={1000}
          mode="stack"
          modeConfig={{
            opacityInterval: 2,
          }}
          onSnapToItem={(index) => {
            console.log(recipients[index]._id);
            global.currRec = recipients[index]._id;
          }}
          renderItem={({ index, animationValue }) => (
            <ProfileCard
              name={recipients[index].name}
              img={require("../assets/tester.jpg")}
            />
          )}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              auth.signOut();
            }}
          >
            <Icon
              style={{ ...styles.icon, top: 25 }}
              name="settings-outline"
              size={30}
              color="black"
            />
          </Pressable>
          <Text style={styles.buttonText}>Settings</Text>
        </View>
        <View style={{ ...styles.button, top: 60 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("RecipientName");
            }}
          >
            <Icon style={styles.icon} name="add" size={40} color="black" />
          </Pressable>
          <Text style={styles.buttonText}>Add Profile</Text>
        </View>
        <View style={styles.button}>
          <Pressable>
            <Icon
              style={{ ...styles.icon, left: 3, top: 25 }}
              name="pencil-outline"
              size={30}
              color="black"
            />
          </Pressable>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -920,
  },
  headerText: {
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    top: 3,
    // left: 20,
  },
  carouselContainer: {
    marginTop: 30,
    // height: 400,
    // alignItems: "center",
    flex: 1,
  },
  carousel: {
    height: 400,
  },
  buttonsContainer: {
    flexDirection: "row",
    top: 280,
    padding: 30,
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.58,
    shadowRadius: 4,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "white",
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
    top: 60,
  },
});

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
import ProfileCard from "../components/ProfileCard";
import { auth } from "../firebase";
import { getAllRecipients } from "../clients/FlaskServer";

const SCREEN_HEIGHT = Dimensions.get("window").height * 0.7;
const SCREEN_WIDTH = Dimensions.get("window").width;

const COUNT = 3;

const baseOption = {
  vertical: false,
  width: SCREEN_WIDTH / 1.5,
  height: SCREEN_WIDTH,
  style: {
    width: SCREEN_WIDTH,
  },
};

const Profile = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(0);
  const [recipients, setRecipients] = useState([]);

  useEffect(async () => {
    // setRecommendations(Users);
    // queryRecommendations();
    const response = await getAllRecipients(auth.currentUser.uid);
    console.log(response);
    // response.append({ id: auth.currentUser.uid });
    setRecipients(response);
  }, []);

  return (
    <View>
      <View style={{ backgroundColor: "white", height: 1000 }} />
      <View style={styles.header}>
        <Text style={styles.container}>{global.currRec}</Text>
        <Text style={styles.headerText}>SIFT</Text>
        <Pressable
          style={{ right: 20 }}
          onPress={() => {
            auth.signOut();
          }}
        >
          <Icon name="reorder-three-outline" size={40} color="black" />
        </Pressable>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          {...baseOption}
          loop
          data={recipients}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => {
            // console.log(JSON.stringify(recipients[index].name));
            setCurrentUser(index);
            console.log(index);
            global.currRec = index;
          }}
          renderItem={({ index }) => (
            <ProfileCard name={recipients[index].name} />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.addProfileButton}>
          <Pressable
            onPress={() => {
              navigation.navigate("RecipientName");
            }}
          >
            <Icon style={styles.icon} name="add" size={40} color="white" />
          </Pressable>
        </View>
        <View style={styles.addProfileButton}>
          <Icon
            style={{ ...styles.icon, left: 3, top: 35 }}
            name="pencil-outline"
            size={30}
            color="white"
          />
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
    left: 20,
  },
  carouselContainer: {
    marginTop: 30,
    height: 400,
    alignContent: "center",
    flex: 1,
  },
  carousel: {
    height: 400,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  addProfileButton: {
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#2F3956",
    top: SCREEN_HEIGHT / 2,
  },
  //   editProfileButton: {
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //     height: 100,
  //     width: 100,
  //     borderRadius: 50,
  //     backgroundColor: "#E4474A",
  //     top: SCREEN_HEIGHT / 2,
  //   },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 30,
  },
});

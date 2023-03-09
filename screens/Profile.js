import { Dimensions, View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileCard from "../components/ProfileCard";
import { auth } from "../firebase";
import { getAllRecipients } from "../clients/FlaskServer";
import { useFocusEffect } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;

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
  const [recipients, setRecipients] = useState([]);
  const [currImg, setCurrImage] = useState(0);
  const [currName, setCurrName] = useState(0);

  const checkName = (name) => {
    if (name == null) {
      return "Me";
    } else if (name == "ME") {
      if (auth.currentUser.displayName == null) {
        return "Me";
      } else {
        return auth.currentUser.displayName;
      }
    } else {
      return name;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getAllRecipients(auth.currentUser.uid);
      setRecipients(response);
    }

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const response = await getAllRecipients(auth.currentUser.uid);
        if (response.length != recipients.length) {
          setRecipients(response);
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
      <View style={styles.carouselContainer}>
        <Carousel
          {...baseOption}
          data={recipients}
          windowSize={10}
          scrollAnimationDuration={100}
          loop={false}
          modeConfig={{
            opacityInterval: 2,
          }}
          onSnapToItem={(index) => {
            global.currRec = recipients[index]._id;
            setCurrImage(recipients[index].img);
            setCurrName(recipients[index].name);
          }}
          renderItem={({ index, animationValue }) => (
            <ProfileCard
              name={
                checkName(recipients[index]._id) == auth.currentUser.uid
                  ? `${checkName(recipients[index].name)} (Me)`
                  : checkName(recipients[index].name)
              }
              img={recipients[index].img}
              currIdx={index}
              id={recipients[index]._id}
              options={{
                recipients,
              }}
            />
          )}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              navigation.navigate("Settings", {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
              });
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
            <Icon
              style={{ ...styles.icon, left: 2 }}
              name="add"
              size={40}
              color="black"
            />
          </Pressable>
          <Text style={styles.buttonText}>Add Profile</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              navigation.navigate("EditProfile", {
                id: global.currRec,
                img: currImg,
                name: currName,
                recipients: recipients,
                setRecipients: setRecipients,
              });
            }}
          >
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
    fontFamily: "BryantPro-Bold",
    letterSpacing: -1,
  },
  carouselContainer: {
    marginTop: 30,
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

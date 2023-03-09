import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import React, { useState, useEffect } from "react";

const colors = [
  "#EC3E3D",
  "#B51314",
  "#F65E5E",
  "#FA7D85",
  "#E3302F",
  "#EB3637",
  "#F43E3F",
  "#D62829",
  "#CA1F1D",
];

const ProfileCard = ({ id, name, currIdx }) => {
  const [img, setImg] = useState();

  useEffect(() => {
    async function fetchImage() {
      try {
        const url = await getDownloadURL(ref(storage, `images/${id}`));
        console.log(url);
        // return { uri: url };
        setImg({ uri: url });
      } catch (error) {
        // console.log(error);
        return null;
      }
    }
    fetchImage();
  }, [id]);

  if (img) {
    return (
      <View
        style={{
          height: 400,
          width: 400,
          borderRadius: 200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        containerStyle={{ flex: 1 }}
      >
        <Image
          source={img}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        height: 400,
        width: 400,
        borderRadius: 200,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      containerStyle={{ flex: 1 }}
    >
      <View
        style={{
          backgroundColor: colors[currIdx % colors.length],
          // backgroundColor: "#2F3956",
          height: 200,
          width: 200,
          borderRadius: 100,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Icon
          style={styles.icon}
          name="person-outline"
          size={90}
          color="white"
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#E4474A",
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 200,
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  name: {
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
});

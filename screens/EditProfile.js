import {
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

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

const EditProfile = ({ route, navigation }) => {
  const { id, img, name, recipients, setRecipients } = route.params;
  const [originalName, setOriginalName] = useState(checkName(name));
  const [text, setText] = useState(checkName(name));

  const handleUpdateName = () => {
    if (text != originalName) {
      if (id == auth.currentUser.uid) {
        updateProfile(auth.currentUser, {
          displayName: text,
        });
      } else {
      }
    }

    const updatedRecipients = recipients.map((recipient) => {
      if (recipient._id == id) {
        recipient.name = text;
      }
      return recipient;
    });
    setRecipients(updatedRecipients);
  };

  const [image, setImage] = useState(require("../assets/images/image.png"));

  const handleEditImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={{ backgroundColor: "white", height: 1000 }} />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            handleUpdateName();
            navigation.goBack();
          }}
        >
          <Icon name="chevron-back-outline" size={40} color="black" />
        </Pressable>
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.profileImage} source={image}></Image>
        </View>
        <LinearGradient
          colors={["transparent", "black"]}
          style={styles.gradient}
        >
          <Pressable
            style={{ height: 200, width: 200 }}
            onPress={() => {
              console.log("Hello");
              handleEditImage();
            }}
          />
          <Text style={styles.imageText}>Tap to Edit</Text>
        </LinearGradient>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#000000"
            value={text}
            editable={true}
            onChangeText={(text) => setText(text)}
          />
          <Pressable>
            <Icon name="pencil-outline" size={30} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  arc: {
    backgroundColor: "white",
    height: 1000,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    left: 31,
    marginTop: -920,
  },
  itemsContainer: {
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 10,
    // backgroundColor: "green",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "200%",
  },
  input: {
    flexDirection: "row",
    marginTop: 30,
    top: -200,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 28,
    marginRight: 10,
  },
  gradient: {
    width: 200,
    height: 200,
    top: -200,
    borderRadius: "200%",
  },
  imageText: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: 150,
    left: 50,
  },
});

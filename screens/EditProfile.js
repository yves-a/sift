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
import { auth, storage } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateRecipientName, deleteRecipient } from "../clients/FlaskServer";

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
  const [profileImage, setProfileImage] = useState();
  const [text, setText] = useState(checkName(name));

  const handleUpdateName = async () => {
    if (text != originalName) {
      if (id == auth.currentUser.uid) {
        await updateProfile(auth.currentUser, {
          displayName: text,
        });
      } else {
        const rslt = await updateRecipientName(id, text);
      }
    }

    const updatedRecipients = recipients.map((recipient) => {
      if (recipient._id == id) {
        recipient.name = text;
      }
      return recipient;
    });
    setRecipients(updatedRecipients);
    navigation.setOptions({ recipients: updatedRecipients });
  };

  const handleEditImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const storageRef = ref(storage, "images/" + id);
    const file = await fetch(result.assets[0].uri);
    const blob = await file.blob();

    uploadBytes(storageRef, blob);

    setProfileImage({ uri: result.assets[0].uri });
  };

  const handleRemoveRecipient = async () => {
    const result = await deleteRecipient(id, auth.currentUser.uid);
    console.log(result);
    const updatedRecipients = recipients.filter(
      (recipient) => recipient._id != id
    );
    setRecipients(updatedRecipients);
    navigation.setOptions({ recipients: updatedRecipients });
    navigation.goBack();
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        const url = await getDownloadURL(ref(storage, `images/${id}`));
        setProfileImage({ uri: url });
      } catch (error) {}
    }
    fetchImage();
  }, [id]);

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
          <Image
            style={styles.profileImage}
            source={profileImage || require("../assets/images/profile.jpg")}
          ></Image>
        </View>
        <Pressable
          onPress={() => {
            handleEditImage();
          }}
        >
          <LinearGradient
            colors={["transparent", "transparent"]}
            style={styles.gradient}
          >
            <Pressable
              style={{ height: 200, width: 200 }}
              onPress={() => {
                handleEditImage();
              }}
            />
            {/* <Text style={styles.imageText}>Tap to Edit</Text> */}
          </LinearGradient>
        </Pressable>
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
        {id != auth.currentUser.uid && (
          <View style={styles.button}>
            <Pressable onPress={handleRemoveRecipient}>
              <Icon
                style={{ ...styles.icon, top: 20, height: 40 }}
                name="close-outline"
                size={40}
                color="black"
              />
            </Pressable>
            <Text style={styles.buttonText}>Remove Recipient</Text>
          </View>
        )}
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
    borderRadius: 100,
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
    borderRadius: 100,
  },
  imageText: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: 150,
    left: 50,
  },
  button: {
    marginTop: -150,
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

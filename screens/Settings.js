import {
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  deleteUser,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

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
  const { id, name } = route.params;
  const [profileImage, setProfileImage] = useState();
  const [text, setText] = useState(checkName(name));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");

  const handleDeleteAccount = async () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);

    await deleteUser(auth.currentUser);
  };

  const handleSignout = async () => {
    await signOut(auth);
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
      {confirmDelete && (
        <View style={styles.confirmDelete}>
          <Text style={styles.confirmDeleteText}>
            Are you sure you want to delete this account?
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Type your password to confirm.
          </Text>
          <TextInput
            style={styles.confirmDeleteInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <View style={styles.confirmDeleteButtons}>
            <Pressable
              onPress={() => {
                setConfirmDelete(false);
              }}
            >
              <Text style={styles.confirmDeleteButtonText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleDeleteAccount}>
              <Text style={styles.confirmDeleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
      <View style={{ backgroundColor: "white", height: 1000 }} />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-back-outline" size={40} color="black" />
        </Pressable>
      </View>
      <Pressable onPress={handleSignout}>
        <Icon name={"log-out-outline"} size={40} style={styles.signout} />
      </Pressable>
      <View style={styles.itemsContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={profileImage || require("../assets/images/profile.jpg")}
          ></Image>
        </View>
        <View style={styles.input}>
          <Text style={styles.textInput} value={text}>
            {text}
          </Text>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              setConfirmDelete(true);
            }}
          >
            <Icon
              style={{ ...styles.icon, top: 20, left: 2, height: 40 }}
              name="trash-outline"
              size={40}
              color="black"
            />
          </Pressable>
          <Text style={styles.buttonText}>Delete Account</Text>
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
    // top: -200,
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
  button: {
    marginTop: 50,
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
  confirmDelete: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  confirmDeleteText: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 250,
    padding: 20,
  },
  confirmDeleteButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  confirmDeleteButtonText: {
    fontSize: 20,
    color: "blue",
  },
  signout: {
    position: "absolute",
    right: 30,
    top: -40,
  },
  confirmDeleteInput: {
    height: 40,
    margin: 12,
    padding: 10,
    textAlign: "center",
    fontSize: 20,
  },
});

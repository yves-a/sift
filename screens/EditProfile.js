import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
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

const EditProfile = ({ route, navigation }) => {
  const [recipients, setRecipients] = useState([]);
  const { id, img, name } = route.params;

  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState({ name });

  const handleEdit = () => {
    setEditing(!isEditing);
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
        <Pressable
          onPress={() => {
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
          source={require("../assets/images/image.png")}
        ></Image>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder={name}
          placeholderTextColor='#000000'
          value={text}
          editable={isEditing}
          onChangeText={(text) => setText(text)}
        />
        <Pressable onPress={handleEdit}>
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
  itemsContainer:{
    alignItems:"center",
  },
  imageContainer: {
    marginTop: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    background:
      "linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #000000 73.9%);",
    borderRadius: "200%",
  },
  input: {
    flexDirection: "row",
    marginTop: 30,
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 28,
    marginRight: 10,
  },
});
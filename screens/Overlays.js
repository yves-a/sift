import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { AntDesign } from "@expo/vector-icons";

const Overlays = ({ navigation }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggleOverlay1 = () => {
    toggleNavBar(visible1);
    setVisible1(!visible1);
  };

  const toggleOverlay2 = () => {
    toggleNavBar(visible2);
    setVisible2(!visible2);
  };

  const toggleNavBar = (visible) => {
    const display = visible ? "flex" : "none";
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: display,
      },
    });
  };

  return (
    <View style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
      <Text> Hi</Text>
      <Button title="Manage Product Overlay" onPress={toggleOverlay1} />
      <Button title="Manage Collection Overlay" onPress={toggleOverlay2} />
      {visible1 ? (
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={toggleOverlay1}
            style={styles.overlayOther}
          ></TouchableOpacity>
          <View style={styles.overlayMenu}>
            <View style={styles.optionTitle}>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-start",
                  marginBottom: -10,
                }}
                onPress={toggleOverlay1}
              >
                <AntDesign name="close" size={24} color="#000000" />
              </TouchableOpacity>
              <Text
                style={[
                  styles.optionText,
                  { alignSelf: "center", paddingBottom: 15 },
                ]}
              >
                Manage Product
              </Text>
              <View style={{ width: 50 }}></View>
            </View>
            <View style={[styles.option, { marginBottom: -40 }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log("SHARE");
                }}
                style={styles.tinyLogo}
              >
                <AntDesign name="sharealt" size={16} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.optionText}>Share</Text>
            </View>
            <View style={[styles.option, { marginTop: -40 }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log("UNSAVE");
                }}
                style={styles.tinyLogo}
              >
                <AntDesign name="delete" size={16} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.optionText}>Unsave</Text>
            </View>
          </View>
        </View>
      ) : null}
      {visible2 ? (
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={toggleOverlay2}
            style={styles.overlayOther}
          ></TouchableOpacity>
          <View style={styles.overlayMenu}>
            <View style={styles.optionTitle}>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-start",
                  marginBottom: -10,
                }}
                onPress={toggleOverlay2}
              >
                <AntDesign name="close" size={24} color="#000000" />
              </TouchableOpacity>
              <Text
                style={[
                  styles.optionText,
                  { alignSelf: "center", paddingBottom: 15 },
                ]}
              >
                Manage Collection
              </Text>
              <View style={{ width: 50 }}></View>
            </View>
            <View style={[styles.option, { marginBottom: -40 }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log("EDIT COLLECTION");
                }}
                style={styles.tinyLogo}
              >
                <AntDesign name="edit" size={16} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.optionText}>Edit Collection</Text>
            </View>
            <View style={[styles.option, { marginTop: -40 }]}>
              <TouchableOpacity
                onPress={() => {
                  console.log("DELETE COLLECTION");
                }}
                style={styles.tinyLogo}
              >
                <AntDesign name="delete" size={16} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.optionText}>Delete Collection</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Overlays;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: windowWidth,
    height: windowHeight,
    marginTop: -50,
  },
  overlayOther: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: windowWidth,
    height: (windowHeight * 2) / 3,
  },
  overlayMenu: {
    position: "absolute",
    left: 0,
    bottom: 0,
    opacity: 1,
    backgroundColor: "white",
    width: windowWidth,
    height: windowHeight / 3,
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  tinyLogo: {
    alignSelf: "flex-start",
    padding: 15,
    position: "fixed",
    top: -10,
    borderRadius: "50%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "white",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    marginTop: -50,
    paddingLeft: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  optionTitle: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#121212",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "80%",
  },
  optionText: {
    fontFamily: "SF Pro Display",
    fontStyle: "500",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    paddingLeft: 20,
    paddingBottom: 15,
    color: "#000000",
  },
});

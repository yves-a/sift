import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AddSavedCard from "../components/AddSavedCard";
import { getSavedProducts } from "../clients/FlaskServer";
import { auth } from "../firebase";

const AddSaved = ({ navigation, route }) => {
  const [savedProducts, setSavedProducts] = useState([]);

  const { collectionId } = route.params;

  useEffect(() => {
    async function fetchData() {
      const rslt = await getSavedProducts(global.currRec);
      setSavedProducts(rslt);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-back-outline" size={"40%"} color="black" />
        </Pressable>
        <Text style={{ right: 20, fontSize: 20 }}>Saved</Text>
        <Text></Text>
      </View>

      <ScrollView style={{ height: "100%" }}>
        <View style={styles.saved}>
          <Text style={styles.savedText}>Add from Saved</Text>
          <View style={styles.line}></View>
          <View style={styles.savedContainer}>
            {savedProducts.map((item) => (
              <AddSavedCard
                key={item._id}
                navigation={navigation}
                item={item}
                collectionId={collectionId}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddSaved;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  savedText: {
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
    left: 20,
    marginBottom: 15,
  },
  savedContainer: {
    padding: 20,
    top: -25,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#e0e0e0",
    top: 20,
  },
  nextButton: {
    color: "black",
    borderRadius: 10,
    paddingVertical: 12,
    width: "90%",
    marginLeft: "5%",
    borderColor: "black",
    borderWidth: 2,
    top: -35,
  },
  text: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    width: "90%",
    marginLeft: "5%",
    opacity: 0.4,
    top: -15,
  },
  collections: {
    top: -10,
  },
  collectionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 20,
  },
  collectionContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    flex: 1,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 100,
  },
});

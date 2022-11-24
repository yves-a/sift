import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import SavedCard from "../components/SavedCard";

const data = [
  {
    id: 1,
    title: "Nike Air Force 1 '07",
  },
  {
    id: 2,
    title: "Nike Air Force 1 '07",
  },
  {
    id: 2,
    title: "Nike Air Force 1 '07",
  },
];

const FullSaved = ({ navigation, route }) => {
  const { items } = route.params;

  console.log(items);
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

      <View style={styles.saved}>
        <Text style={styles.savedText}>Saved Items</Text>
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.savedContainer}>
            {items.map((item) => (
              <SavedCard navigation={navigation} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FullSaved;

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
    fontSize: 25,
    padding: 10,
    left: 20,
  },
  savedContainer: {
    padding: 20,
    top: -25,
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

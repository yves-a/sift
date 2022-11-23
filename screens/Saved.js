import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SavedCard from "../components/SavedCard";
import CollectionCard from "../components/CollectionCard";
import { getAllCollections, getSavedProducts } from "../clients/FlaskServer";
import { auth } from "../firebase";

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

// const collections = [
//   {
//     id: 1,
//     title: "Nike Air Force 1 '07",
//   },
//   {
//     id: 2,
//     title: "Nike Air Force 1 '07",
//   },
//   {
//     id: 2,
//     title: "Nike Air Force 1 '07",
//   },
// ];

const Saved = ({ navigation }) => {
  let currId = 0;
  const [collections, setCollections] = useState([]);
  const [savedProducts, setSaveProducts] = useState([]);

  useEffect(async () => {
    const id = global.currRec == auth.currentUser.uid ? null : global.currRec;
    const rslt = await getSavedProducts(id);
    console.log(rslt);
    setSaveProducts(rslt);
    const rslt1 = await getAllCollections(id);
    setCollections(rslt1);
    console.log(rslt);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen was focused");
      async function fetchData() {
        const id =
          global.currRec == auth.currentUser.uid ? null : global.currRec;
        const rslt = await getSavedProducts(id);
        const rslt1 = await getAllCollections(id);

        if (rslt != savedProducts) {
          setSaveProducts(rslt);
        }

        if (rslt1 != collections) {
          setCollections(rslt1);
        }
        currId = global.currRec;
        console.log(rslt1);
      }
      console.log("Request Sent");
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          {/* <Icon name="chevron-back-outline" size={"40%"} color="black" /> */}
        </Pressable>
        <Text style={{ fontSize: 20 }}>Saved</Text>
        <Text></Text>
      </View>

      <ScrollView style={{ height: "100%" }}>
        <View style={styles.saved}>
          <Text style={styles.savedText}>Most Recent</Text>
          <View style={styles.savedContainer}>
            {savedProducts
              .slice(0, Math.min(3, savedProducts.length))
              .map((item) => (
                <SavedCard item={item} />
              ))}
          </View>
          {savedProducts.length != 0 && (
            <Pressable
              onPress={() => {
                navigation.navigate("FullSaved", { items: savedProducts });
                // console.log("Pressed");
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.3 : 1,
                },
                styles.nextButton,
              ]}
              title="See All"
              accessibilityLabel="Go to the next page, Gender."
            >
              <Text style={styles.text}>See All</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.line}></View>
        <View style={styles.collections}>
          <View style={styles.collectionsHeader}>
            <Text style={styles.savedText}>Collections</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("CreateCollection");
              }}
            >
              <Icon
                style={{ right: 20, top: 5 }}
                name="add"
                size={40}
                color="black"
              />
            </Pressable>
          </View>
          <View style={styles.collectionContainer}>
            {collections.map((item) => (
              <CollectionCard
                navigation={navigation}
                item={item}
                style={{ borderRadius: 20 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Saved;

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
    paddingHorizontal: 20,
  },
});

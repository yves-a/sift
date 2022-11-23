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
import SavedCard from "../components/SavedCard";
import { getCollection } from "../clients/FlaskServer";

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

const Collection = ({ navigation, route }) => {
  const [collectionProducts, setCollectionProducts] = useState([]);

  const { item } = route.params;

  useEffect(async () => {
    const rslt = await getCollection(item._id);
    setCollectionProducts(rslt["products"]);
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
        <Text style={{ right: 20, fontSize: 20 }}></Text>
        <Text></Text>
      </View>

      <View style={styles.saved}>
        <Text style={styles.savedText}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              navigation.navigate("AddSaved");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: "35%",
                top: 12,
              }}
            >
              <Icon
                style={{ top: -10 }}
                name="add-outline"
                size={30}
                color="white"
              />
              <Text style={{ color: "white" }}> Add More</Text>
            </View>
          </Pressable>
          <Pressable style={styles.ellipsisButton}>
            <View style={{ flexDirection: "row", marginLeft: "35%", top: 12 }}>
              <Icon
                style={{ top: -5, right: 5 }}
                name="ellipsis-horizontal"
                size={25}
                color="white"
              />
            </View>
          </Pressable>
        </View>
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.savedContainer}>
            {collectionProducts.map((item) => (
              <SavedCard item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Collection;

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
    paddingVertical: 20,
    fontWeight: "500",
    fontSize: 30,
    // padding: 10,
    left: 20,
  },
  savedContainer: {
    padding: 20,
    top: -15,
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
  addButton: {
    color: "black",
    height: 40,
    backgroundColor: "#2F3956",
    // padding: 10,
    width: "77%",
    marginLeft: "5%",
    marginBottom: 10,
    borderRadius: 10,
  },
  ellipsisButton: {
    color: "black",
    height: 40,
    backgroundColor: "#2F3956",
    // padding: 10,
    marginLeft: "2%",
    width: "10%",
    // marginLeft: "5%",
    marginBottom: 10,
    borderRadius: 10,
  },
});

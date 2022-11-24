import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

const Product = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View style={{ backgroundColor: "white", height: 800 }}>
      {/* <Text>Product</Text> */}
      <Image
        style={{
          top: 80,
          height: 300,
          width: "100%",
        }}
        // source={require("../assets/tester.jpg")}
        source={{ uri: item.img }}
      ></Image>
      <View style={styles.textContainer}>
        {/* <LinearGradient
          colors={["transparent", "transparent", "transparent", "white"]}
          style={{
            zIndex: 50,
            // position: "absolute",
            bottom: 0,
            height: 140,
            width: "100%",
          }}
          end={{ x: 0.5, y: 1 }}
        > */}
        <ScrollView style={styles.scroll}>
          <Text style={styles.titleText}>{item.title}</Text>
        </ScrollView>
        {/* </LinearGradient> */}
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Icon name="chevron-down-outline" size={30} color="white" />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "grey" : "#2F3956",
          },
          styles.buttonContainer,
        ]}
        onPress={() => {
          Linking.openURL(`https://www.amazon.ca/dp/${item._id}/ref=nosim`);
        }}
      >
        <Text style={styles.buttonText}>Check Listing</Text>
      </Pressable>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  textContainer: {
    top: 100,
    // width: "90%",
    // marginLeft: "5%",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "700",
    paddingHorizontal: 20,
  },
  scroll: {
    height: 150,
    // top: -20,
  },
  price: {
    fontSize: 30,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    top: 120,
    height: 60,
    width: "90%",
    marginLeft: "5%",
    // backgroundColor: "#2F3956",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    top: 17,
  },
  backButton: {
    position: "absolute",
    backgroundColor: "#E4474A",
    borderRadius: 10,
    padding: 8,
    top: "39%",
    right: 20,
  },
});

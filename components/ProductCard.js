import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height * 0.7;
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

class ProductCard extends Component {
  render() {
    return (
      <View
        style={{
          height: this.props.height,
          width: this.props.width,
          backgroundColor: "white",
        }}
      >
        <Image
          style={{
            top: 50,
            height: this.props.height / 2,
            width: this.props.width,
          }}
          // source={require("../assets/tester.jpg")}
          source={{ uri: this.props.item.img }}
        ></Image>
        {/* <Text>{this.prop}</Text> */}
        <LinearGradient
          colors={["transparent", "transparent", "transparent", "#000000"]}
          style={{ height: "100%", width: "100%", position: "absolute" }}
          end={{ x: 0.5, y: 0.9 }}
        >
          <View style={styles.body}>
            <View style={styles.textContainer}>
              <Pressable
                onPress={() => {
                  this.props.navigation.navigate("Product", {
                    item: this.props.item,
                  });
                }}
              >
                {this.props.item.title.length < 40 && (
                  <Text style={styles.titleText}>{this.props.item.title}</Text>
                )}
                {this.props.item.title.length > 40 && (
                  <Text style={styles.titleText}>
                    {this.props.item.title.substring(0, 40) + ". . . "}
                  </Text>
                )}
              </Pressable>
            </View>
            <Text style={styles.priceText}>{this.props.item.price} CA</Text>
          </View>
        </LinearGradient>
        {/* </ImageBackground> */}
      </View>
    );
  }
}

export default ProductCard;

const styles = StyleSheet.create({
  main: {},
  body: {
    padding: 20,
    position: "absolute",
    top: 350,
    // bottom: 20,
  },
  textContainer: {
    width: "100%",
    // marginBottom: 10,
    height: 120,
  },
  titleText: {
    top: 10,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  priceText: {
    top: 20,
    fontSize: 20,
    color: "white",
  },
});

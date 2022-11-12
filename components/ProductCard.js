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
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height * 0.7;
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

class ProductCard extends Component {
  render() {
    return (
      <ImageBackground
        style={{
          height: this.props.height,
          width: this.props.width,
        }}
        source={require("../assets/tester.jpg")}
      >
        <LinearGradient
          colors={["transparent", "transparent", "#000000"]}
          style={{ height: "100%", width: "100%" }}
          end={{ x: 0.5, y: 0.9 }}
        >
          <View style={styles.body}>
            <Text style={styles.titleText}>F1 Board Radio Keychain</Text>
            <Text style={styles.priceText}>$ 9.99</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

export default ProductCard;

const styles = StyleSheet.create({
  main: {},
  body: {
    padding: 20,
    position: "absolute",
    bottom: 20,
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

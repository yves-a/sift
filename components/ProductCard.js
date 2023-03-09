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
          source={{ uri: this.props.item.img }}
        ></Image>
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
        <Icon
          name="information-circle-outline"
          size={30}
          color={"white"}
          onPress={() => {
            this.props.navigation.navigate("Product", {
              item: this.props.item,
            });
          }}
          style={{
            position: "relative",
            top: "41%",
            left: "84%",
          }}
        />
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
    backgroundColor: "#2F3956",
    width: "100%",
    height: "37%",
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

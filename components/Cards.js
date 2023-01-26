import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from "react-native";

import ProductCard from "./ProductCard";
import {
  getRecommendations,
  saveProduct,
  updateCollection,
} from "../clients/FlaskServer";

const SCREEN_HEIGHT = Dimensions.get("window").height * 0.8;
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";

// const Users = [
//   { id: "1", uri: require("../assets/tester.jpg") },
//   { id: "2", uri: require("../assets/tester.jpg") },
//   { id: "3", uri: require("../assets/tester.jpg") },
//   { id: "4", uri: require("../assets/tester.jpg") },
//   { id: "5", uri: require("../assets/tester.jpg") },
//   { id: "6", uri: require("../assets/tester.jpg") },
//   { id: "7", uri: require("../assets/tester.jpg") },
//   { id: "8", uri: require("../assets/tester.jpg") },
// ];

const calcIndex = (index, inc, users) => {
  let length = users.length;
  index = index + inc;
  if (index < 0) {
    return length - 1;
  } else if (index >= length) {
    return 0;
  } else {
    return index;
  }
};

class Cards extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
    };

    this.users = this.props.users;

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-30deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

    this.scale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [0.2, 1, 0.2],
      extrapolate: "clamp",
    });

    this.backgroundScale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [50, 1, 50],
      extrapolate: "clamp",
    });

    this.ZindexScale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [-2000, 10, -2000],
      extrapolate: "clamp",
    });

    this.translate = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [-150, 0, 150],
      extrapolate: "clamp",
    });

    this.rotateAndTranslate = {
      transform: [
        {
          translateY: this.translate,
        },
        {
          scaleX: this.scale,
        },
        {
          scaleY: this.scale,
        },
        ...this.position.getTranslateTransform(),
      ],
    };

    this.trashOpacity = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 4, 0, SCREEN_HEIGHT / 4],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });

    this.saveOpacity = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 4, 0, SCREEN_HEIGHT / 4],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    });

    this.hideOpacity = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [2, 0, 2],
      extrapolate: "clamp",
    });
  }
  UNSAFE_componentWillMount() {
    this.props.navigation.getParent().setOptions({
      tabBarStyle: {
        display: "flex",
      },
    });
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 30 || gestureState.dy < -30) {
          this.props.navigation.getParent().setOptions({
            tabBarStyle: {
              display: "none",
            },
          });
        }
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.props.navigation.getParent().setOptions({
          tabBarStyle: {
            display: "flex",
          },
        });
        if (gestureState.dx < -120) {
          this.position.setValue({ x: 400, y: 0 });
          this.setState(
            { currentIndex: calcIndex(this.state.currentIndex, 1, this.users) },
            () => {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true,
              }).start();
            }
          );
        } else if (gestureState.dx > 120) {
          this.position.setValue({ x: -400, y: 0 });
          this.setState(
            {
              currentIndex: calcIndex(this.state.currentIndex, -1, this.users),
            },
            () => {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true,
              }).start();
            }
          );
        } else if (gestureState.dy < -120) {
          this.position.setValue({ x: 500, y: 0 });
          this.setState(
            {
              currentIndex: calcIndex(
                this.state.currentIndex - 1,
                1,
                this.users
              ),
            },
            () => {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                friction: 4,
                useNativeDriver: true,
              }).start();
            }
          );
          this.users.splice(this.state.currentIndex, 1);
          if (this.users.length === 0) {
            this.updateUsers();
          }
        } else if (gestureState.dy > 120) {
          this.position.setValue({ x: 500, y: 0 });
          this.setState(
            {
              currentIndex: calcIndex(
                this.state.currentIndex - 1,
                1,
                this.users
              ),
            },
            () => {
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                friction: 4,
                useNativeDriver: true,
              }).start();
            }
          );
          const id =
            this.users[this.state.currentIndex].asin ||
            this.users[this.state.currentIndex]._id;
          saveProduct(id, global.currRec);
          this.users.splice(this.state.currentIndex, 1);
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { users } = this.props;
    if (props.users !== users) {
      this.setState({ currentIndex: 0 });
      this.users = props.users;
    }
  }

  async updateUsers() {
    let newUsers = await getRecommendations();
    this.users = newUsers;
    this.setState({ currentIndex: 0 });
  }

  renderUsers = () => {
    return this.users
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.asin || item._id}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH - 60,
                  paddingHorizontal: 30,
                  position: "absolute",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                },
              ]}
            >
              <ProductCard
                height={SCREEN_HEIGHT - 120}
                width={SCREEN_WIDTH - 60}
                item={item}
                navigation={this.props.navigation}
              />
            </Animated.View>
          );
        }
        // else {
        //   return (
        //     <Animated.View
        //       key={item.id}
        //       style={[
        //         {
        //           opacity: this.nextCardOpacity,
        //           transform: [{ scale: this.nextCardScale }],
        //           height: SCREEN_HEIGHT - 120,
        //           width: SCREEN_WIDTH,
        //           padding: 10,
        //           position: "absolute",
        //           left: 500,
        //         },
        //       ]}
        //     >
        //       {/* <ProductCard /> */}
        //     </Animated.View>
        //   );
        // }
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: "white",
            height: 100,
            width: 100,
            top: SCREEN_HEIGHT / 2,
            left: SCREEN_WIDTH / 2 - 50,
            transform: [
              {
                scaleX: this.backgroundScale,
              },
              {
                scaleY: this.backgroundScale,
              },
            ],
            opacity: this.hideOpacity,
          }}
        />
        <View
          style={{
            height: 50,
          }}
        ></View>
        <View style={{ flex: 1 }}>{this.renderUsers()}</View>
        <View style={{ height: 60 }}></View>
        <Animated.View
          style={{
            opacity: this.trashOpacity,
          }}
        >
          <View style={styles.deleteButton}>
            <Icon
              name="trash-outline"
              color={"white"}
              size={40}
              style={styles.icon}
            ></Icon>
          </View>
        </Animated.View>
        <Animated.View style={{ opacity: this.saveOpacity }}>
          <View style={styles.saveButton}>
            <Icon
              name="bookmark"
              color={"white"}
              size={40}
              style={styles.icon}
            ></Icon>
          </View>
        </Animated.View>
        <Animated.View style={{ zIndex: this.ZindexScale }}>
          <Text
            style={{
              position: "absolute",
              top: -130,
              marginLeft: SCREEN_WIDTH / 2 - 30,
              color: "black",
              fontSize: 30,
            }}
          >
            SIFT
          </Text>
        </Animated.View>
      </View>
    );
  }
}

export default Cards;

const styles = StyleSheet.create({
  saveButton: {
    left: SCREEN_WIDTH / 2 - 40,
    top: SCREEN_HEIGHT - 175,
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "#33D176",
    zIndex: 2000,
  },
  deleteButtonContainer: {},
  deleteButton: {
    left: SCREEN_WIDTH / 2 - 40,
    top: -140,
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "#FC4141",
    // zIndex: 2000,
  },
  icon: {
    top: 20,
    left: 20,
  },
});

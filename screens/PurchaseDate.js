import React, { Component, useState } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
} from "react-native";
// import DatePicker from "react-native-datepicker";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from "react-native-masked-text";

export default class PurchaseDate extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null, dt: null, registrationDate: "" };
    console.log(this.props.route.params.recipient);
  }

  checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }

  dateTimeInputChangeHandler = (e) => {
    this.type = "text";
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[1]) values[1] = this.checkValue(values[1], 12);
    if (values[0]) values[0] = this.checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + "/" : v;
    });
    this.setState({
      registrationDate: output.join("").substr(0, 14),
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container2}>
        <View style={styles.progressBar}>
          <View style={styles.progressEvent}></View>
        </View>
        <View
          style={{
            flexDirection: "row",
            top: "8%",
          }}
        >
          <View style={styles.backButton}>
            <Pressable
              onPress={() => {
                this.props.navigation.goBack();
              }}
              title="Go to Page"
              accessibilityLabel="Go to the previous page, Shopping For."
            >
              <Icon name="chevron-back-outline" size={"40%"} color="#1C1B1F" />
            </Pressable>
          </View>
          {/* <View style={styles.skipButton}>
            <Pressable
              onPress={() => {}}
              title="Skip"
              accessibilityLabel="Go to the next page, Relationship."
            >
              <Text style={styles.skipText}>SKIP</Text>
            </Pressable>
          </View> */}
        </View>
        <Text style={styles.header}>You're Buying By</Text>
        <View style={styles.datePick}>
          {/* <DatePicker
          style={styles.calApp}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          mode="date"
          format="YYYY/MM/DD"
          minDate="01-01-1990"
          maxDate="31-12-2020"
          placeholder="select date"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
        /> */}
          <TextInputMask
            style={{
              textAlign: "center",
              letterSpacing: 4,
              fontSize: 30,
              width: 300,
              backgroundColor: "white",
              padding: 10,
              marginBottom: 30,
              paddingHorizontal: 30,
            }}
            placeholder="MM/DD/YYYY"
            type={"datetime"}
            options={{
              format: "MM/DD/YYYY",
            }}
            value={this.state.dt}
            onChangeText={(text) => {
              this.setState({
                dt: text,
              });
            }}
            ref={(ref) => (this.datetimeField = ref)}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.buto}
            onPress={() => {
              console.log(this.state.dt);
              console.log(this.props.route.params.recipient);
              this.props.navigation.navigate("Relationship", {
                recipient: {
                  ...this.props.route.params.recipient,
                  date: this.state.dt,
                },
              });
            }}
            color="white"
            title="Next"
          />
        </View>
      </SafeAreaView>
    );
  }
}

// export default PurchaseDate;

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    // right: "5%",
    width: "80%",
    fontFamily: "SF-Pro-Display",
    color: "#1C1B1F",
    top: "22%",
  },
  backButton: {
    flex: 0.8,
    right: "35%",
    top: "5%",
  },
  skipButton: {
    top: "6%",
  },
  skipText: {
    fontSize: 22,
    fontFamily: "SF-Pro-Display",
  },
  container2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  datePick: {
    top: "45%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  calApp: {
    // width: "100%",
  },
  progressEvent: {
    flex: 0.25,
    backgroundColor: "#333333",
    height: "100%",
  },
  progressBar: {
    flexDirection: "row",
    flex: 0.03,
    backgroundColor: "#e0e0de",
    width: "100%",
    height: "5%",
    top: "8%",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    position: "absolute",
    width: "80%",
    height: 44,
    left: "10%",
    top: "55%",
    opacity: 0.3,
    backgroundColor: "rgba(79, 79, 79, 1)",
    borderRadius: 7,
  },
  buto: {
    position: "absolute",
    color: "white",
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 16,
  },
});

import React, { Component } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInputMask } from "react-native-masked-text";

export default class PurchaseDate extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null, dt: "", registrationDate: "" };
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
              <Icon name="chevron-back-outline" size={40} color="#1C1B1F" />
            </Pressable>
          </View>
        </View>
        <Text style={styles.header}>You're Buying By</Text>
        <View style={styles.datePick}>
          <TextInputMask
            style={{
              letterSpacing: 4,
              fontSize: 35,
              width: 300,
              backgroundColor: "white",
              padding: 10,
              marginBottom: 30,
              paddingHorizontal: 20,
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
        <Pressable
          onPress={() => {
            if (this.state.dt != "") {
              this.props.navigation.navigate("Relationship", {
                recipient: {
                  ...this.props.route.params.recipient,
                  date: this.state.dt,
                },
              });
            }
          }}
          style={({ pressed }) => [
            {
              opacity: pressed || this.state.dt == "" ? 0.3 : 1,
            },
            styles.nextButton,
          ]}
          title="Next"
          accessibilityLabel="Go to the next page, Interests."
        >
          <Text style={styles.text}>Next</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

// export default PurchaseDate;

const styles = StyleSheet.create({
  header: {
    fontSize: 43,
    width: "80%",
    marginTop: "42%",
    backgroundColor: "white",
  },
  backButton: {
    flex: 0.8,
    left: -15,
    // top: "5%",
  },
  datePick: {
    marginTop: "10%",
    left: "-7%",
  },
  container2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressEvent: {
    flex: 0.1,
    backgroundColor: "#333333",
    height: "100%",
  },
  progressBar: {
    flexDirection: "row",
    backgroundColor: "#e0e0de",
    width: "100%",
    height: 15,
  },
  nextButton: {
    marginTop: "1%",
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "85%",
    backgroundColor: "#2F3956",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

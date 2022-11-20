import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import gift from "../assets/images/gift.png";
import confetti from "../assets/images/confetti.png";
import whitelogo from "../assets/images/whitelogo.png";
import { AntDesign } from "@expo/vector-icons";
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";

const Landing = ({ navigation }) => {
  const [signInOptions, setSignInOptions] = useState(false);

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <View
      style={{
        backgroundColor: "#3D6F99",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={styles.imageContainer}>
        {/* <Image style={styles.gift} source={gift}></Image> */}
        <Image
          style={{ marginVertical: 275, height: 200, width: 400, right: 20 }}
          source={whitelogo}
        ></Image>
        {/* <Image style={styles.confetti} source={confetti}></Image> */}
        {/* <Text style={styles.title}>SIFT</Text> */}
      </View>
      {signInOptions ? (
        <View style={styles.buttons}>
          {/* GOOGLE LOGIN */}
          {/* <TouchableOpacity
            onPress={() => {
              googleSignIn();
            }}
            style={styles.signInButton}
          >
            <AntDesign
              name="google"
              size={24}
              style={{ position: "absolute", left: 20 }}
              color="#FCFCFC"
            />
            <Text style={[styles.buttonText, { color: "#FCFCFC" }]}>
              Sign in with Google
            </Text>
          </TouchableOpacity> */}
          {/* FACEBOOK LOGIN */}
          {/* <TouchableOpacity
            onPress={() => {
              return null;
            }}
            style={styles.signInButton}
          >
            <AntDesign
              name="facebook-square"
              size={24}
              style={{ position: "absolute", left: 20 }}
              color="#FCFCFC"
            />
            <Text style={[styles.buttonText, { color: "#FCFCFC" }]}>
              Sign in with Facebook
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={styles.signInButton}
          >
            <AntDesign
              name="mail"
              size={24}
              style={{ position: "absolute", left: 20 }}
              color="#FCFCFC"
            />
            <Text style={[styles.buttonText, { color: "#FCFCFC" }]}>
              Sign in with Email
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={styles.subheading}>Don't have an account?</Text>
            <Text
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={[
                styles.subheading,
                { marginLeft: 0, textDecorationLine: "underline" },
              ]}
            >
              Register
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={styles.createAccountButton}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSignInOptions(true);
            }}
            style={styles.signInButton}
          >
            <Text style={[styles.buttonText, { color: "#FCFCFC" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Landing;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    top: 0,
    left: 0,
    marginBottom: 0,
    alignSelf: "flex-start",
  },
  gift: {
    position: "relative",
    top: "25%",
    left: "22%",
  },
  confetti: {
    position: "relative",
    top: "-25%",
    left: "5%",
  },
  title: {
    // fontFamily: "Bryant Pro",
    fontSize: "57px",
    fontWeight: "700",
    lineHeight: "64px",
    letterSpacing: "-4px",
    textAlign: "left",
    color: "#FFFFFF",
    position: "relative",
    top: "-33%",
    left: "37%",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    marginTop: -50,
  },
  signInButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 8,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderColor: "#FCFCFC",
    borderWidth: "2px",
    borderRadius: "7px",
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 44,
    width: 342,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    gap: "8px",
    color: "#FCFCFC",
  },
  buttonText: {
    // fontFamily: "SF Pro Display",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "18px",
  },
  createAccountButton: {
    elevation: 8,
    backgroundColor: "#FCFCFC",
    borderStyle: "solid",
    borderColor: "#FCFCFC",
    borderWidth: "2px",
    borderRadius: "7px",
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 44,
    width: 342,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    gap: "8px",
  },
  subheading: {
    // fontFamily: "SF Pro Display",
    fontStyle: "normal",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    textAlign: "right",
    color: "#FCFCFC",
    alignSelf: "flex-end",
    margin: 10,
    marginTop: 5,
  },
});

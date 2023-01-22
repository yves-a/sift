import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import styles from "./LoginInFlow.style.js";
import { AntDesign } from "@expo/vector-icons";
import { auth, signInWithEmailAndPassword } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in!");
        navigation.navigate("Loading");
      })
      .catch((error) => {
        setError("Password or email is incorrect!");
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Back!</Text>
      <View>
        <View>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter Email"
            style={styles.input}
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Enter Password"
            style={styles.input}
            secureTextEntry
          />
        </View>
        <Text style={styles.subheading}>Forgot Password</Text>
        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.formButtonContainer}
        >
          <Text style={styles.formButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
      </View>
      {/* )} */}
      {/* </Formik> */}
    </View>
  );
};

export default Login;

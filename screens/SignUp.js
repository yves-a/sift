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
import styles from "./LoginInFlow.style.js";
import { AntDesign } from "@expo/vector-icons";
import { auth, createUserWithEmailAndPassword } from "../firebase.js";
import { createUser, health } from "../clients/FlaskServer.js";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const create = await createUser(response.user.uid);
        console.log(create);
        navigation.navigate("Loading");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <View style={styles.containerSignUp}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up.</Text>
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
        <Text>{error}</Text>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.formButtonContainerSignUp}
        >
          <Text style={styles.formButtonTextSignUp}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.subheadingTOS}>
          Creating an account means you’re okay with our {"\n"} Terms of Service
          and our Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    marginTop: -200,
  },
});

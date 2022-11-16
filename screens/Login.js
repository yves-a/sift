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
import { auth, signInWithEmailAndPassword } from "../firebase.js";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSignInPress = () => {
    console.log("BRUH");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Inside");
        console.log({ email, password });
        // const user = userCredential.user;
        navigation.navigate("Loading");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        setPassword("");
        console.log({ errorCode, errorMessage });
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
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          setEmail(values.email);
          setPassword(values.password);
          onSignInPress();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Enter Email"
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Enter Password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
            <Text style={styles.subheading}>Forgot Password</Text>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.formButtonContainer}
            >
              <Text style={styles.formButtonText}>Sign In</Text>
            </TouchableOpacity>
            <Text>{error}</Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

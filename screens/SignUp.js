import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import styles from './LoginInFlow.style.js'
import { AntDesign } from '@expo/vector-icons'
import { auth, createUserWithEmailAndPassword } from '../firebase.js'
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onRegisterPress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
        }
        navigation.navigate('Login')
        // const usersRef = firebase.firestore().collection('users')
        // usersRef
        //   .doc(uid)
        //   .set(data)
        //   .then(() => {
        //     navigation.navigate('Home', { user: data })
        //   })
        //   .catch((error) => {
        //     alert(error)
        //   })
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <View style={styles.containerSignUp}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up.</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          console.log(values)
          setEmail(values.email)
          setPassword(values.password)
          onRegisterPress()
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter Email"
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Enter Password"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.formButtonContainerSignUp}
            >
              <Text style={styles.formButtonTextSignUp}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.subheadingTOS}>
              Creating an account means you’re okay with our {'\n'} Terms of
              Service and our Privacy Policy
            </Text>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default SignUp

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    marginTop: -200,
  },
})

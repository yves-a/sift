import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import styles from './LoginInFlow.style.js'
import { AntDesign } from '@expo/vector-icons'
import { auth, signInWithEmailAndPassword } from '../firebase'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

// const auth = getAuth()

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Logged in!')
        navigation.navigate('Loading')
      })
      .catch((error) => {
        setError('Password or email is incorrect!')
        console.log(error)
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('Please check your email!')
      })
      .catch((error) => {
        if (error.code === 'auth/missing-email') {
          setError('Please enter an email, then try again :)')
        }
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/user-not-found'
        ) {
          setError('No account attached to this email')
        }
      })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
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
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.subheading}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignIn}
          style={styles.formButtonContainer}
        >
          <Text style={styles.formButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ paddingLeft: '2%' }}>{error}</Text>
      </View>
      {/* )} */}
      {/* </Formik> */}
    </View>
  )
}

export default Login

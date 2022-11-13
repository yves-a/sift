import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Formik } from 'formik'
import styles from './LoginInFlow.style.js'
import { AntDesign } from '@expo/vector-icons'
const Email = (props) => {
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
        <Text style={styles.subheadingForgot}>
          We’ve sent password recovery instructions to your {'\n'}email.
        </Text>
        <TouchableOpacity
          onPress={() => {
            return null
          }}
          style={styles.formButtonContainerEmail}
        >
          <Text style={styles.formButtonTextSignUp}>Open Mail</Text>
        </TouchableOpacity>
        <Text style={styles.subheadingEmail}>I'll confirm later</Text>
      </View>
    </View>
  )
}
export default Email

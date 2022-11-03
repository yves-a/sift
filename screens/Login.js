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
const Login = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          return null
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Back!</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
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
            <Text style={styles.subheading}>Forgot Password</Text>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.formButtonContainer}
            >
              <Text style={styles.formButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Login

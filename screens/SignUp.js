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
const SignUp = (props) => {
  return (
    <View style={styles.containerSignUp}>
      <TouchableOpacity
        onPress={() => {
          return null
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up.</Text>
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

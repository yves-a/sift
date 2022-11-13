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
const Name = ({ navigation }) => {
  return (
    <View style={styles.containerName}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
        style={styles.tinyLogo}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>My name is</Text>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="First Name"
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.formButtonContainerSignUp}
            >
              <Text style={styles.formButtonTextSignUp}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Name

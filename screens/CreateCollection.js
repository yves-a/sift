import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import { createCollection } from "../clients/FlaskServer";
const CreateCollection = ({ navigation }) => {
  return (
    <View style={styles.containerName}>
      <View style={styles.header}>
        {/* Couldnt figure out a different way to center besides using empty space */}
        <Text style={styles.title}>{"    "}</Text>
        <Text style={styles.title}>SIFT</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.tinyLogo}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Give your collection a name.</Text>
      <Formik
        initialValues={{ collection: "" }}
        onSubmit={(values) => {
          createCollection({
            name: values.collection,
            products: [],
            ownerId: global.currRec,
          });
          navigation.navigate("Saved");
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <TextInput
                onChangeText={handleChange("collection")}
                onBlur={handleBlur("collection")}
                value={values.collection}
                placeholder="COLLECTION"
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
  );
};

export default CreateCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    marginTop: -300,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 100,
    // backgroundColor: 'black',
  },
  containerName: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    marginTop: -200,
  },
  title: {
    fontStyle: "normal",
    fontSize: "24px",
    fontWeight: "400",
    lineHeight: "32px",
    letterSpacing: "0em",
    textAlign: "center",
    paddingLeft: 0,
    paddingBottom: 40,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: "5px",
    borderBottomWidth: 3,
    borderBottomColor: "#121212",
    height: 50,
    margin: 5,
    width: 342,
    lineHeight: "18px",
    paddingBottom: 5,
    paddingTop: 20,
    alignSelf: "center",
  },
  formButtonContainerSignUp: {
    elevation: 8,
    backgroundColor: "#4F4F4F",
    opacity: 0.3,
    borderStyle: "solid",
    borderColor: "#79747E",
    borderWidth: "2px",
    borderRadius: "7px",
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: 44,
    width: 199,
    alignSelf: "center",
    position: "fixed",
    bottom: "-30%",
    marginBottom: 100,
  },
  formButtonTextSignUp: {
    fontStyle: "normal",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "0.1px",
    textAlign: "left",
    color: "#FFFFFF",
    alignSelf: "center",
  },

  tinyLogo: {
    alignSelf: "flex-end",
    padding: 40,
    paddingLeft: 0,
    top: -20,
  },
});

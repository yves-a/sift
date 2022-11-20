import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";

const ProfileCard = ({ name, img }) => {
  if (img) {
    return (
      <View
        style={{
          height: 400,
          width: 400,
          borderRadius: 200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        containerStyle={{ flex: 1 }}
      >
        <Image
          source={img}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        height: 400,
        width: 400,
        borderRadius: 200,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      containerStyle={{ flex: 1 }}
    >
      <View
        style={{
          backgroundColor: "#3D6F99",
          height: 200,
          width: 200,
          borderRadius: 100,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Icon
          style={styles.icon}
          name="person-outline"
          size={90}
          color="white"
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#E4474A",
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 200,
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
  name: {
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
});

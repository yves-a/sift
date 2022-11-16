import { View, StyleSheet, Text, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/Ionicons";

const ProfileCard = ({ profile, name }) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="person-outline" size={90} color="white" />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: "#E4474A",
    borderRadius: 100,
    left: SCREEN_WIDTH / 2 - 100,
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  name: {
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
  },
});

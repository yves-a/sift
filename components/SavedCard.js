import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SavedCard = ({ item }) => {
  const shrinkTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    } else {
      return title;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: "100%",
          width: "40%",
          borderRadius: 10,
        }}
        source={require("../assets/tester.jpg")}
        // source={{ uri: item.img }}
      ></Image>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{shrinkTitle(item.title)}</Text>
        <Text style={{ position: "absolute", top: 70 }}>$ $</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log("Hey");
        }}
      >
        <Icon name="ellipsis-horizontal" size={25} color="black" />
      </Pressable>
    </View>
  );
};

export default SavedCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    padding: 5,
    flexDirection: "row",
  },
  textContainer: {
    width: "45%",
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
  },
  button: {
    justifyContent: "center",
  },
});

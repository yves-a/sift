import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";

const CollectionCard = ({ navigation, item }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Collection", { item });
      }}
      style={styles.container}
    >
      <ImageBackground
        source={
          item.img ? { uri: item.img } : require("../assets/images/icon2.png")
        }
        imageStyle={{ borderRadius: 15 }}
        style={styles.image}
      >
        <View style={styles.footer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "50%",
  },
  image: {
    padding: 5,
    // top: 10,
    left: 5,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 15,
    top: 8,
    left: 8,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    height: 35,
    width: "100%",
    backgroundColor: "white",
    opacity: 0.8,
  },
});

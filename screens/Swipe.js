import { View, Text, StyleSheet, Button } from "react-native";
import Cards from "../components/Cards";
import { useNavigation } from "@react-navigation/native";

const Swipe = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.container}></Text>
      <View style={styles.cards}>
        <Cards navigation={navigation} />
      </View>
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
  },
  cards: {},
});

import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CirculeButton = ({ text, size, pressed }) => {
  return (
    <View>
      <View
        style={{
          height: size,
          width: size,
          backgroundColor: pressed ? "#3D6F99" : "#131723",
          borderRadius: size / 2,
        }}
      >
        {pressed && (
          <Icon
            style={{ left: size / 1.35, position: "absolute" }}
            name="checkmark-circle"
            size={20}
            color="red"
          />
        )}
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default CirculeButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
  },
});

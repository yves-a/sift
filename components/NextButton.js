import { View, Text, StyleSheet, Pressable } from "react-native";

const NextButton = ({ navigation, nextScreen, text, value }) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          if (value != null) {
            navigation.navigate(nextScreen);
          }
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed || value == null ? "#4F4F4F24" : "#4F4F4F",
          },
          styles.nextButton,
        ]}
        title="Next"
        accessibilityLabel="Go to the next page"
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
  nextButton: {
    color: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    top: "10%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

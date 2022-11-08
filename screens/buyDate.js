import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, TextInput, Text, View, Button } from "react-native";
import DatePicker from 'react-native-datepicker'
import { useFonts } from "expo-font";
// import {dateRangeInput} from '@datepicker-react/styled'
import Icon from "react-native-vector-icons/FontAwesome";
// import 'react-datepicker/dist/react-datepicker.css';


const PurchaseDate = ({ navigation }) => {
    const [startDate, setStartDate] = useState(new Date());
    // let [fontsLoaded, error] = useFonts({
    //     "SF-Pro-Display": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    //   });

    return (
        <View
            style={styles.container2}>
            <View style={styles.progressBar}>
                <View style={styles.progressEvent}></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.backButton}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("shoppingFor");
                        }}
                        title="Go to Page"
                        accessibilityLabel="Go to the previous page, Shopping For."
                    >
                        <Icon name="chevron-left" size={"40%"} color="#1C1B1F" />
                    </Pressable>
                </View>
                <View style={styles.skipButton}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Relationship");
                        }}
                        title="Skip"
                        accessibilityLabel="Go to the next page, Relationship.">
                        <Text style={styles.skipText}>SKIP</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={styles.header}>You're Buying By</Text>
            <DatePicker style={styles.calApp} selected={startDate} onChange={(date) => setStartDate(date)} />
            <View style={styles.button}>
                <Button
                    style={styles.buto}
                    onPress={() => navigation.navigate('Relationship')}
                    color='white'
                    title='Next'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 390,
        height: 844,
        left: 0,
        top: 0,
    },
    header: {
        fontSize: 45,
        right: "5%",
        fontFamily: "SF-Pro-Display",
        color: "#1C1B1F",
        flex: 0.28,
        top: "12%",
      },
    backButton: {
        flex: 0.8,
        right: "35%",
        top: "5%",
    },
    skipButton:{
        top: "5%",
    },
    skipText: {
        fontSize: 22,
        fontFamily: "SF-Pro-Display",
    },
    container2: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "top",
        top: "8%",
    },
    calApp: {
        top: "1%",
    },
    progressEvent: {
        flex: 0.25,
        backgroundColor: "#333333",
        height: "100%",
    },
    progressBar: {
        flexDirection: "row",
        flex: 0.03,
        backgroundColor: "#e0e0de",
        width: "100%",
        height: "5%",
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'absolute',
        width: 342,
        height: 44,
        left: 24,
        top: "45%",
        opacity: 0.3,
        backgroundColor: 'rgba(79, 79, 79, 1)',
        borderRadius: 7,
    },
    buto: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 342,
        height: 44,
        opacity: 0,
        left: 24,
        gap: 8,
        color: 'white',
        fontSize: 18,
    },
});

export default PurchaseDate
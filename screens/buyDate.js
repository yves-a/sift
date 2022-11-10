import React, { useState } from "react";
import {Animated, Pressable, SafeAreaView, StyleSheet, TextInput, Text, View, Button } from "react-native";
import DatePicker from 'react-native-datepicker'
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInputMask } from 'react-native-masked-text'




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
                        accessibilityLabel="Go to the previous page, Shopping For.">
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
            <DatePicker
            style={styles.calApp}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            mode="date"
            format="YYYY/MM/DD"
            minDate="01-01-1990"
            maxDate="31-12-2020"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
             />
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
    header: {
        fontSize: 45,
        // right: "5%",
        width: "80%",
        fontFamily: "SF-Pro-Display",
        color: "#1C1B1F",
        top: "12%",
    },
    backButton: {
        flex: 0.8,
        right: "35%",
        top: "5%",
    },
    skipButton: {
        top: "6%",
    },
    skipText: {
        fontSize: 22,
        fontFamily: "SF-Pro-Display",
    },
    container2: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "top",
        top: "8%",
    },
    calApp: {
        top: "18%",
        width: "80%",
        left: "3%",
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
        width: "80%",
        height: 44,
        left: "10%",
        top: "45%",
        opacity: 0.3,
        backgroundColor: 'rgba(79, 79, 79, 1)',
        borderRadius: 7,
    },
    buto: {
        position: 'absolute',
        color: 'white',
        fontSize: 18,
    },
});

export default PurchaseDate
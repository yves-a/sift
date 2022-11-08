import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View, Button } from "react-native";
import DatePicker from 'react-native-datepicker'
// import "react-datepicker/dist/react-datepicker.css";


const PurchaseDate = () => {
    const [startDate, setStartDate] = useState(new Date());


    return (
        <View
            style={styles.container2}>
            <View style={styles.progressBar}>
                <View style={styles.progressEvent}></View>
            </View>
            <DatePicker style={styles.calApp} selected={startDate} onChange={(date) => setStartDate(date)} />
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
    container2: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "top",
        top: "10%",
    },
    calApp: {
        gridColumn: 5 / 10,
        gridRow: 2 / 4,

    },
    date: {
        color: 'blue',
        position: 'absolute',
        marginTop: 100,
        fontSize: 30,
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
});

export default PurchaseDate
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, TextInput, Text, View, Button, TouchableOpacity } from "react-native";

const FirstNameInput = ({ navigation }) => {
    const [onPressInActive, SetOnPressInActive] = useState('#33691E');
    const [textInputName, setTextInputName] = useState('');

    const checkTextInput = () => {
        if (!textInputName.trim()) {
            alert('Please Enter Name');
            return;
        }
        else {
            navigation.navigate('PurchaseDate')
        }

    };

    return (
        <SafeAreaView
            style={styles.container}>
            <View>
                <Text
                    style={styles.head}>
                    You're shopping for
                </Text>
            </View>
            <TextInput
                placeholder="FIRST NAME"
                style={styles.input}
                onChangeText={
                    (value) => setTextInputName(value)
                }
            />
            <View style={styles.button}>
                <Button
                    style={styles.buto}
                    color='white'
                    onPress={checkTextInput}
                    title='Next'
                />
            </View>
        </SafeAreaView>
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
    input: {
        position: 'absolute',
        width: 342,
        height: 50,
        left: 24,
        top: 394,
        justifyContent: 'center',
        fontSize: 18,
        alignItems: 'center',
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        padding: 10,
        color: 'black',
    },
    head: {
        position: 'absolute',
        fontSize: 45,
        lineHeight: 52,
        left: 24,
        top: 204,
        width: 333,
        height: 104,
        lineHeight: 52,
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'absolute',
        width: 342,
        height: 44,
        left: 24,
        top: 462,
        opacity: 0.3,
        marginTop: 20,
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

export default FirstNameInput
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions, AsyncStorage } from "react-native";
import colors from "../misc/colors";
import RoundIconbtn from "../components/roundIconbtn";

const Intro = () => {
    const [name, setName] = useState('');
    const handleOnChangeText = (text) => setName(text);

    const handleSubmit = async () => {
        const user = { name: name};
        await AsyncStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <>
        <StatusBar hidden/>
        <View style={styles.container}>
            <Text style={styles.InputTitle}>Enter Your Name</Text>
            <TextInput 
                value={name} 
                onChangeText={handleOnChangeText}
                style={styles.textInput}
            />
            { name.trim().length > 3 ? (
                <RoundIconbtn antIconName='rightcircle' onPress={handleSubmit}/>
            ) : null }
        </View>
        </>
    );
};


const width = Dimensions.get('window').width - 50
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput:{
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 15,
        marginBottom: 15,
    },
    InputTitle:{
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    },
});

export default Intro;
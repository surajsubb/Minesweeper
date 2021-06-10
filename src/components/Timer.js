import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, Button, TouchableOpacity, FlatList, ScrollView, Pressable } from "react-native";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
var interval
const Timer = ({increment, start, style}) =>{
    const [time, setTime] = useState(0)
    const [set, setSet] = useState(0)

    if(start == 1 && set == 0){
        setSet(1)
        interval = setInterval(() => {
            setTime(prevTime => {
                return prevTime+increment
            })
        }, increment*1000)
    }
    if(start == 0 && set == 1){
        console.log('hello')
        clearInterval(interval)
    }
    return (
        <View style={style}>
            <MaterialCommunityIcons name="timer-outline" style={styles.timerIcon} />
            <Text style={styles.timerText}>: {time}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    mainView:{
        flexDirection:'row',
        width: 150, 
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center'
    },
    timerText:{
        fontSize: 30,
        alignSelf: 'center',
        //marginHorizontal: 5,
    },
    timerIcon:{
        fontSize: 30,
        marginTop: 5,
        marginHorizontal: 5,

    }
})
export default Timer
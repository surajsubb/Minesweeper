import React, { useState } from "react";
import { Alert, Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity, Vibration } from "react-native";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const WrongFlag = () => {
    return(
        <View>
            <Entypo name="flag" style={styles.flagIcon} />
            <Entypo name="cross" style={styles.crossIcon} />
        </View>
    )
}

const styles = StyleSheet.create({
    flagIcon:{
        fontSize: 16,
        color: '#AA0000',
        alignSelf: "center",
        //marginTop: 5,
    },
    crossIcon:{
        fontSize: 16,
        color: '#000000',
        alignSelf: "center",
        marginTop: -18,
        opacity: 1,
    }
})
export default WrongFlag
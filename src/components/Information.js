import React, { useState } from "react";
import { MyAppHeaderText, Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity, Vibration, Modal, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
const Information = ({modalVisible, setModalVisible}) => {

    const popUpInfoPress = () => {
        setModalVisible({open: true, info: 'Modes'})
    }
    const popDownInfoPress = () => {
        setModalVisible({open: false, info: 'Modes'})     
    }

    let info = ''
    if(modalVisible.info === 'Modes'){
        info =  <View style={{width: '100%', alignSelf:'flex-start'}}>
                    <Text style={styles.header}>Modes</Text>
                        <Text style={styles.subHeader}>{'\u2023'} Beginner </Text>
                            <Text style={styles.content}>{'\t\t'} <MaterialCommunityIcons name="grid" size={24} color="black" /> 8x8, <MaterialCommunityIcons name="mine" size={24} /> 10</Text>
                        <Text style={styles.subHeader}>{'\u2023'} Intermediate </Text>
                            <Text style={styles.content}>{'\t\t'} <MaterialCommunityIcons name="grid" size={24} color="black" /> 16x16, <MaterialCommunityIcons name="mine" size={24} /> 40</Text>
                        <Text style={styles.subHeader}>{'\u2023'} Expert </Text>
                            <Text style={styles.content}>{'\t\t'} <MaterialCommunityIcons name="grid" size={24} color="black" /> 30x16, <MaterialCommunityIcons name="mine" size={24} /> 99</Text>
                </View>
    }
    else{
        info = <View style={{width: '100%', alignSelf:'flex-start'}}>
                    <Text style={styles.header}>Customise</Text>
                        <Text style={styles.content}>{'\u2023'} Input height and width of grid</Text>
                        <Text style={styles.content}>{'\u2023'} Number of mines should be less than <Text style = {{fontWeight: 'bold',}}>height {'\u2715'} width</Text></Text>
                        <Text style={styles.content}>{'\u2023'} The AI button lets an AI show you which blocks have mines and which are safe</Text>
                </View>
    }

    return(
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible.open}
            >
                <View style={styles.modalView}>
                    {info}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => popDownInfoPress()}
                    >
                        <Text style={styles.textStyle}>Done</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "#FFE",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    header: {
        fontSize: 40,
        borderBottomWidth: 2,
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 30,
        paddingBottom: 2,
        borderBottomWidth: 1,
    },
    content: {
        fontSize: 24,
        marginTop: 5,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default Information
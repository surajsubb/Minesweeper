import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
// height is actually width and vice versa (mistakes were made)

import Information from '../components/Information'

const HomeScreen = ({navigation}) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [bombs, setBombs] = useState(0);
    const [key, setKey] = useState(1)
    const [currFlagDelay, setCurrFlagDelay] = useState(200)
    const [modalVisible, setModalVisible] = useState({open: false, info: 'Modes'})

    const Restart = () => { 
        setKey(key*-1)
    }
    const CheckCustom = (data) => {
        if(height == 0 || width == 0 || bombs == 0){
            Alert.alert('Values must be greater than 0')
        }
        else if(height > 30 || width > 30){
            Alert.alert("Keep height and width below 31")
        }
        else if( bombs >= height*width){
            Alert.alert("Too many Bombs")
        }
        else{
            if(data == 1){
                navigation.navigate('AI',{
                    height:parseInt(height), 
                    width:parseInt(width), 
                    bombs: parseInt(bombs), 
                    key: key, 
                    restart: Restart,
                    currFlagDelay: currFlagDelay,
                    setCurrFlagDelay: setCurrFlagDelay,
                    AI:1
                })
            }
            else{
                navigation.navigate('Main',{
                    height:parseInt(height), 
                    width:parseInt(width), 
                    bombs: parseInt(bombs), 
                    key: key, 
                    restart: Restart,
                    currFlagDelay: currFlagDelay,
                    setCurrFlagDelay: setCurrFlagDelay,
                    AI:0
                })
            }
        }
    }
    return( 
        <KeyboardAvoidingView
            behavior='height'
            style={styles.keyboard}
            keyboardVerticalOffset={0}
        >
        <Information 
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
        />
        <Text style={styles.header}>MINESWEEPER</Text>

        <ScrollView
            style={{
                flex: 1
            }}
        >
            <View style = {styles.view}>
                <View style={styles.inputs}>
                    <View style={styles.subHeaderView}>
                        <Text style={styles.subHeader}>
                            Choose a Mode
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible({open: true, info: 'Modes'})}
                        >
                            <Ionicons name="information-circle" style={styles.info}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{width: 200, alignSelf:"center"}}
                        onPress={()=>navigation.navigate('Main',{
                            height:8, 
                            width:8, 
                            bombs: 10, 
                            key: key, 
                            restart: Restart,
                            currFlagDelay: currFlagDelay,
                            setCurrFlagDelay: setCurrFlagDelay,
                            AI:0,
                        })}
                    >
                        <Text style={styles.preset}>Beginner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width: 200, alignSelf:"center"}}
                        onPress={()=>navigation.navigate('Main',{
                            height:16, 
                            width:16, 
                            bombs: 40, 
                            key: key, 
                            restart: Restart,
                            currFlagDelay: currFlagDelay,
                            setCurrFlagDelay: setCurrFlagDelay,
                            AI:0
                        })}
                    >
                        <Text style={styles.preset}>Intermediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{width: 200, alignSelf:"center"}}
                        onPress={()=>navigation.navigate('Main',{
                            height:16, 
                            width:30, 
                            bombs: 99, 
                            key: key, 
                            restart: Restart,
                            currFlagDelay: currFlagDelay,
                            setCurrFlagDelay: setCurrFlagDelay,
                            AI:0
                        })}
                    >
                        <Text style={styles.preset}>Expert</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomView}>
                        <View style = {styles.custom}>
                            <View style={styles.subHeaderView}>
                                <Text style={styles.subHeader}>
                                    Custom
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setModalVisible({open: true, info: 'Custom'})}
                                >
                                    <Ionicons name="information-circle" style={styles.info}/>
                                </TouchableOpacity>
                            </View>
                                <View style={styles.customInputView}>
                                    <Text style={styles.textStyle}>Height</Text>
                                    <TextInput 
                                        style={styles.textInput}
                                        keyboardType = 'numeric'
                                        value={width}
                                        onChangeText={(text) => setWidth(text)}
                                    />
                                </View>
                                <View style={styles.customInputView}>
                                    <Text style={{...styles.textStyle}}>Width</Text>
                                    <TextInput 
                                        style={styles.textInput}
                                        keyboardType = 'numeric'
                                        value={height}
                                        onChangeText={(text) => setHeight(text)}
                                    />
                                </View>
                            <View style={styles.customInputView}>
                                <Text style={styles.textStyle}>Mines</Text>
                                <TextInput 
                                    style={styles.textInput}
                                    keyboardType = 'numeric'
                                    value={bombs}
                                    onChangeText={(text) => setBombs(text)}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{width: 130, alignSelf:"center"}}
                            onPress={()=>CheckCustom(0)}
                        >
                            <Text style={styles.startGameButton}>Play Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: 130, alignSelf:"center"}}
                            onPress={()=>CheckCustom(1)}
                        >
                            <Text style={styles.startGameButton}>AI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    keyboard:{
        flexGrow: 1,
        backgroundColor: '#555'
    },
    view:{
        //flex: 1,
        //height: '100%',
        //marginTop: 100,
        backgroundColor: '#555',
        //paddingTop: 100,
        
        
    },
    info:{
        fontSize: 30,
        color: 'black',
        alignSelf: 'flex-end',
        marginLeft: 20,
        //borderWidth: 1,
        //marginTop: 10,
        //marginBottom: 3,
    },
    header:{
        fontSize: 50,
        alignSelf: 'center',
        //position: 'absolute',
        marginTop: 50,
    },
    inputs:{
        marginTop: 50,
        //alignItems: 'center',
    },
    preset:{
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 30,
        borderWidth: 3,
        width: 200,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#999999',
        

    },
    custom: {
        //borderWidth: 1,
        //marginHorizontal: 10,
    },
    subHeaderView:{
        flexDirection: 'row',
        borderBottomWidth: 2,
        marginHorizontal: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        //borderWidth: 1,
    },
    subHeader:{
        flexGrow: 1,
        fontSize: 30,
        //borderWidth: 1,
        //marginHorizontal: 20,
        //borderWidth: 2,
        //marginBottom: 10,
        //paddingHorizontal: 10,
    },
    customInputView:{
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    textStyle: {
        fontSize: 23,
        width: 75,
    },
    textInput: {
        fontSize: 18,
        textAlign: 'center',
        width: 100,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        //marginLeft: 20,
        paddingHorizontal: 10,
        backgroundColor: '#999999',
    },
    startGameButton:{
        fontSize: 25,
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#999999',
        marginBottom: 20,
    },
    bottomView:{
        //padding: 20,
        //marginHorizontal: 20,
        height: '100%',
        // borderWidth: 2,
        // borderRadius: 50,
        // borderColor: 'red',

    }
})

export default HomeScreen
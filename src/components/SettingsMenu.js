import React, { useState } from "react";
import { Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity, Vibration, Modal, Pressable } from "react-native";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
const SettingsMenu = ({ flagDelay, onChangeFlagDelay, setFlagDelay, menuStyle }) => {
    const [FlagModalVisible, setFlagModalVisible] = useState(false);
    const [delayValue, setDelayValue] = useState(flagDelay)
    _menu = null;
    setMenuRef = ref => {
        _menu = ref;
    };
    hideMenu = () => {
        _menu.hide();
    };
    showMenu = () => {
        _menu.show();
    };
    const popUpLongPress = () => {
        hideMenu();
        setFlagModalVisible(true)
    }
    const popDown = () => {
        setFlagModalVisible(!FlagModalVisible)
        onChangeFlagDelay(delayValue)
        
    }
    return (
        <View style={menuStyle}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={FlagModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>Change flag delay time {'\n'}(ms)</Text>
                        <Slider
                            style={{width: 300, height: 40, }}
                            value={delayValue}
                            onValueChange={(value) => setDelayValue(value)}
                            minimumValue={100}
                            maximumValue={1000}
                            step={50}
                            minimumTrackTintColor="#000000"
                            maximumTrackTintColor="#000000"
                            trackImage={'../../assets/mineImage.png'}
                        />
                        <Text style={{fontSize: 20,}}>{delayValue}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => popDown()}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Menu
                style={styles.menuIcon}
                ref={setMenuRef}
                button={<Ionicons 
                            onPress={showMenu} 
                            style={styles.menuIcon} 
                            name="settings-sharp"
                        />}
            >
                <MenuItem onPress={() => popUpLongPress()} >Long press Time</MenuItem>
            </Menu>
      </View>
    )
}

const styles = StyleSheet.create({
    menuIcon:{
        color: 'black',
        // borderColor: 'black',
        // borderWidth: 2,
        fontSize: 35,
        //alignSelf: 'flex-end',
        //marginLeft: 20,
    },
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
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default SettingsMenu
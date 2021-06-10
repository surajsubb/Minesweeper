import React, { useState } from "react";
import { Alert, Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity, Vibration } from "react-native";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import WrongFlag from './WrongFlag'
import { isInteger } from "lodash";

const MainButton = React.memo(function MainButton (props) {

    const [pressed, setPressed] = useState(0)
    const [reset, setReset] = useState(0)
    const [flag, setFlag] = useState(-1)
    const [blank, setBlank] = useState(0)
    
    if(props.endState == 0 && pressed == 0 && flag != 2){
        if(props.flagStatus != 1){
            setPressed(1)
        }
        else if(props.flagStatus == 1 && props.num.item != 'M'){
            setFlag(2)
        }
    }
    if(props.endState == 1 && pressed == 0){
        if(props.flagStatus != 1){
            setPressed(1)
        }
    }
    if(props.blankStatus == 1 && blank == 0){
        setPressed(1)
        setBlank(1)
    }

    var button = {
        borderWidth: 1,
        //borderTopColor: 'black',
        width: 25,
        height: 25,
        flex: 1,
        marginLeft: -1,
        justifyContent: 'center'
        
    }
    var mineColor = {
        ...button,
        backgroundColor: '#999999',
    }
    var mineColorPressed = {
        ...button,
        backgroundColor: 'red',
    }
    const isRightCoords = (row, column) => {
        let n=props.toPress.length;
        for( let i=0; i<n ; i++){
            if(props.toPress[i].row == row && props.toPress[i].column == column){
                return i;
            }
        }
        return false;
    }
    const buttonBackground = () => {
        if(props.toPress != undefined){
            let isFlag = isRightCoords(props.row, props.num.index)
            if(pressed == 0 && isInteger(isFlag) && flag == -1){
                if(props.toPress[isFlag].flag == 0){
                    return{
                        ...button,
                        backgroundColor: '#77AA77',
                    }
                }
                else if(props.toPress[isFlag].flag == 1) {
                    return{
                        ...button,
                        backgroundColor: '#AA7777',
                    }
                }
                else if(props.toPress[isFlag].flag == 2){
                    return{
                        ...button,
                        backgroundColor: props.toPress[isFlag].color,
                    }
                }
            }
        }
        if(blank == 1){
            return {
                ...button,
                backgroundColor: '#999999',
            }
        }
        if(pressed == 1 && props.num.item == 'M'){
            if(reset == 1){
                return{
                    ...mineColorPressed
                }
            }
            return {
                // ...button,
                // backgroundColor: '#999999',
                ...mineColor
            }
        }
        if(pressed == 0){
            return {
                ...button,
                backgroundColor: '#777777',
            }
        }
        return {
            ...button,
            backgroundColor: '#999999',
        }
    }

    var buttonText = {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    }

    const buttonTextStyle = () => {
        if(props.num.item == 1){
            return {
                ...buttonText,
                color: 'blue',
            }
        }
        if(props.num.item == 2){
            return {
                ...buttonText,
                color: '#006600',
            }
        }
        if(props.num.item == 3){
            return {
                ...buttonText,
                color: '#880000',
            }
        }
        if(props.num.item == 4){
            return {
                ...buttonText,
                color: '#775500',
            }
        }
        if(props.num.item == 5){
            return {
                ...buttonText,
                color: '#308D20',
            }
        }
        if(props.num.item == 6){
            return {
                ...buttonText,
                color: '#E8B020',
            }
        }
        if(props.num.item == 7){
            return {
                ...buttonText,
                color: '#BE0E8D',
            }
        }
        if(props.num.item == 8){
            return {
                ...buttonText,
                color: '#CC7F0C',
            }
        }
    }
    const ifPressed = () => {
        if(flag==-1 && props.endState == 2){
            //console.log('hello')
            if(props.num.item == 'M'){
                setReset(1)
                props.gameOver(0);
            }
            props.setBoard({column: props.num.index, row: props.row})
            setPressed(1)
            if(props.num.item == 0){
                setBlank(1)
            }
            else if(props.num.item != 0){
                //console.log('hello')
                props.playerCanSee({column: props.num.index, row: props.row, action: 'press'})
            }

        }
    }
    const ifLongPresses = () => {
        if(pressed == 0 && props.endState == 2){
            Vibration.vibrate(10)
            if(props.flagCount != 0 || flag==1){
                if(flag== -1){
                    props.playerCanSee({column: props.num.index, row: props.row, action: 'setFlag'})
                    props.flagNumber({column: props.num.index, row: props.row, todo: -1})
                }
                else{
                    props.playerCanSee({column: props.num.index, row: props.row, action: 'unsetFlag'})
                    props.flagNumber({column: props.num.index, row: props.row, todo: +1});
                }
                setFlag(flag*-1)
            }
            else{
                Alert.alert("No more flags to set")
            }
        }
    }
    const overlay = () => {
        //console.log('hello')
        if(props.blankStatus == 1){
            return (
                <Text style={buttonTextStyle()}>{props.num.item!=0?props.num.item:null}</Text>
            )
        }
        if(props.num.item == 0 && blank == 1){
            if(flag==1){
                //props.setFlagCount(props.flagCount+1);
            }
            props.blankRegress({column: props.num.index, row: props.row})
            return (
                <Text style={buttonTextStyle()}></Text>
            )
        }
        if(pressed == 1){
          
            if(props.num.item == 0){
                return (
                    null
                )
            }
            else if(props.num.item != 'M'){
                return (
                    <Text style={buttonTextStyle()}>{props.num.item}</Text>
                )
            }
            else{
                return (
                    <MaterialCommunityIcons name="mine" style={styles.bombIcon} />
                )
            }
        }
        else if(flag == 1 && props.flagStatus == 1){
            //console.log(props.flagStatus)
            return (
                <Entypo name="flag" style={styles.flagIcon} />

            )
        }
        else if(flag == 2){
            return (
                <WrongFlag />
            )
        }
        else{
            return (
                null
            )
        }
    }
    return( 
        <View>
            <TouchableOpacity
                style={buttonBackground()}
                onPress={()=>ifPressed()}
                onLongPress={() => ifLongPresses()}
                delayLongPress={props.flagDelay}
            >
                {overlay()}
            </TouchableOpacity>
        </View>
    )
});

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'black',
        width: 10,
        height: 10,
        //margin: 10,
        backgroundColor: '#777777'
    },
    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    flagIcon:{
        fontSize: 15,
        color: '#AA0000',
        alignSelf: "center",
        //marginTop: 5,
    },
    bombIcon:{
        fontSize: 19,
        color: 'black',
        alignSelf: "center",
        marginLeft: -1,
        //backgroundColor: 'red',
    }
})

export default MainButton
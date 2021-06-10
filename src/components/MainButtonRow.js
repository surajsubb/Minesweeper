// NOT BEING USED!!!
import React, { useState } from "react";
import { Text, StyleSheet, View, Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import MainButton from './MainButton'

const MainButtonRow = ({row, index, setBoard, blankStatus, blankRegress, flagDelay}) => {
    return( 
        <FlatList
            style={styles.row}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={index}
            keyExtractor={(item, index) => index}
            renderItem={(i) => {
                //console.log(blankStatus[i.index])
                return (
                    <MainButton 
                        key={blankStatus[i.index]}
                        row={row} 
                        num={i} 
                        setBoard={setBoard} 
                        blankRegress={blankRegress}
                        blankStatus={blankStatus[i.index]}
                        //restart={restart}
                        flagDelay={flagDelay}
                    />
                )}
            }
        >
        </FlatList>
        
    )
};

const styles = StyleSheet.create({
    row: {
        alignSelf: 'center',
        marginTop: -1,
        borderColor: 'black',
        borderLeftWidth: 1,

    }
})

export default MainButtonRow
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, Button, TouchableOpacity, FlatList, ScrollView } from "react-native";

import AIGrid from '../components/AIGrid'
import SettingsMenu from '../components/SettingsMenu'
const AIScreen = ({navigation}) => {
  const height = navigation.state.params.height
  const width = navigation.state.params.width
  const bombs = navigation.state.params.bombs
  const currFlagDelay = navigation.state.params.currFlagDelay
  const setCurrFlagDelay = navigation.state.params.setCurrFlagDelay


  const [uniqueVal, setUniqueVal] = useState(1)
  const [flagDelay, setFlagDelay] = useState(currFlagDelay)
  const [endState, setEndState] = useState(2)
  const [start, setStart] = useState(0)
  const restart = () => {
    setEndState(2)
    setStart(0)
    setUniqueVal(uniqueVal*(-1)) 
  }
  const gameOver = (end) => {
    setStart(0)
    if(end == 0){
      setEndState(0)
    }
    if(end == 1){
      setEndState(1)
    }
    //console.log('hello')
  }
  const onChangeFlagDelay = (num) => {
    setFlagDelay(num)
    setCurrFlagDelay(num)
  }
  return (
    <View style={styles.view} key={uniqueVal}>
      <View style={styles.topButtons}>
        <SettingsMenu 
          menuStyle={styles.menuStyle}
          flagDelay={flagDelay}
          setFlagDelay={setFlagDelay}
          onChangeFlagDelay={onChangeFlagDelay}
        />
        <TouchableOpacity
          style={styles.buttonRestart}
          onPress={() => restart() }
        >
          <Text style={styles.buttonRestartText}>{endState == 1?'New Game':'Restart'}</Text>
        </TouchableOpacity>
      </View>
      <AIGrid 
        key={uniqueVal} 
        height={height}
        width={width}
        bombs={bombs}
        flagDelay={flagDelay}
        gameOver={gameOver}
        endState={endState}
        start={start}
        setStart={setStart}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#555555',
    height: "100%",
    paddingTop: 70,
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'flex-end'
  },
  topButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuStyle:{
    flex: 1,
    marginLeft: 10,
  },
  buttonRestart:{
    // borderColor: 'black',
    // borderWidth: 1,
    flex: 1,
    //marginBottom: 20,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  buttonRestartText:{
    fontSize: 30,
    width: 170,
    color: '#bbb',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#333',
  }
});

export default AIScreen;
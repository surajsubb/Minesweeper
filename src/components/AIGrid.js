import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, StyleSheet, Image, View, Button, TouchableOpacity, FlatList, ScrollView, Pressable } from "react-native";
import Timer from './Timer'
import AIMainButton from './AIMainButton'
import WrongFlag from './WrongFlag'

const AI = require('../extra/AI')

const Grid = ({flagDelay, height, width, bombs, gameOver, endState, start, setStart }) => {
    
  const [time, setTime] = useState(0);
  const [Board, setboard] = useState(Array(width).fill(0).map(row => new Array(height).fill(0)))
  const [blank, setBlank] = useState(Array(width).fill(0).map(row => new Array(height).fill(0)))
  const [playerBoard, setPlayerBoard] = useState(Array(width).fill(0).map(row => new Array(height).fill(-1)))
  const [flagLocations, setFlagLocations] = useState(Array(width).fill(0).map(row => new Array(height).fill(0)))
  const [flagLocationList, setFlagLocationList] = useState([])
  const [flagCount, setFlagCount] = useState(bombs)
  const [uniqueVal, setUniqueVal] = useState(1)
  const [mineLocations, setMineLocations] = useState([])
  const [loading, setLoading] = useState(0)
  const [toPress, setToPress] = useState([])
  let board = Array(width).fill(0).map(row => new Array(height).fill(0))
  let playerBoardTemp = playerBoard
  let x,y
  var done = []
  var data=blank
  var flagRecurCount = []
  // var toPress = {
  //   row: 0,
  //   column: 0,
  //   flag: true,
  // }
  const isThere = (x, y, pressedRow, pressedCol) => {
    for(let i=0; i<done.length; i++){
      if(x == done[i].row && y == done[i].column){
        return true
      }
      else if(x == pressedCol && y == pressedRow){
        return true
      }
    }
    return false
  }
  const setBoard = (childData) => {
    if(time == 0){
      for(let i=0; i<bombs; i++){
        x = Math.floor(Math.random() * width)
        y = Math.floor(Math.random() * height)
        if(isThere(x, y, childData.column, childData.row)){
          i--;
        }
        else{
          done.push({row: x,column: y})
          if(x+1 < width && board[x+1][y]!='M')
            board[x+1][y]+=1;
          if(x-1 >= 0 && board[x-1][y]!='M')
            board[x-1][y]+=1;
          if(y+1 < height && board[x][y+1]!='M')
            board[x][y+1]+=1;
          if(y-1 >= 0 && board[x][y-1]!='M')
            board[x][y-1]+=1;
          if(x+1 < width && y+1 < height && board[x+1][y+1]!='M')
            board[x+1][y+1]+=1;
          if(x+1 < width && y-1 >= 0 && board[x+1][y-1]!='M')
            board[x+1][y-1]+=1;
          if(x-1 >= 0 && y+1 < height && board[x-1][y+1]!='M')
            board[x-1][y+1]+=1;
          if(x-1 >= 0 && y-1 >= 0 && board[x-1][y-1]!='M')
            board[x-1][y-1]+=1;
          
          board[x][y] = 'M'
          
        }
      }
      ReactDOM.unstable_batchedUpdates(() => {
        setboard(board)
        setMineLocations(done)
        setStart(1)
        setTime(1)
      })
      playerCanSee({
        column: childData.column, 
        row: childData.row, 
        action: 'first', 
        location: board[childData.row][childData.column]
      })
      //return true
    }
    //return false
  }
  const compare = ( a, b) => {
    //console.log(a)
    if(a.row > b.row){
      return 1
    }
    if(a.row == b.row){
      if(a.column > b.column){
        return 1
      }
      return -1;
    }
    return -1
  }
  const goodEnd = () => {
    let mines = mineLocations
    let flags = flagLocationList
    mines.sort(compare)
    flags.sort(compare)
    if(mines.length != flags.length){
      return false
    }
    for(let i=0; i<bombs; i++){
      if(mines[i].row != flags[i].row || mines[i].column != flags[i].column){
        return false
      }
    }
    return true
  }
  if(flagCount == 0){
    let ans = goodEnd()
    //console.log(ans)
    if(ans == true){
      setStart(0)
      gameOver(1)
    }
  }


  const removeElement = (childData, locations) => {
    let num = locations.findIndex(function (location){
      return location.row === childData.row && location.column === childData.column
    })
    if(num != -1){
      locations.splice(num,1)
    }
    return locations
  }
  const flagNumber = (childData) => {
    let num = flagLocations
    let locations = flagLocationList
    let count = childData.todo

    if(Array.isArray(childData.count)){
      let len = childData.count.length
      count=0;
      for(let i=0; i<len; i++){
        if(num[childData.count[i].row][childData.count[i].column] == 1){
          locations = removeElement({row: childData.count[i].row, column: childData.count[i].column}, locations)
          num[childData.count[i].row][childData.count[i].column] = 0
          count++
        }
      }
    }
    else{
      if(childData.todo == -1){
        locations.push({row: childData.row, column: childData.column})
        num[childData.row][childData.column] = 1
      }
      else{
        locations = removeElement({row: childData.row, column: childData.column},locations)
        num[childData.row][childData.column] = 0
        //console.log("hello")
      }
    }

    flagRecurCount = []
    ReactDOM.unstable_batchedUpdates(() =>{
      setFlagCount(prevCount => {
        return prevCount+count
      })
      setFlagLocationList(locations)
      setFlagLocations(num)
      //setUniqueVal(uniqueVal*(-1))
    })
  }
  const inBounds = (r,c) => {
    if( r >= 0 && r < width && c >= 0 && c < height){
      return true
    }
    return false
  }
  //console.log(flagLocationList)
  const blankRegress = (childData) => {
    blankregress({column: childData.column, row: childData.row})
    flagNumber({count: flagRecurCount, todo: flagRecurCount.length})
    setBlank(data)
    setPlayerBoard(playerBoardTemp)
    setToPress(AI.nextMoveToMake({playerBoard: playerBoard, minesLeft: flagCount}))
    //playerCanSee({data: data})
    setUniqueVal(uniqueVal*(-1))
  }

  const blankregress = (childData) => {
    let c = childData.column
    let r = childData.row

    data[r][c] = 1
    playerBoardTemp[r][c] = Board[r][c]
    if(flagLocations[r][c] == 1){
      flagRecurCount.push({column: c, row: r})
    }
    if(inBounds(r+1,c) && data[r+1][c] == 0){ //Down
      data[r+1][c]=1;
      playerBoardTemp[r+1][c] = Board[r+1][c]
      if(flagLocations[r+1][c] == 1){
        flagRecurCount.push({column: c, row: r+1})
      }
      if(Board[r+1][c] != 0 && Board[r+1][c] != 'M'){
        
      }
      else if(Board[r+1][c] == 0){
        blankregress({column: c, row: r+1});
      }
    }
    if(inBounds(r-1,c) && data[r-1][c] == 0){ //Up
      data[r-1][c]=1;
      playerBoardTemp[r-1][c] = Board[r-1][c]
      if(flagLocations[r-1][c] == 1){
        flagRecurCount.push({column: c, row: r-1})
      }
      if(Board[r-1][c] != 0 && Board[r-1][c] != 'M'){
        
      }
      else if(Board[r-1][c] == 0){
        blankregress({column: c, row: r-1});
      }
    }
    if(inBounds(r,c+1) && data[r][c+1] == 0){ //Right
      data[r][c+1]=1;
      playerBoardTemp[r][c+1] = Board[r][c+1]
      if(flagLocations[r][c+1] == 1){
        flagRecurCount.push({column: c+1, row: r})
      }
      if(Board[r][c+1] != 0 && Board[r][c+1] != 'M'){
      }
      else if(Board[r][c+1] == 0){
        blankRegress({column: c+1, row: r});
      }
    }
    if(inBounds(r,c-1) && data[r][c-1] == 0){ //Left
      data[r][c-1]=1;
      playerBoardTemp[r][c-1] = Board[r][c-1]
      if(flagLocations[r][c-1] == 1){
        flagRecurCount.push({column: c-1, row: r})
      }
      if(Board[r][c-1] != 0 && Board[r][c-1] != 'M'){
        
      }
      else if(Board[r][c-1] == 0){
        blankregress({column: c-1, row: r});
      }
    }
    if(inBounds(r+1,c+1) && data[r+1][c+1] == 0){ //Down Right
      data[r+1][c+1]=1;
      playerBoardTemp[r+1][c+1] = Board[r+1][c+1]
      if(flagLocations[r+1][c+1] == 1){
        flagRecurCount.push({column: c+1, row: r+1})
      }
      if(Board[r+1][c+1] != 0 && Board[r+1][c+1] != 'M'){

      }
      else if(Board[r+1][c+1] == 0){
        blankregress({column: c+1, row: r+1});
      }
    }
    if(inBounds(r+1,c-1) && data[r+1][c-1] == 0){ //Down Left
      data[r+1][c-1]=1;
      playerBoardTemp[r+1][c-1] = Board[r+1][c-1]
      if(flagLocations[r+1][c-1] == 1){
        flagRecurCount.push({column: c-1, row: r+1})
      }
      if(Board[r+1][c-1] != 0 && Board[r+1][c-1] != 'M'){
        
      }
      else if(Board[r+1][c-1] == 0){
        blankregress({column: c-1, row: r+1});
      }
    }
    if(inBounds(r-1,c+1) && data[r-1][c+1] == 0){ //Up Right
      data[r-1][c+1]=1;
      playerBoardTemp[r-1][c+1] = Board[r-1][c+1]
      if(flagLocations[r-1][c+1] == 1){
        flagRecurCount.push({column: c+1, row: r-1})
      }
      if(Board[r-1][c+1] != 0 && Board[r-1][c+1] != 'M'){
  
      }
      else if(Board[r-1][c+1] == 0){
        blankregress({column: c+1, row: r-1});
      }
    }
    if(inBounds(r-1,c-1) && data[r-1][c-1] == 0){ //Up Left
      data[r-1][c-1]=1;
      playerBoardTemp[r-1][c-1] = Board[r-1][c-1]
      if(flagLocations[r-1][c-1] == 1){
        flagRecurCount.push({column: c-1, row: r-1})
      }
      if(Board[r-1][c-1] != 0 && Board[r-1][c-1] != 'M'){
        
      }
      else if(Board[r-1][c-1] == 0){
        blankregress({column: c-1, row: r-1});
      }
    }
  }

  const playerCanSee = (childData) => {
    //let temp = playerBoard
    //console.log("hello")
    if(childData.action == 'first'){
      //console.log('hello')
      playerBoardTemp[childData.row][childData.column] = childData.location
      setPlayerBoard(playerBoardTemp)
    }
    if(childData.action == 'press'){
      //console.log('hello')
      playerBoardTemp[childData.row][childData.column] = Board[childData.row][childData.column]
      setPlayerBoard(playerBoardTemp)
    }
    else if(childData.action == 'setFlag'){
      playerBoardTemp[childData.row][childData.column] = 'F'
      setPlayerBoard(playerBoardTemp)
    }
    else if(childData.action == 'unsetFlag'){
      playerBoardTemp[childData.row][childData.column] = -1
      setPlayerBoard(playerBoardTemp)
    }
    let tempPress = AI.nextMoveToMake({playerBoard: playerBoard, minesLeft: flagCount})
    setToPress(tempPress)
    //console.log(toPress)
    //setUniqueVal(uniqueVal*(-1))
  }
  //console.log(toPress)

  var obj = []
  for(let i=0; i < width; i++){
    obj.push({board: Board[i], blank: blank[i], flag: flagLocations[i]}) 
  }

  var gridView = {
    height: width*25-width+6,
    paddingTop: 1,
    paddingLeft: 1,
    maxHeight: '70%',
    width: height*25-height+7,
    //marginTop: '50%',
    maxWidth: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    //flex: 1,
    //justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    overflow: 'hidden'
  }
  return (
    <View style={styles.view}>
      <View style={styles.info}>
        <View style={styles.mineInfo}>
          <MaterialCommunityIcons name="mine" style={styles.bombIcon} />
          <Text style={styles.buttonRestartText}>: {flagCount}</Text>
        </View>
        <Timer 
          increment={1}
          start={start}
          style={styles.mineInfo}
        />
      </View>
      <View style={styles.instructions}>
          <Text
            style={{
              fontSize: 18,
              color: '#BBB',
              paddingLeft: 30,
              borderLeftWidth: 25,
              marginBottom: 10,
              borderLeftColor: '#77AA77',
            }}
          >
            - SAFE
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#BBB',
              paddingLeft: 30,
              borderLeftWidth: 25,
              marginBottom: 10,
              borderLeftColor: '#AA7777',
            }}
          >
            - MINE
          </Text>
      </View>
      <View style={gridView}>
        <ScrollView
          horizontal
          style={styles.grid}
        >
          <FlatList
            data={obj}
            keyExtractor={(item, index) => index}
            renderItem={(Items) => { 
              return (
                <FlatList
                  style={styles.row}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={Items.item.board}
                  keyExtractor={(item, index) => index}
                  renderItem={(items) => {
                    return (
                        <AIMainButton 
                            key={Items.item.blank[items.index]}
                            row={Items.index} 
                            num={{index: items.index, item: items.item}} 
                            setBoard={setBoard} 
                            time={time}
                            blankRegress={blankRegress}
                            blankStatus={Items.item.blank[items.index]}
                            flagStatus={Items.item.flag[items.index]}
                            flagDelay={flagDelay}
                            flagCount={flagCount}
                            setFlagCount={setFlagCount}
                            flagNumber={flagNumber}
                            playerCanSee={playerCanSee}
                            toPress={toPress}
                            gameOver={gameOver}
                            endState={endState}
                        />
                    )}
                  }
                >
                </FlatList>
              )
            }}
          >
          </FlatList>
        </ScrollView>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#333',
    height: "100%",
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 10,
    
    //flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  gridView:{
    // height: "80%",
    // width: "80%",
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    overflow: 'hidden',
  },
  grid:{
    // borderColor: 'red',
    // borderWidth: 2,
    //marginBottom: 56,

  },
  info:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mineInfo:{
    flexDirection: 'row',
    width: 150,    
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#777777',
    justifyContent: 'center',
    margin: 20,

  },
  instructions:{
    alignItems: 'center'
  },
  buttonRestart:{
    // borderColor: 'black',
    // borderWidth: 1,
    marginBottom: 20,
  },
  buttonRestartText:{
    fontSize: 30,
  },
  bombIcon:{
    fontSize: 30,
    marginTop: 5,
    marginHorizontal: 5,
  },
  row: {
    alignSelf: 'center',
    marginTop: -1,
    borderColor: 'black',
    borderLeftWidth: 1,
  },
});

export default Grid;
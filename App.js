import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MainScreen from './src/screens/MainScreen';
import AIScreen from './src/screens/AIScreen';
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Main: MainScreen,
    AI: AIScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);

//TODO
//make bomb assignments after 1st touch DONE
//0 bombs recursion DONE
//Timer DONE
//Restart DONE
//number of bombs left DONE
//game end //need to end game without flags
//zooming
// keep flag delay the same
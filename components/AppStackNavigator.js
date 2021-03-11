import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import ReciverDetailScreen from '../screens/ReciverDetailScreen'
import BookDonateScreen from '../screens/BookDonateScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonatelist : {
        screen:BookDonateScreen,
        navigationOptions:{headerShown:false}
    
},
ReciverDetail : {
    screen:ReciverDetailScreen,
    navigationOptions:{headerShown:false}
},
},
{initialRouteName:'BookDonateList'}
)
import React from 'react';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SettingScreen from '../screens/SettingScreen'
import MyDonationScreen from '../screens/MyDonationScreen'
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},


setting:{screen:SettingScreen},
MyDontiom:{screen:MyDonationScreen},
Notification:{screen:NotificationScreen}
},
{contentComponent:CustomSideBarMenu},
{initialRouteName:'Home'}
)
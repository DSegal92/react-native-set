import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreenContainer from '../screens/HomeScreenContainer';

const HomeStack = createStackNavigator({
  Home: HomeScreenContainer,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
};

export default createBottomTabNavigator({
  HomeStack,
});

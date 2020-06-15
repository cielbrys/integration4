import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/home';
import StatsScreen from '../screens/stats/StatsScreen';
import PeopleScreen from '../screens/PeopleScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { StyleSheet, Image, View, ViewComponent } from 'react-native';
// const logo = require('../assets/images/home.svg');
import Mountain from '../assets/images/home.svg';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  return (
    <BottomTab.Navigator
      style={style.nav}
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: {
          backgroundColor: '#1D7874',
          paddingTop: 8,
          paddingBottom: 20
        },
        activeTintColor: '#91B7AC',
        inactiveTintColor: '#fff',
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-car" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-stats" />
          ),
        }}
      />
      <BottomTab.Screen
        name="People"
        component={PeopleScreen}
        options={{
          title: 'People',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-people" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    backgroundColor: 'black',
    display: 'none',
  },
});

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/home';
import StatsScreen from '../screens/stats/StatsScreen';
import PeopleScreen from '../screens/PeopleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Image } from 'react-native';
const logo = require('../assets/images/unplannedLogo.png');

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerStyle: { height: 120 },
    headerTitle: <Image source={logo} />,
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
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

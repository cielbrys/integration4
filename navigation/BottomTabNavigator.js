import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import PeopleScreen from '../screens/PeopleScreen';
import GalleryScreen from '../screens/GalleryScreen';
import { Image } from 'react-native';
const logo = require('../assets/images/unplannedLogo.png');

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerStyle: { height: 120},
    headerTitle: (<Image source={logo}/>),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-car" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          title: 'Locations',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-locate" />
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
        name="Gallery"
        component={GalleryScreen}
        options={{
          title: 'Gallery',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-photos" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}


import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Detail from './Detail';
import NewTripWarning from '../trip/NewTripWarning';
import NewTripChoice from '../trip/NewTripChoice';
import Overview from './Overview';
import Tips from './Tips';
import { createStackNavigator } from '@react-navigation/stack';
import TripView from '../trip/TripView';
import LocationsScreen from '../locations/LocationsScreen';
import SettingsScreen from '../settings/SettingsScreen';
import PeopleScreen from '../people/PeopleScreen';
import Start from '../auth/Start';
import TutorialScreen from '../tutorial/TutorialScreen';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Overview} />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="NewTripWarning" component={NewTripWarning} />
      <Stack.Screen name="NewTripChoice" component={NewTripChoice} />
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen name="TripView" component={TripView} />
      <Stack.Screen name="Locations" component={LocationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="People" component={PeopleScreen} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    backgroundColor: 'black',
  },
});

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewTrip from './NewTrip';
import NewTrip from './TripView';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewTrip" component={NewTrip} />
      <Stack.Screen name="TripView" component={TripView} />
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

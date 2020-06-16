import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewTripChoice from './NewTripChoice';
import NewTripWarning from './NewTripWarning';
import TripView from './TripView';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewTripWarning" component={NewTripWarning} />
      <Stack.Screen name="NewTripChoice" component={NewTripChoice} />
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

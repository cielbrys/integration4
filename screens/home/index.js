import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Detail from './Detail';
import NewTrip from '../trip/NewTrip';
import Overview from './Overview';
import Tips from './Tips';
import { createStackNavigator } from '@react-navigation/stack';
import TripView from '../trip/TripView';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Overview} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="NewTrip" component={NewTrip} />
      <Stack.Screen name="Tips" component={Tips} />
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
    backgroundColor: 'black'
  }
});

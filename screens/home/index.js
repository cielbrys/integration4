import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Detail from './Detail';
import NewTrip from './NewTrip';
import Overview from './Overview';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Overview} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="NewTrip" component={NewTrip} />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

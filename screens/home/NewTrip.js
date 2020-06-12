import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';


export default () => {
  return useObserver(() => {
    return <Text>NewTrip</Text>;
  });
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

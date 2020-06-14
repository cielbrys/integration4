import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useObserver } from 'mobx-react-lite';

export default () => {
  return useObserver(() => {
    return <Text>Tips and tricks</Text>;
  });
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

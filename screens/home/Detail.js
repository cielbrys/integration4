import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useObserver } from 'mobx-react-lite';

export default ({ route }) => {
  const { name } = route.params;
  return useObserver(() => {
    return <Text>{name}</Text>;
  });
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

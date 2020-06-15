import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';

export default ({ route }) => {
  const { id } = route.params;
  const {tripStore} = useStore()
  const trip = tripStore.resolveTrip(id)
  return useObserver(() => {
    return (
      <>
        <Text>Name: {trip.name}</Text>
        <Text>{trip.distance}km</Text>
        <Text>{trip.duration}h.</Text>
      </>
    );
  });
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

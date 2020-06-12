import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

export default function LocationsScreen() {
  const { tripStore, uiStore, locationStore } = useStore();

  return useObserver(() => (
    <SafeAreaView style={styles.container}>
      <Text>Your stats</Text>
      <Text>Distance done</Text>
      <Text>{tripStore.distanceDone}</Text>
      <Text>Trips done</Text>
      <Text>{tripStore.trips.length}</Text>
      <Text>Hours done</Text>
      <Text>{tripStore.timeDone}</Text>
      <Text>People met</Text>
      <Text>{uiStore.currentUser.users.length}</Text>
      <Text>Locations pinned</Text>
      <Text>{locationStore.locations.length}</Text>
    </SafeAreaView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

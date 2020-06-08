import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const logo = require('../assets/images/unplannedLogo.png');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>My recent trips</Text>
      <Text>You have no trips atm</Text>
      <TouchableOpacity>
        <Text>Start a new trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img: {
    width: 100,
    height: 100,
  },
});

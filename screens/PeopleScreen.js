import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../hooks/useStore';

export default function PeopleScreen() {
  const { uiStore } = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <Text>People you have met</Text>
      {uiStore.currentUser.users.length === 0 ? (
        <Text>No friends met yet... </Text>
      ) : (
        <Text>Friends </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

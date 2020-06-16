import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import TripModel from '../../models/TripModel';

export default ({ navigation }) => {
  const [read, setRead] = useState(false);

  const goToTripView = () => {
    navigation.navigate('home', {
      screen: 'TripView',
    });
  };

  return useObserver(() => (
    <>
      <Text>
        Using your phone while driving is illegal! We advize you to mount your
        phone.
      </Text>
      <TouchableOpacity onPress={() => setRead(true)}>
        <Text> I have read</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={read !== false ? false : true}
        onPress={() => goToTripView()}
      >
        <Text> Start Trip</Text>
      </TouchableOpacity>
    </>
  ));
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

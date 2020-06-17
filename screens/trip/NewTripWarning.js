import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import TripModel from '../../models/TripModel';
import Locations from '../../constants/Locations';

export default ({ navigation }) => {
  const [read, setRead] = useState(false);
  let endLocation = {};
  const { uiStore } = useStore();

  const getLocation = () => {
    let filteredLocations = [];
    Locations.forEach((location) => {
      if (location.category === uiStore.tripFeeling) {
        filteredLocations.push(location);
      }
    });
    const locationNumber = Math.floor(Math.random() * filteredLocations.length);
    console.log(locationNumber);
    console.log(filteredLocations[locationNumber]);
    endLocation = filteredLocations[locationNumber];
  };

  const goToTripView = () => {
    getLocation();
    console.log('endloca', endLocation);
    if (endLocation !== {}) {
      navigation.navigate('home', {
        screen: 'TripView',
        params: {
          endLocationLat: endLocation.latitude,
          endLocationLng: endLocation.longitude,
        },
      });
    }
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

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import TopTitle from '../../assets/images/locations.svg';
import Back from '../../assets/images/back.svg';
import Boom from '../../assets/images/boom.svg';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';

import { MARGINS } from '../../constants/CssConst';
import Location from '../../components/locations/Location';
import NoLocations from '../../components/locations/NoLocations';

export default function LocationsScreen({ navigation }) {
  const { locationStore, uiStore } = useStore();

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Home',
    });
  };

  const startNewTrip = () => {
    navigation.navigate('NewTripChoice');
  };

  if (uiStore.currentUser) {
    return useObserver(() => (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TitleBackground style={styles.top} />
            <TopTitle style={styles.topTitle} />
          </View>
          <TouchableOpacity style={styles.back} onPress={() => goHome()}>
            <Back />
          </TouchableOpacity>
          {locationStore.locations.length !== 0 ? (
            <ScrollView
              style={styles.locations}
              showsVerticalScrollIndicator={false}
            >
              {locationStore.locations.map((location) => (
                <Location location={location} key={location.id} />
              ))}
            </ScrollView>
          ) : (
            <NoLocations onPress={startNewTrip} />
          )}
          <Boom style={styles.bottom} />
        </View>
      </View>
    ));
  } else {
    navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  topTitle: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 60,
  },
  container: {
    backgroundColor: 'white',
  },

  main: {
    backgroundColor: 'white',
  },
  top: {
    zIndex: -20,
    position: 'absolute',
    paddingTop: 50,
  },
  back: {
    marginLeft: MARGINS.defaultValue,
    marginTop: 60,
  },
  bottom: {
    zIndex: -20,
    position: 'absolute',
    top: 120,
  },
});

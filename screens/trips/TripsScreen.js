import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import TopTitle from '../../assets/images/trips.svg';
import Back from '../../assets/images/back.svg';
import Front from '../../assets/images/front.svg';
import Background from '../../assets/images/bg.svg';
import { useHistory } from 'react-router-dom';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';
import RectentTrip from '../../components/tripsrender/RecentTrip';
import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';
import Trip from '../../components/tripsrender/Trip';

const screenWidth = Math.round(Dimensions.get('window').width) / 2.5;
export default function TripsScreen({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();

  const trips = tripStore.trips;

  const tripsDisplayed = trips.slice(0, trips.length - 1);

  let latestTrip = trips[trips.length - 1];

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

  const goToDetail = (item) => {
    navigation.navigate('home', {
      screen: 'Detail',
      params: {
        id: item.id,
      },
    });
  };


  return useObserver(() => (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <TitleBackground style={styles.top} />
          <TopTitle style={styles.topTitle} />
        </View>
        <TouchableOpacity style={styles.back} onPress={() => goHome()}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.first}>Latest trip</Text>
        <Front style={styles.front} />
        <RectentTrip trip={latestTrip} onPress={() => goToDetail(latestTrip)} />
        <Text style={styles.second}>All past trips</Text>
        <View style={styles.all}>
          {tripsDisplayed.map((trip) => (
            <Trip key={trip.id} trip={trip} onPress={() => goToDetail(trip)} />
          ))}
        </View>
        <Background style={styles.bg} />
      </View>
    </ScrollView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'rgb(103,146,137)',
  },
  header: {
    flex: 1,
    paddingTop: 20,
  },
  topTitle: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 80,
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
    marginTop: 40,
  },
  first: {
    marginTop: 80,
    marginLeft: MARGINS.defaultValue,
    fontSize: 22,
    fontWeight: '700',
  },
  second: {
    marginTop: 40,
    marginLeft: MARGINS.defaultValue,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  front: {
    position: 'absolute',
    right: -100,
    top: 137,
    zIndex: 100,
  },
  bg: {
    position: 'absolute',
    right: -175,
    top: 205,
    zIndex: -100,
  },
  all: {
    zIndex: 300,
    paddingLeft: MARGINS.defaultValue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
    backgroundColor: 'rgb(103,146,137)',
  },
  name: {
    fontSize: FONTSIZES.small,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 64,
    marginTop: 16,
  },
  text: {
    marginLeft: 8,
  },
});

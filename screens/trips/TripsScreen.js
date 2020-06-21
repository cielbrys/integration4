import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import FlipToggle from 'react-native-flip-toggle-button';
import { set, $mobx } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import Top from '../../assets/images/statsTop.svg';
import TopTitle from '../../assets/images/trips.svg';
import Back from '../../assets/images/back.svg';
import Bottom from '../../assets/images/statsBottom.svg';
import Save from '../../assets/images/save.svg';
import Pijl from '../../assets/images/arrowBig.svg';
import Location from '../../assets/images/locationBig.svg';
import Timer from '../../assets/images/timerBig.svg';
import Pinned from '../../assets/images/pinned.svg';
import Front from '../../assets/images/front.svg';
import Background from '../../assets/images/bg.svg';
import LocationSmall from '../../assets/images/locationYellow.svg';
import TimerSmall from '../../assets/images/timerYellow.svg';
import { useHistory } from 'react-router-dom';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';


const screenWidth = Math.round(Dimensions.get('window').width) / 2.5;
export default function TripsScreen({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();
  const history = useHistory();

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

  const locations = locationStore.getLocationsForTrip(latestTrip.id);

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
        <TouchableOpacity
          style={styles.latest}
          onPress={() => goToDetail(latestTrip)}
        >
          <View style={styles.latestTop}>
            <Text style={styles.latestName}>{latestTrip.name}</Text>
            <Pijl />
          </View>
          <View style={styles.latestMid}>
            <View style={styles.latestStat}>
              <Timer />
              <Text style={styles.lastestText}>{latestTrip.duration}h</Text>
            </View>
            <View style={styles.latestStat}>
              <Pinned />
              <Text style={styles.lastestText}>{locations.length}</Text>
            </View>
          </View>
          <View style={styles.latestStat}>
            <Location />
            <Text style={styles.lastestText}>
              {latestTrip.distance} {uiStore.currentUser.system}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.second}>All past trips</Text>
        <View style={styles.all}>
          {tripsDisplayed.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.trip}
              onPress={() => goToDetail(trip)}
            >
              <View style={styles.latestTop}>
                <Text style={styles.name}>{trip.name}</Text>

                <Pijl />
              </View>
              <View style={styles.stat}>
                <TimerSmall />
                <Text style={styles.text}>{trip.duration}h</Text>
              </View>
              <View style={styles.stat}>
                <LocationSmall />
                <Text style={styles.text}>
                  {trip.distance} {uiStore.currentUser.system}
                </Text>
              </View>
            </TouchableOpacity>
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
    right: 24,
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
    marginLeft: 24,
    marginTop: 40,
  },
  latest: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    backgroundColor: 'rgb(240,244,243)',
    padding: 16,
    zIndex: -20,
    borderRadius: 10,
  },
  latestTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  first: {
    marginTop: 80,
    marginLeft: 24,
    fontSize: 22,
    fontWeight: '700',
  },
  second: {
    marginTop: 40,
    marginLeft: 24,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  latestName: {
    fontSize: 24,
    fontWeight: '700',
  },
  latestMid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  latestStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 64,
    marginTop: 16,
  },
  lastestText: {
    marginLeft: 16,
    fontSize: 18,
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
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    flexWrap: 'wrap',
    backgroundColor: 'rgb(103,146,137)',
  },
  trip: {
    backgroundColor: 'rgb(240,244,243)',
    borderRadius: 10,
    padding: 12,
    marginRight: 24,
    marginBottom: 32,
    width: screenWidth,
  },
  name: {
    fontSize: 16,
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

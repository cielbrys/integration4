import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';

import { ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

import Mountain from '../../assets/images/home.svg';
import Rood from '../../assets/images/rood.svg';
import CurrentTrip from '../../assets/images/currentTrip.svg';
import Groen from '../../assets/images/groen.svg';
import Timer from '../../assets/images/timerYellow';
import Location from '../../assets/images/locationYellow';
import Pijl from '../../assets/images/arrow.svg';
import TutorialButton from '../../assets/images/tutorialButton.svg';

export default function HomeScreen({ navigation }) {
  const { tripStore, uiStore } = useStore();
  let lastTrips;
  const begin = tripStore.trips.length - 5;
  const end = tripStore.trips.length;
  const trips = tripStore.trips;
  if (trips.length >= 5) {
    lastTrips = trips.slice(begin, end);
  } else {
    lastTrips = trips;
  }

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goToDetail = (item) => {
    navigation.navigate('home', {
      screen: 'Detail',
      params: {
        id: item.id,
      },
    });
  };

  const goToTips = () => {
    navigation.navigate('home', {
      screen: 'Tips',
    });
  };

  const startNewTrip = () => {
    navigation.navigate('NewTripChoice');
  };

  const goToTrips = () => {
    navigation.navigate('TripsScreen');
  };

  const goToCurrentTrip = () => {
    navigation.navigate('TripView');
  };

  const goToTutorial = () => {
    navigation.navigate('TutorialScreen');
  };

  if (uiStore.currentUser) {
    return useObserver(() => (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Mountain style={styles.mtn} />

        {uiStore.currentTrip === false ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => startNewTrip()}
            >
              <Rood>
                <Text>Start a new trip</Text>
              </Rood>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToCurrentTrip()}
            >
              <CurrentTrip>
                <Text>GoToTrip</Text>
              </CurrentTrip>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.logout} onPress={goToTutorial}>
          {/* <Text style={styles.logoutText}>Sign Out</Text> */}
          <TutorialButton />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => goToTips()}>
          <Groen>
            {' '}
            <Text>Tips 'n tricks</Text>
          </Groen>
        </TouchableOpacity>
        <Text style={styles.recent}>
          {uiStore.currentUser.name}'s recent trips
        </Text>
        {trips.length !== 0 ? (
          <ScrollView
            style={styles.list}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {lastTrips.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => goToDetail(item)}>
                <View style={styles.trip}>
                  <View style={styles.title}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Pijl />
                  </View>
                  <View style={styles.stat}>
                    <Timer />
                    <Text style={styles.tekst}>{item.duration}h.</Text>
                  </View>
                  <View style={styles.stat}>
                    <Location />
                    <Text style={styles.tekst}>
                      {uiStore.currentUser.system === 'mile'
                        ? (Number(item.distance) * 0.62137).toFixed(1)
                        : item.distance}
                      {uiStore.currentUser.system}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={goToTrips}>
              <View style={styles.trip}>
                <View style={styles.allRecent}>
                  <Text style={styles.tekstSpecial}>
                    See all my recent trips
                  </Text>
                  <Pijl />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <TouchableOpacity onPress={() => startNewTrip()}>
            <View style={styles.tripLast}>
              <Text style={styles.tripLastText}>
                No recent trips! {'\n'} Start a new trip now!
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    ));
  } else {
    navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 60,
  },
  logoutText: {
    fontSize: FONTSIZES.small,
  },
  tekstSpecial: {
    color: 'black',
    fontSize: FONTSIZES.small,
    marginBottom: 15,
  },
  allRecent: {
    marginTop: 16,
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  trip: {
    backgroundColor: 'rgb(240,244,243)',
    marginRight: 16,
    width: 170,
    height: 120,
    borderRadius: 10,
  },

  tripLast: {
    backgroundColor: 'rgb(240,244,243)',
    marginRight: 16,
    width: 170,
    height: 120,
    borderRadius: 10,
    marginLeft: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tripLastText: {
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  button: {
    alignSelf: 'center',
    marginTop: -10,
    marginRight: MARGINS.defaultValue,
    marginLeft: MARGINS.defaultValue,
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  mtn: {
    marginTop: 60,
    alignSelf: 'center',
  },
  recent: {
    marginLeft: MARGINS.defaultValue,
    marginBottom: 16,
    marginTop: 32,
    fontSize: 20,
  },
  list: {
    marginLeft: MARGINS.defaultValue,
    flex: 2,
    flexDirection: 'row',
    marginBottom: 40,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 16,
    color: 'rgb(21,72,69)',
    fontSize: 20,
  },
  name: {
    paddingLeft: 16,
    paddingTop: 8,
    marginBottom: 16,
    fontSize: FONTSIZES.small,
  },
  tekst: {
    color: 'rgb(21,72,69)',
    marginLeft: 16,
    fontSize: FONTSIZES.small,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    marginTop: 8,
  },
});

//

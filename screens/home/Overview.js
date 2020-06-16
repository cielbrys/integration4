import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

import Mountain from '../../assets/images/home.svg';
import Rood from '../../assets/images/rood.svg';
import Groen from '../../assets/images/groen.svg';
import Timer from '../../assets/images/timerYellow';
import Location from '../../assets/images/locationYellow';
import Pijl from '../../assets/images/arrow.svg';

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

  return useObserver(() => (
    <ScrollView style={styles.container}>
      <Mountain style={styles.mtn} />
      <TouchableOpacity style={styles.button} onPress={() => startNewTrip()}>
        <Rood>
          <Text>Start a new trip</Text>
        </Rood>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={() => uiStore.logout()}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
      {uiStore.currentUser.status === 'beginner' ? (
        <TouchableOpacity style={styles.button} onPress={() => goToTips()}>
          <Groen>
            {' '}
            <Text>Tips 'n tricks</Text>
          </Groen>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text style={styles.recent}>
        {uiStore.currentUser.name}'s' recent trips
      </Text>
      {trips.length !== 0 ? (
        <ScrollView style={styles.list} horizontal={true}>
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
                    {item.distance}
                    {uiStore.currentUser.system}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={startNewTrip}>
            <View style={styles.trip}>
              <View style={styles.allRecent}>
                <Text style={styles.tekstSpecial}>See all my recent trips</Text>
                <Pijl />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text>You have no trips atm</Text>
      )}
    </ScrollView>
  ));
}

const styles = StyleSheet.create({
  logout: {
    position: 'absolute',
    right: 24,
    top: 60,
  },
  logoutText: {
    fontSize: 16,
  },
  tekstSpecial: {
    color: 'black',

    fontSize: 16,
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
  button: {
    alignSelf: 'center',
    marginTop: -10,
    marginRight: 24,
    marginLeft: 24,
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
    marginLeft: 24,
    marginBottom: 16,
    marginTop: 32,
    fontSize: 20,
  },
  list: {
    marginLeft: 24,
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
    fontSize: 16,
  },
  tekst: {
    color: 'rgb(21,72,69)',
    marginLeft: 16,
    fontSize: 16,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    marginTop: 8,
  },
});

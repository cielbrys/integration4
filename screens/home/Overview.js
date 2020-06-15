import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
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
  const trips = tripStore.trips;

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
    navigation.navigate('home', {
      screen: 'NewTrip',
    });
  };

  return useObserver(() => (
    <SafeAreaView style={styles.container}>
      <Mountain  style={styles.mtn} />
      <TouchableOpacity style={styles.button} onPress={() => startNewTrip()}>
        <Rood>
          <Text>Start a new trip</Text>
        </Rood>
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
          {trips.map((item) => (
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
                  <Text style={styles.tekst}>{item.distance}km</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>You have no trips atm</Text>
      )}
    </SafeAreaView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
  },
  trip: {
    backgroundColor: 'rgb(240,244,243)',
    marginRight: 16,
    width: 170,
    height: 120,
  },
  button: {
    alignSelf: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  mtn: {
    marginTop: 5,
    alignSelf: 'center',
  },
  recent: {
    marginLeft: 24,
    marginBottom:16,
    marginTop:32,
    fontSize: 20,

  },
  list: {
    marginLeft: 24,
    flex: 2,
    flexDirection: 'row',
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
    fontSize: 16
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    marginTop: 8,
  },
});

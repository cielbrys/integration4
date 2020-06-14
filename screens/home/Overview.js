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

const logo = require('../../assets/images/unplannedLogo.png');

export default function HomeScreen({ navigation }) {
  const { tripStore, uiStore } = useStore();
  const trips = tripStore.trips;

  navigation.setOptions({
    headerStyle: { height: 120 },
    headerTitle: <Image source={logo} />,
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => goToDetail(item)}>
        <View style={styles.trip}>
          <Text>{item.name}</Text>
          <Text>{item.duration}h.</Text>
          <Text>{item.distance}km</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSepuratot = () => {
    return <View style={styles.border} />;
  };

  return useObserver(() => (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => startNewTrip()}>
        <Text>Start a new trip</Text>
      </TouchableOpacity>
      {uiStore.currentUser.status === 'beginner' ? (
        <TouchableOpacity onPress={() => goToTips()}>
          <Text>Go to tips and tricks</Text>
        </TouchableOpacity>
      ) : (
        ''
      )}
      <Text>{uiStore.currentUser.name}'s' recent trips</Text>
      {trips.length !== 0 ? (
        <FlatList
          data={trips}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSepuratot}
        />
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
  },
  img: {
    width: 100,
    height: 100,
  },
  trip: {
    backgroundColor: '#5555',
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
  },
});

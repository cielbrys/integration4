import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Linking,
  Button,
} from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ route }) => {
  const { id } = route.params;
  const { tripStore, uiStore, locationStore } = useStore();
  const trip = tripStore.resolveTrip(id);
  const locations = locationStore.getLocationsForTrip(trip.id);
  console.log(locations);
  const handlePress = async (cords) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${cords.latitude},${cords.longitude}`;
    const url = Platform.select({
      ios: `${scheme}@${latLng}`,
      android: `${scheme}${latLng}`,
    });
    Linking.openURL(url);
  };

  return useObserver(() => (
    <View>
      <Text>Name: {trip.name}</Text>
      <Text>
        {trip.distance}
        {uiStore.currentUser.system}
      </Text>
      <Text>{trip.duration}h.</Text>
      {locations.map((location) => (
        <TouchableOpacity
          key={location.id}
          onPress={() => handlePress(location.cords)}
        >
          <Text>{location.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ));
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

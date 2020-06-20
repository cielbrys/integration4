import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Linking,
  Button,
  ScrollView
} from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Back from '../../assets/images/back.svg';
import Background from '../../assets/images/tripDetail/Background.svg';
import Location from '../../assets/images/tripDetail/Location.svg';
import Pinner from '../../assets/images/tripDetail/Pinner.svg';
import Time from '../../assets/images/tripDetail/Time.svg';
import Title from '../../assets/images/tripDetail/Title.svg';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';
import Map from '../../assets/images/map.svg';
import Jeet from '../../assets/images/jeet.svg';

export default ({ navigation, route }) => {
  const { id } = route.params;
  const { tripStore, uiStore, locationStore } = useStore();
  const trip = tripStore.resolveTrip(id);
  const locations = locationStore.getLocationsForTrip(trip.id);

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

  const onDelete = async () => {
    await tripStore.deleteTrip(trip);
    navigation.navigate('Home');
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.navigate("Home"); 
  };


  return useObserver(() => (
    <ScrollView style={style.container}>

      <View>
        <Title style={style.topTitle} />
        <TitleBackground style={style.topTitleBackground} />
        <Background style={style.topBackground} />
      </View>

      <TouchableOpacity style={style.backButton} onPress={goHome}>
        <Back />
      </TouchableOpacity>

      <Text style={style.tripName}>{trip.name}</Text>

      <View style={style.statsContainer}>
        <View style={{flex:1, alignItems: 'center'}}>
          <Location />
          <Text style={{fontSize: 36, marginTop: 12}}>
            {uiStore.currentUser.system === 'mile'
              ? (Number(trip.distance) * 0.62137).toFixed(1)
              : trip.distance}
          </Text>
          <Text style={{textAlign: 'center'}}>
            {uiStore.currentUser.system} {"\n"}traveled
          </Text>
        </View>

        <View style={{flex:1, alignItems: 'center'}}>
          <Time />
          <Text style={{fontSize: 36, marginTop: 12}}>{trip.duration}</Text>
          <Text style={{textAlign: 'center'}}>Hours {"\n"}traveled</Text>
        </View>
      </View>

      <View style={{marginRight: 24, marginLeft: 24, marginTop: 100}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Pinner />
          <Text style={{marginLeft: 10, fontSize: 18, color: 'white'}}>Your pinned locations during this trip</Text>
        </View>

        <View style={{marginTop: 20}}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              onPress={() => handlePress(location.cords)}
              style={{
                backgroundColor: 'rgb(240,244,243)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 10,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <View style={{justifyContent: 'space-between'}}>
                <Text style={{color: 'rgb(29,120,116)', fontSize: 18}}>{location.name}</Text>
                <Text style={{color: 'rgb(194,194,194)', marginBottom: 24}}>{location.cords.latitude}, {location.cords.longitude}</Text>
                <Jeet />
              </View>
              <Map />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    
      <TouchableOpacity style={{backgroundColor: '#FF0000', marginRight: 24, marginLeft: 24, marginTop: 60, marginBottom: 60}} onPress={() => onDelete()}>
        <Text style={{paddingTop: 13, paddingBottom: 13, textAlign: 'center', fontSize: 18, color: 'white'}}>Delete this trip</Text>
      </TouchableOpacity>

    </ScrollView>
  ));
};


const style = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    flex:1
  },
  topTitle: {
    position: 'absolute', 
    zIndex: 999, 
    right: 24, 
    top: 76
  },
  topBackground: {
    position: 'absolute', 
    top: 240
  },
  topTitleBackground: {
    position: 'absolute', 
    top: 0
  },
  backButton: {
    marginTop: 60, 
    marginLeft: 24
  },
  tripName: {
    fontSize: 24, 
    fontWeight: '700', 
    marginTop: 80, 
    marginRight: 24, 
    marginLeft: 24
  },
  statsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginRight: 60, 
    marginLeft: 60, 
    marginTop: 80
  },
});

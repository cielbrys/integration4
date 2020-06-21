import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView
} from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';

import Dialog from 'react-native-dialog';
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

  const [popUpSave, setPopUpSave] = useState(false);

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
        <View style={style.statsGeneral}>
          <Location />
          <Text style={style.statsTextGeneral}>
            {uiStore.currentUser.system === 'mile'
              ? (Number(trip.distance) * 0.62137).toFixed(1)
              : trip.distance}
          </Text>
          <Text style={style.statsTextBottom}>
            {uiStore.currentUser.system} {"\n"}traveled
          </Text>
        </View>

        <View style={style.statsGeneral}>
          <Time />
          <Text style={style.statsTextGeneral}>{trip.duration}</Text>
          <Text style={style.statsTextBottom}>Hours {"\n"}traveled</Text>
        </View>
      </View>

      <View style={style.pinnedLocationsContainer}>
        <View style={style.pinnedLocationsTop}>
          <Pinner />
          <Text style={style.pinnedLocationContainerText}>Your pinned locations during this trip</Text>
        </View>

        <View style={{marginTop: 20}}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              onPress={() => handlePress(location.cords)}
              style={style.pinnedLocationGoTo}
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
    
      <TouchableOpacity style={style.deleteButton} onPress={() => setPopUpSave(true)}>
        <Text style={style.deleteButtonText}>Delete this trip</Text>
      </TouchableOpacity>

          <Dialog.Container visible={popUpSave}>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Button
              color={'gray'}
              label="Cancel"
              onPress={() => setPopUpSave(false)}
            />
            <Dialog.Button
              bold={true}
              label="Delete"
              onPress={() => onDelete()}
            />
          </Dialog.Container>

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
    right: MARGINS.defaultValue, 
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
    marginLeft: MARGINS.defaultValue
  },
  tripName: {
    fontSize: 24, 
    fontWeight: '700', 
    marginTop: 80, 
    marginRight: MARGINS.defaultValue, 
    marginLeft: MARGINS.defaultValue
  },
  statsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginRight: 60, 
    marginLeft: 60, 
    marginTop: 80
  },
  statsGeneral:{
    flex:1,
    alignItems: 'center'
  },
  statsTextGeneral: {
    fontSize: 36, 
    marginTop: 12
  },
  statsTextBottom: {
    textAlign: 'center'
  },
  pinnedLocationsContainer: {
    marginRight: MARGINS.defaultValue, 
    marginLeft: MARGINS.defaultValue, 
    marginTop: 100
  },
  pinnedLocationsTop: {
    flexDirection: 'row', 
    alignItems: 'flex-end'
  },
  pinnedLocationContainerText: {
    marginLeft: 10, 
    fontSize: FONTSIZES.default, 
    color: 'white'
  },

  pinnedLocationGoTo: {
    backgroundColor: 'rgb(240,244,243)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000', 
    marginRight: MARGINS.defaultValue, 
    marginLeft: MARGINS.defaultValue, 
    marginTop: 60, 
    marginBottom: 60
  },
  deleteButtonText:{
    paddingTop: MARGINS.buttonPadding, 
    paddingBottom: MARGINS.buttonPadding, 
    textAlign: 'center', 
    fontSize: FONTSIZES.default, 
    color: 'white'
  }
});

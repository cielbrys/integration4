import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import TopTitle from '../../assets/images/locations.svg';
import Back from '../../assets/images/back.svg';
import Boom from '../../assets/images/boom.svg';
import Map from '../../assets/images/map.svg';
import Jeet from '../../assets/images/jeet.svg';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';

import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';

export default function LocationsScreen({ navigation }) {
  const { locationStore } = useStore();

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

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

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Home',
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
        <ScrollView style={styles.locations}>
          {locationStore.locations.map((location) => (
            <TouchableOpacity style={styles.location} key={location.id} onPress={() => handlePress(location.cords)}>
              <View style={styles.text}>
                <Text style={styles.name}>{location.name}</Text>
                <Text style={styles.loc}>
                  {location.cords.latitude}, {location.cords.longitude}
                </Text>
                {console.log(location.tripId)}
                <Jeet
                  style={styles.view}
                  
                ></Jeet>
              </View>
              <Map />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Boom style={styles.bottom} />
      </View>
    </ScrollView>
  ));
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
  locations: {
    marginTop: 100,
    height: '100%',
  },
  location: {
    backgroundColor: 'rgb(240,244,243)',
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    color: 'rgb(29,120,116)',
    fontSize: FONTSIZES.default,
  },
  loc: {
    color: 'rgb(194,194,194)',
    marginBottom: MARGINS.defaultValue,
  },
  text: {
    justifyContent: 'space-between',
  },
});

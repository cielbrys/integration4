import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useObserver } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';
import { useStore } from '../../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TripModel from '../../models/TripModel';
import haversine from 'haversine';
import LocationModel from '../../models/LocationModel';
import Dialog from 'react-native-dialog';
import endLocations from '../../constants/Locations';
let pins = [];

export default function TripView({ navigation, route }) {
  const { endLocationLng, endLocationLat } = route.params;
  const { tripStore, uiStore, locationStore } = useStore();
  const [heading, setHeading] = useState(0);
  const [degree, setDegree] = useState(0);
  const [name, setName] = useState(`Trip #${tripStore.trips.length + 1}`);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState();
  const [popUpSave, setPopUpSave] = useState(false);
  const [popUpPin, setPopUpPin] = useState(false);

  const [pinName, setPinName] = useState(
    `Location #${locationStore.locations.length + 1}`
  );

  navigation.setOptions({ headerTitle: name });

  let pervLatLng = {};
  useEffect(() => {
    const config = async () => {
      let res = await Location.requestPermissionsAsync();
      if (res.status !== 'granted') {
        setErrorMsg['Pleas allow Location for this app'];
        console.log('Permission to access location was denied');
      } else {
        startLocationTracking();
        setStartTime(new Date());
        Location.watchHeadingAsync((obj) => {
          let heading = obj.magHeading;
          setHeading(heading);
        });
      }
    };

    config();
  }, []);

  let p2 = {
    latitude: endLocationLat,
    longitude: endLocationLng,
  };

  let p1 = {
    latitude: 50.819213,
    longitude: 3.273197,
  };

  const startLocationTracking = async () => {
    await Location.watchPositionAsync(
      {
        enableHighAccuracy: false,
        distanceInterval: 1,
        timeInterval: 10000,
      },
      (location) => {
        p1 = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        updateDistance(p1);

        const angleDeg =
          (Math.atan2(p2.longitude - p1.longitude, p2.latitude - p1.latitude) *
            180) /
          Math.PI;
        setDegree(angleDeg);
        console.log('degree', degree);
        region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        };
      }
    );
  };

  const updateDistance = (newLoc) => {
    const newDistance =
      haversine(pervLatLng, newLoc, { unit: uiStore.currentUser.system }) || 0;
    pervLatLng = newLoc;
    setDistance(newDistance.toFixed(2));
  };

  let region = {
    latitude: p1.latitude,
    longitude: p1.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const deleteTrip = () => {
    navigation.navigate('Home', {
      screen: 'Overview',
    });
  };

  const stopTrip = () => {
    const tripJson = {
      name: name,
      startTime: startTime,
      distance: distance,
      user: uiStore.currentUser,
      store: tripStore.rootStore,
    };
    const trip = new TripModel(tripJson);
    pins.forEach((pin) => {
      pin.setTripId(trip.id);
    });
    tripStore.createTrip(trip);
    navigation.navigate('Home', {
      screen: 'Overview',
    });
    setPopUpSave(false);
    uiStore.setCurrentTrip(false);
  };

  const pinLocation = () => {
    const name = pinName;
    const pin = new LocationModel({
      longitude: p1.longitude,
      latitude: p1.latitude,
      name,
      user: uiStore.currentUser,
      store: locationStore.rootStore,
    });
    locationStore.addNewLocation(pin);
    pins.push(pin);
    setPinName(`Location #${locationStore.locations.length + 1}`);
    setPopUpPin(false);
  };

  const log = () => {
    console.log(uiStore.currentTrip);
  };

  return useObserver(() => {
    return (
      <SafeAreaView style={styles.scroll}>
        <TouchableOpacity onPress={log}>
          <Text>Hello</Text>
        </TouchableOpacity>
        <View style={styles.arrow}>
          <Image
            source={require('../../assets/images/navArrow.png')}
            style={{
              transform: [{ rotate: `${degree - heading}deg` }],
              width: 300,
              height: 300,
            }}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setPopUpPin(true)}>
            <Text>Pin Location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPopUpSave(true)}>
            <Text>Stop Trip</Text>
          </TouchableOpacity>
          <Text>{distance}</Text>
          <Dialog.Container visible={popUpSave}>
            <Dialog.Title>Trip Title</Dialog.Title>
            <Dialog.Input
              onChangeText={(tripName) => setName(tripName)}
              value={name}
            ></Dialog.Input>
            <Dialog.Button
              color={'red'}
              label="Delete"
              onPress={() => deleteTrip()}
            />
            <Dialog.Button
              color={'gray'}
              label="Cancel"
              onPress={() => setPopUpSave(false)}
            />
            <Dialog.Button
              bold={true}
              label="Save"
              onPress={() => stopTrip()}
            />
          </Dialog.Container>

          <Dialog.Container visible={popUpPin}>
            <Dialog.Title>Safe location?</Dialog.Title>
            <Dialog.Input
              onChangeText={(newPinName) => setPinName(newPinName)}
              value={pinName}
            ></Dialog.Input>
            <Dialog.Button
              color={'gray'}
              label="Cancel"
              onPress={() => setPopUpPin(false)}
            />
            <Dialog.Button
              bold={true}
              label="Save"
              onPress={() => pinLocation()}
            />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    );
  });
}

const styles = StyleSheet.create({
  scroll: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapStyle: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width - 50,
    borderRadius: (Dimensions.get('window').width - 50) / 2,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

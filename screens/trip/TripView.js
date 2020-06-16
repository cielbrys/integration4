import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
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

export default function TripView({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();

  const [heading, setHeading] = useState(0);
  const [degree, setDegree] = useState(0);
  const [name, setName] = useState(`Trip #${tripStore.trips.length + 1}`);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState();

  navigation.setOptions({ headerTitle: name });

  let pervLatLng = {};
  let pins = [];
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
    x: 50.820345,
    y: 3.273269,
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
          (Math.atan2(p2.y - p1.longitude, p2.x - p1.latitude) * 180) / Math.PI;
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
    const newDistance = haversine(pervLatLng, newLoc, {unit: uiStore.currentUser.system}) || 0;
    pervLatLng = newLoc;
    setDistance(newDistance.toFixed(2));
  };

  let region = {
    latitude: p1.latitude,
    longitude: p1.longitude,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };

  const stopTrip = () => {
    const tripJson = {
      name: name,
      startTime: startTime,
      distance: distance,
      photos: {},
      user: uiStore.currentUser,
      store: tripStore.rootStore,
    };

    const trip = new TripModel(tripJson);
    pins.forEach((pin) => {
      pin.setTripId(trip.id);
    });
    console.log('start:', trip.startTime, 'Stop:', trip.stopTime);
  };

  const pinLocation = () => {
    const cords = p1;
    const name = `Location #${locationStore.locations.length + 1}`;
    const pin = new LocationModel({
      cords,
      name,
      user: uiStore.currentUser,
      store: locationStore.rootStore,
    });
    pins.push(pin);
  };

  return useObserver(() => {
    return (
      <SafeAreaView style={styles.scroll}>
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
          <TouchableOpacity onPress={() => pinLocation()}>
            <Text>Pin Location</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stopTrip()}>
            <Text>Stop Trip</Text>
          </TouchableOpacity>
          {/* <MapView
            style={styles.mapStyle}
            loadingEnabled={true}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            showsMyLocationButton={true}
            zoomEnabled={false}
            followUserLocation={true}
            showsUserLocation={true}
            region={region}
          >
            {<Marker coordinate={{ longitude: p2.y, latitude: p2.x }} />}
          </MapView> */}
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

import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
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

import { MARGINS } from '../../constants/CssConst';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

import TripTop from '../../assets/images/currentTrip/tripBackground.svg';
import Back from '../../assets/images/back.svg';
import TripTitle from '../../assets/images/currentTrip/TripTitle.svg';
import ArrowUp from '../../assets/images/currentTrip/arrowUp.svg';
import AmountMiles from '../../assets/images/currentTrip/amountMiles.svg';
import PinLocation from '../../assets/images/currentTrip/pinLocation.svg';
import Friends from '../../assets/images/currentTrip/friends.svg';

export default function TripView({ navigation }) {
  const { tripStore, uiStore, locationStore, userStore } = useStore();
  const [heading, setHeading] = useState(0);
  const [degree, setDegree] = useState(0);
  const [name, setName] = useState(`Trip #${tripStore.trips.length + 1}`);
  const [distance, setDistance] = useState(0);
  const startTime = new Date();
  const [popUpSave, setPopUpSave] = useState(false);
  const [popUpPin, setPopUpPin] = useState(false);
  const [nearbyPop, setNearbyPop] = useState(false);
  const [pinLocationButton, setLocationButton] = useState(true);
  const meetUserMail = 'ciel@gmail.com';

  const isMountedRef = useRef(null);

  const [pinName, setPinName] = useState(
    `Location #${locationStore.locations.length + 1}`
  );

  if (uiStore.currentUser.visible === true) {
    timeout();
  }

  function timeout() {
    setTimeout(function () {
      if (meetUserMail !== uiStore.currentUser.email) {
        setNearbyPop(true);
      }
    }, 20000);
  }

  navigation.setOptions({ headerTitle: name });

  const addNewFriend = async (friendMail) => {
    await userStore.setNewFriend(friendMail, uiStore.currentUser);
  };

  const meetUser = async () => {
    console.log('meetfriend', meetUserMail);
    uiStore.currentUser.friends.map((friend) => {
      if (friend.email !== uiStore.currentUser.email) {
        addNewFriend(meetUserMail);
      }
      const newCords = { latitude: 50.820583, longitude: 3.272017 };
      uiStore.setMeetLocation(newCords);

      uiStore.setEndLocation();
    });
    setNearbyPop(false);
  };

  let pervLatLng = {};
  useEffect(() => {
    const config = async () => {
      let res = await Location.requestPermissionsAsync();
      if (res.status !== 'granted') {
        setErrorMsg['Pleas allow Location for this app'];
        console.log('Permission to access location was denied');
      } else {
        startLocationTracking();
        Location.watchHeadingAsync((obj) => {
          let heading = obj.magHeading;
          setHeading(heading);
        });
      }
    };

    config();
  }, []);

  let p2 = {
    latitude: uiStore.meetLocation
      ? uiStore.meetLocation.latitude
      : uiStore.endLocation.latitude,
    longitude: uiStore.meetLocation
      ? uiStore.meetLocation.longitude
      : uiStore.endLocation.longitude,
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
        timeInterval: 1000,
      },
      (location) => {
        p1 = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        if (uiStore.meetLocation) {
          p2 = {
            latitude: uiStore.meetLocation.latitude,
            longitude: uiStore.meetLocation.longitude,
          };
        }

        if (location.coords.speed <= 5) {
          setLocationButton(false);
        }
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
    const newDistance = haversine(pervLatLng, newLoc, { unit: 'km' }) || 0;
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
    uiStore.setCurrentTrip(false);
    uiStore.setTripFeeling('');
    navigation.navigate('Home', {
      screen: 'Overview',
    });
  };

  const stopTrip = async () => {
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
    await tripStore.createTrip(trip);
    navigation.navigate('Home', {
      screen: 'Overview',
    });
    setPopUpSave(false);
    uiStore.setTripFeeling('');
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

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Home',
    });
  };

  const goToFriends = () => {
    navigation.navigate('People');
  };

  const [isToggled, setToggled] = useState(true);

  const toggleTrueFalse = () => setToggled(!isToggled);

  return useObserver(() => {
    return (
      <View style={styles.container}>
        <View style={styles.friends}>
          <TouchableOpacity style={styles.friendsButton} onPress={goToFriends}>
            <Friends />
          </TouchableOpacity>
        </View>
        <View style={styles.topBar}>
          <TripTop style={styles.topBarTop} />
          <TripTitle style={styles.topBarTitle} />
        </View>
        <View
          style={{ position: 'absolute', left: 24, top: 59.5, Zindex: 9999 }}
        >
          <TouchableOpacity onPress={goHome}>
            <Back />
          </TouchableOpacity>
        </View>
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
        <View
          style={{
            backgroundColor: '#175E5A',
            borderRadius: 10,
            height: 300,
            width: deviceWidth,
            position: 'absolute',
            bottom: isToggled === true ? -240 : -22.5,
          }}
        >
          <TouchableOpacity style={styles.bottom} onPress={toggleTrueFalse}>
            <ArrowUp style={{ opacity: 0, marginRight: 24 }} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                display: isToggled === true ? 'visible' : 'none',
              }}
            >
              <AmountMiles />
              <Text style={{ fontSize: 22, color: 'white', marginLeft: 6 }}>
                {distance} miles
              </Text>
            </View>
            <ArrowUp
              style={{
                marginRight: 24,
                transform: [{ rotate: isToggled === true ? '0deg' : '180deg' }],
              }}
            />
          </TouchableOpacity>

          <View style={{ display: isToggled === true ? 'none' : 'visible' }}>
            <View style={styles.amountMiles}>
              <AmountMiles />
              <Text style={{ fontSize: 36, color: 'white', marginLeft: 6 }}>
                {distance} miles
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setPopUpPin(true)}
                style={styles.pinButton}
                disabled={pinLocationButton}
              >
                <PinLocation />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPopUpSave(true)}
                style={styles.stopButton}
              >
                <Text
                  style={{ fontSize: 18, color: 'white', textAlign: 'center' }}
                >
                  Stop Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Dialog.Container visible={popUpSave}>
            <Dialog.Title>Name your trip</Dialog.Title>
            <Dialog.Input
              onChangeText={(tripName) => setName(tripName)}
              value={name}
              maxLength={15}
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
            <Dialog.Title>Pin current location?</Dialog.Title>
            <Dialog.Input
              onChangeText={(newPinName) => setPinName(newPinName)}
              value={pinName}
              maxLength={25}
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

          <Dialog.Container visible={nearbyPop}>
            <Dialog.Title>User nearby, want to meet?</Dialog.Title>
            <Dialog.Button
              color={'red'}
              label="No thanks"
              onPress={() => setNearbyPop(false)}
            />
            <Dialog.Button bold={true} label="Yes" onPress={() => meetUser()} />
          </Dialog.Container>
        </View>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  friends: {
    width: 48,
    height: 48,
    backgroundColor: '#E1E9E7',
    position: 'absolute',
    zIndex: -1,
    bottom: 75,
    right: MARGINS.defaultValue,
    borderRadius: 50,
  },
  friendsButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    height: 0,
  },
  topBarTop: {
    marginTop: -10,
  },
  topBarTitle: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 56,
  },
  arrow: {
    alignItems: 'center',
    marginTop: deviceHeight / 4,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
  },
  amountMiles: {
    marginLeft: MARGINS.defaultValue,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  pinButton: {
    backgroundColor: '#FFFFFF',
    marginRight: MARGINS.defaultValue,
    marginLeft: MARGINS.defaultValue,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  stopButton: {
    marginTop: 16,
    backgroundColor: '#FF0000',
    marginRight: MARGINS.defaultValue,
    marginLeft: MARGINS.defaultValue,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
  },
});

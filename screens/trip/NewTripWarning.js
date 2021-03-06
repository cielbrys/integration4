import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import Locations from '../../constants/Locations';

import SafetyWarning from '../../assets/images/Warning/safetyWarning.svg';
import BackgroundButton from '../../assets/images/Trips/backgroundButton.svg';
import BackgroundWarning from '../../assets/images/Warning/BackgroundWarning.svg';
import Unchecked from '../../assets/images/Warning/unchecked.svg';
import Checked from '../../assets/images/Warning/checked.svg';
import { FONTSIZES } from '../../constants/CssConst';

export default ({ navigation }) => {
  const [read, setRead] = useState(false);
  const { uiStore } = useStore();

  const getLocation = () => {
    let filteredLocations = [];
    Locations.forEach((location) => {
      if (location.category === uiStore.tripFeeling) {
        filteredLocations.push(location);
      }
    });
    const locationNumber = Math.floor(Math.random() * filteredLocations.length);
    console.log(locationNumber);
    console.log(filteredLocations[locationNumber]);
    uiStore.setEndLocation(filteredLocations[locationNumber]);
  };

  const goToTripView = () => {
    getLocation();
    uiStore.setCurrentTrip(true);
    if (uiStore.endLocation) {
      navigation.navigate('home', {
        screen: 'TripView',
      });
    }
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  return useObserver(() => (
    <View
      style={style.container}
    >
      <BackgroundWarning style={{ position: 'absolute' }} />
      <SafetyWarning />
      <Text style={style.warningText}>
        Using your phone while driving is illegal! {'\n'} We advice you to mount
        your phone.
      </Text>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => setRead(true)}
        >
          <Text style={style.warningTextOkay}>
            I have read the safety warning!
          </Text>
          {read !== false ? <Checked /> : <Unchecked />}
        </TouchableOpacity>
      </View>
      <View style={style.view}>
        <View style={style.bottom}>
          <TouchableOpacity
            disabled={read !== false ? false : true}
            onPress={() => goToTripView()}
          >
            <BackgroundButton style={{ opacity: read == false ? 0.5 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ));
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E8C86',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    position: 'absolute',
    bottom: 45,
  },
  warningText: {
    fontSize: FONTSIZES.default, 
    color: 'white', 
    marginTop: 40 
  },
  warningTextOkay:{ 
    marginRight: 30, 
    fontSize: FONTSIZES.small, 
    color: 'white' 
  }
});

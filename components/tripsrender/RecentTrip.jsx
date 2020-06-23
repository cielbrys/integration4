/* */

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';
import { useStore } from '../../hooks/useStore';
import Pijl from '../../assets/images/arrowBig.svg';
import Location from '../../assets/images/locationBig.svg';
import Timer from '../../assets/images/timerBig.svg';
import Pinned from '../../assets/images/pinned.svg';

const screenWidth = Math.round(Dimensions.get('window').width) / 2.5;
const RectentTrip = ({ trip, onPress }) => {
  const { uiStore, locationStore } = useStore();

  const locations = locationStore.getLocationsForTrip(trip.id);

  return (
    <TouchableOpacity style={styles.latest} onPress={() => onPress(trip)}>
      <View style={styles.latestTop}>
        <Text style={styles.latestName}>{trip.name}</Text>
        <Pijl />
      </View>
      <View style={styles.latestMid}>
        <View style={styles.latestStat}>
          <Timer />
          <Text style={styles.lastestText}>{trip.duration}h</Text>
        </View>
        <View style={styles.latestStat}>
          <Pinned />
          <Text style={styles.lastestText}>{locations.length}</Text>
        </View>
      </View>
      <View style={styles.latestStat}>
        <Location />
        <Text style={styles.lastestText}>
          {trip.distance} {uiStore.currentUser.system}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  latest: {
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
    marginTop: MARGINS.defaultValue,
    backgroundColor: 'rgb(240,244,243)',
    padding: 16,
    zIndex: -20,
    borderRadius: 10,
  },
  latestTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  first: {
    marginTop: 80,
    marginLeft: MARGINS.defaultValue,
    fontSize: 22,
    fontWeight: '700',
  },
  second: {
    marginTop: 40,
    marginLeft: MARGINS.defaultValue,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  latestName: {
    fontSize: 24,
    fontWeight: '700',
  },
  latestMid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  latestStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 64,
    marginTop: 16,
  },
  lastestText: {
    marginLeft: 16,
    fontSize: FONTSIZES.default,
  },
});

RectentTrip.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default RectentTrip;

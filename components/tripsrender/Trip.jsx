import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';
import Pijl from '../../assets/images/arrowBig.svg';
import LocationSmall from '../../assets/images/locationYellow.svg';
import TimerSmall from '../../assets/images/timerYellow.svg';
import { useStore } from '../../hooks/useStore';

const screenWidth = Math.round(Dimensions.get('window').width) / 2.5;
const Trip = ({ trip, onPress }) => {
  const { uiStore } = useStore();

  return (
    <TouchableOpacity style={styles.trip} onPress={() => onPress(trip)}>
      <View style={styles.latestTop}>
        <Text style={styles.name}>{trip.name}</Text>

        <Pijl />
      </View>
      <View style={styles.stat}>
        <TimerSmall />
        <Text style={styles.text}>{trip.duration}h</Text>
      </View>
      <View style={styles.stat}>
        <LocationSmall />
        <Text style={styles.text}>
          {uiStore.currentUser.system === 'mile'
            ? (Number(trip.distance) * 0.62137).toFixed(1)
            : trip.distance}{' '}
          {uiStore.currentUser.system}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  latestTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  trip: {
    backgroundColor: 'rgb(240,244,243)',
    borderRadius: 10,
    padding: 12,
    marginRight: MARGINS.defaultValue,
    marginBottom: 32,
    width: screenWidth,
  },
  name: {
    fontSize: FONTSIZES.small,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 64,
    marginTop: 16,
  },
  text: {
    marginLeft: 8,
  },
});

Trip.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default Trip;

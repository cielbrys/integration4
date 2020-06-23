import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';
import Pijl from '../../assets/images/arrowBig.svg';
import { useStore } from '../../hooks/useStore';
import Timer from '../../assets/images/timerYellow';
import Location from '../../assets/images/locationYellow';

const screenWidth = Math.round(Dimensions.get('window').width) / 2.5;
const TripOverview = ({ item, onPress }) => {
  const { uiStore } = useStore();

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.trip}>
        <View style={styles.title}>
          <Text style={styles.name}>{item.name}</Text>
          <Pijl />
        </View>
        <View style={styles.stat}>
          <Timer />
          <Text style={styles.tekst}>{item.duration}h.</Text>
        </View>
        <View style={styles.stat}>
          <Location />
          <Text style={styles.tekst}>
            {uiStore.currentUser.system === 'mile'
              ? (Number(item.distance) * 0.62137).toFixed(1)
              : item.distance}
            {uiStore.currentUser.system}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trip: {
    backgroundColor: 'rgb(240,244,243)',
    marginRight: 16,
    width: 170,
    height: 120,
    borderRadius: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    marginTop: 8,
  },

  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 16,
    color: 'rgb(21,72,69)',
    fontSize: 20,
  },
  name: {
    paddingLeft: 16,
    paddingTop: 8,
    marginBottom: 16,
    fontSize: FONTSIZES.small,
  },
  tekst: {
    color: 'rgb(21,72,69)',
    marginLeft: 16,
    fontSize: FONTSIZES.small,
  },
});

TripOverview.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TripOverview;

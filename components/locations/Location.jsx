import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';
import Map from '../../assets/images/map.svg';
import Jeet from '../../assets/images/jeet.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeleteLoc from '../../assets/images/DeleteLoc.svg';
import { useStore } from '../../hooks/useStore';

const Location = ({ location }) => {
  const { locationStore } = useStore();

  const onDelete = async (location) => {
    await locationStore.deleteLocation(location);
  };

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

  return (
    <TouchableOpacity
      style={styles.location}
      key={location.id}
      onPress={() => handlePress(location.cords)}
    >
      <View style={styles.text}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.loc}>
          {location.cords.latitude}, {location.cords.longitude}
        </Text>
        {console.log(location.tripId)}
        <Jeet style={styles.view}></Jeet>
      </View>
      <Map style={{ position: 'absolute', right: 50, top: 22 }} />
      <TouchableOpacity
        style={{ zIndex: 99999 }}
        onPress={() => onDelete(location)}
      >
        <DeleteLoc style={{ zIndex: 99999 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

Location.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Location;

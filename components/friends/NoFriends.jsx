import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';

import { TouchableOpacity } from 'react-native-gesture-handler';

const NoLocations = ({ onPress }) => {
  return (
    <View style={styles.locations}>
      <TouchableOpacity onPress={onPress} style={styles.location}>
        <Text style={{ fontSize: 16 }}>
          You don't have any people met yet! {'\n'}Start a new trip and meet
          some!
        </Text>
      </TouchableOpacity>
    </View>
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
  locations: {
    marginTop: 100,
    height: '76%',
  },
});

NoLocations.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default NoLocations;

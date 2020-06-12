import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Trip = ({ trip }) => {
  <Text> {trip.name} </Text>;
};

Trip.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default Trip;

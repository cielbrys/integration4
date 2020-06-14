import React from 'react';
import PropTypes from 'prop-types';
import { useObserver } from 'mobx-react-lite';
import { StyleSheet, Text, View } from 'react-native';
import Trip from './Trip.jsx';

const Trips = ({ trips }) => {
  return useObserver(() => {

  });
};

Trips.propTypes = {
  trips: PropTypes.array.isRequired,
};

const style = StyleSheet.create({});

export default Trips;

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Dimensions, Linking } from 'react-native';
import { MARGINS, FONTSIZES } from '../../constants/CssConst';
import Insta from '../../assets/images/instagram.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Friend = ({ friend }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(`https://www.instagram.com/${friend.socials}`)
      }
      style={styles.friends}
    >
      <Text style={styles.name}>{friend.name}</Text>
      <Insta />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  friends: {
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
    marginTop: 16,
    backgroundColor: 'rgb(240,244,243)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 4,
  },
  name: {
    fontSize: FONTSIZES.small,
  },
});

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};

export default Friend;

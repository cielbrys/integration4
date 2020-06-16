import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import TopRegister from '../../assets/images/TopRegister.svg';
import GoogleIcon from '../../assets/images/GoogleIcon.svg';
import FacebookIcon from '../../assets/images/FacebookIcon.svg';

import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';

export default ({ navigation, route }) => {
  const goToLogin = () => {
    navigation.navigate('home');
  };

  const handleSubmit = () => {
    navigation.navigate('home', {
      screen: 'Overview',
    });
  };

  navigation.setOptions({
    headerStyle: { height: 50 },
    headerTitle: null,
    headerLeft: null,
  });

  const { uiStore } = useStore();

  return (
    <View>
      <View>
        <TouchableOpacity>
          <Text>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Experienced</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Instagram</Text>
        <Text>
          Connecting to instagram makes it easier to stay in contact with fellow
          travellers
        </Text>
        <TouchableOpacity>
          <Text>Connect to instagram</Text>
        </TouchableOpacity>
        <View>
          <Button title="Let's start" onPress={handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({});

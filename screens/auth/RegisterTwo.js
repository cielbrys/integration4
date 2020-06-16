import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';

import TopRegister from '../../assets/images/TopRegister.svg';
import Welcome from '../../assets/images/Register/Welcome.svg';

export default ({ navigation, route }) => {
  const goToLogin = () => {
    navigation.navigate('home');
  };

  const handleSubmit = () => {
    navigation.navigate('home', {
      screen: 'Home',
    });
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });


  return (
    <ScrollView style={style.container}>
      <TopRegister style={style.topRegister} />
      <Welcome style={style.welcome}/>
      <View>
        <Text>Which traveller are you?</Text>
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
          <Button title="Let's start" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  topRegister:{
    position: 'absolute',
    top: 0
  },
  welcome: {
    position: 'absolute',
    left: 24,
    top: 50
  },
});

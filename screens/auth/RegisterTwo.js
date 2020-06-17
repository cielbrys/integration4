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
import { useObserver } from 'mobx-react-lite';


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

  return useObserver(() => (
    <ScrollView style={style.container}>
      <TopRegister style={style.topRegister} />
      <Welcome style={style.welcome}/>
      <View style={style.status}>
        <Text style={style.statusTitle}>Which traveller are you?</Text>
        <View style={style.options}>
          <TouchableOpacity
            style={style.begin}
          >
            <Text>Beginner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.end}
          >
            <Text>Experienced</Text>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity
          >
            <Text>Connect to instagram</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  ));
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  topRegister:{
    position: 'absolute',
    top: 0
  },
  welcome: {
    position: 'absolute',
    left: 24,
    top: 50
  },
  active: {
    backgroundColor: 'red'
  },
  options: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  begin:{
    height: 99,
    backgroundColor: '#F0F4F3',
    width: '45%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D7874'
  },
  end:{
    height: 99,
    backgroundColor: '#F0F4F3',
    width: '45%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1D7874'
  },
  status: {
    marginLeft: 24,
    marginRight: 24
  },
  statusTitle: {
    fontSize: 18
  }
});

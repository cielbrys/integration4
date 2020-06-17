import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useObserver } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import TripModel from '../../models/TripModel';

import SafetyWarning from '../../assets/images/Warning/safetyWarning.svg';

import BackgroundButton from '../../assets/images/Trips/backgroundButton.svg';

import BackgroundWarning from '../../assets/images/Warning/BackgroundWarning.svg';

import Unchecked from '../../assets/images/Warning/unchecked.svg';
import Checked from '../../assets/images/Warning/checked.svg';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default ({ navigation }) => {
  const [read, setRead] = useState(false);

  const goToTripView = () => {
    navigation.navigate('home', {
      screen: 'TripView',
    });
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  return useObserver(() => (
    <View style={{flex: 1, backgroundColor: '#3E8C86', alignItems: 'center', justifyContent: 'center'}}>
      <BackgroundWarning style={{position:'absolute'}}/>
      <SafetyWarning />
      <Text style={{fontSize: 18, color: 'white', marginTop: 40}}>
        Using your phone while driving is illegal! {"\n"} We advice you to mount your
        phone.
      </Text>
      <View style={{marginTop: 20}}>
      <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={() => setRead(true)}>
        <Text style={{marginRight: 30, fontSize: 16, color: 'white'}}>I have read the safety warning!</Text>
        {
          read !== false 
          ? <Checked />
          : <Unchecked />
        }
        
      </TouchableOpacity>
      </View>
      <View  style={style.view}>

        <View style={style.bottom}>
          <TouchableOpacity 
            disabled={read !== false ? false : true}
            onPress={() => goToTripView()}
          >
            <BackgroundButton style={{opacity: read == false ? 0.5 : 1}}/>
          </TouchableOpacity> 
        </View>
             
      </View>
    </View>
  ));
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    position: 'absolute',
    bottom: 45
  }
});

import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native';

import NewTripBG from '../../assets/images/NewTrip/NewTripBG.svg';
import Back from '../../assets/images/back.svg';


let deviceWidth = Dimensions.get('window').height;

export default ({ navigation }) => {

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Overview',
    });
  };

  return (
    <View>
      <NewTripBG style={style.background}/>
      <TouchableOpacity onPress={goHome}>
        <Back style={style.back}/>
      </TouchableOpacity>
      <Text>Which is your preferred feeling?</Text>
      <View style={style.options}>

        <View style={style.option}>
          <View style={style.option1}>
            <View style={style.square} />
            <Text style={style.text}>Calmness</Text>
          </View>
          <View style={style.option2}>
            <View style={style.square} />
            <Text style={style.text}>Busyness</Text>
          </View>
        </View>

        <View style={style.option}>
          <View  style={style.option3}>
            <View style={style.square} />
            <Text style={style.text}>Openness</Text>
          </View>
          <View  style={style.option4}>
            <View style={style.square} />
            <Text style={style.text}>Connection</Text>
          </View>
        </View>

      </View>
      <TouchableOpacity>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  background: {
    position: 'absolute',
    top: -35
  },
  text: {
    marginTop: 10
  },
  back: {
    position: 'absolute',
    left: 24,
    top: 60
  },
  square: {
    width: 70,
    height: 70,
    backgroundColor: '#CDCDCD',
    borderRadius: 5
  },
  option1: {
    position: 'absolute',
    left: 80,
    alignItems: 'center'
  },
  option2: {
    position: 'absolute',
    right: 80,
    alignItems: 'center'
  },
  option3: {
    position: 'absolute',
    left: 80,
    top: 160,
    alignItems: 'center'
  },
  option4: {
    position: 'absolute',
    right: 80,
    top: 160,
    alignItems: 'center'
  },
  options: {
    marginTop: deviceWidth/3
  }
});

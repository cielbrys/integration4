import React, {useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Dimensions } from 'react-native';

import NewTripBG from '../../assets/images/NewTrip/NewTripBG.svg';
import Back from '../../assets/images/back.svg';
import BackgroundButton from '../../assets/images/Trips/backgroundButton.svg';


let deviceWidth = Dimensions.get('window').height;

export default ({ navigation }) => {

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Home',
    });
  };

  const goToWarning = () => {
    navigation.navigate("NewTripWarning");
  }

  const [feeling, setFeeling] = useState("");

  return (
    <View>
      <NewTripBG style={style.background}/>
      <TouchableOpacity  style={style.back} onPress={goHome}>
        <Back />
        
      </TouchableOpacity>
      <Text>New Trip</Text>
      <Text>Which is your preferred feeling?</Text>
      <View style={style.options}>

        <View style={style.option}>
          <TouchableOpacity 
            style={style.option1}
            onPress={() => setFeeling('calm')}
          >
            <View style={style.square} />
            <Text style={style.text}>Calmness</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.option2}
            onPress={() => setFeeling('busy')}
          >
            <View style={style.square} />
            <Text style={style.text}>Busyness</Text>
          </TouchableOpacity>
        </View>

        <View style={style.option}>
          <TouchableOpacity  
            style={style.option3}
            onPress={() => setFeeling('open')}
          >
            <View style={style.square} />
            <Text style={style.text}>Openness</Text>
          </TouchableOpacity>
          <TouchableOpacity  
            style={style.option4}
            onPress={() => setFeeling('free')}
          >
            <View style={style.square} />
            <Text style={style.text}>Freely</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View  style={style.view}>

        <View style={style.bottom}>
          <TouchableOpacity 
            style={style.nextButton}
            onPress={goToWarning}
          >
            <BackgroundButton/>
          </TouchableOpacity> 
        </View>
             
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  view:{
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%'
  },
  bottom: {

  },
  // bottom: {
  //   marginTop: deviceWidth/2.3
  // },
  // nextButton: {
  //   alignItems: 'center',
  // },
  // buttontext: {
  //   position: 'absolute',
  //   top: 25,
  //   left: 180,
  //   fontSize: 18
  // },
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
    top: 60,
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
    marginTop: deviceWidth/4,
    zIndex: 50
  }
});

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useObserver } from 'mobx-react-lite';
import NewTripBG from '../../assets/images/NewTrip/NewTripBG.svg';
import Back from '../../assets/images/back.svg';
import BackgroundButton from '../../assets/images/Trips/backgroundButton.svg';
import { useStore } from '../../hooks/useStore';

import Busyness from '../../assets/images/Choice/Busyness.svg';
import Calmness from '../../assets/images/Choice/Calmness.svg';
import Closed from '../../assets/images/Choice/Closed.svg';
import Openness from '../../assets/images/Choice/Openness.svg';

import BorderSelect from '../../assets/images/Choice/borderSelect.svg';

import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default ({ navigation }) => {
  const { uiStore } = useStore();

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
    navigation.navigate('NewTripWarning');
  };

  return useObserver(() => (
    <View style={{ backgroundColor: 'white' }}>
      <NewTripBG style={style.background} />
      <TouchableOpacity style={style.back} onPress={goHome}>
        <Back />
      </TouchableOpacity>
      <Text style={style.pageTitle}>New Trip</Text>
      <Text style={style.pageText}>Which is your preferred feeling?</Text>
      <View style={style.options}>
        <View style={style.option}>
          <TouchableOpacity
            style={style.option1}
            onPress={() => uiStore.setTripFeeling('calm')}
          >
            <View style={style.square}>
              {uiStore.tripFeeling === 'calm' ? (
                <>
                  <BorderSelect
                    style={{ position: 'absolute', top: -3, left: -2 }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: -10,
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: -10,
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Calmness />
            </View>
            <Text style={style.text}>Calmness</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.option2}
            onPress={() => uiStore.setTripFeeling('busy')}
          >
            <View style={style.square}>
              {uiStore.tripFeeling === 'busy' ? (
                <>
                  <BorderSelect
                    style={{ position: 'absolute', top: -3, left: -2 }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: -10,
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: -10,
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Busyness />
            </View>
            <Text style={style.text}>Busyness</Text>
          </TouchableOpacity>
        </View>

        <View style={style.option}>
          <TouchableOpacity
            style={style.option3}
            onPress={() => uiStore.setTripFeeling('open')}
          >
            <View style={style.square}>
              {uiStore.tripFeeling === 'open' ? (
                <>
                  <BorderSelect
                    style={{ position: 'absolute', top: -3, left: -2 }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: -10,
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: -10,
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              <Openness />
            </View>
            <Text style={style.text}>Openness</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.option4}
            onPress={() => uiStore.setTripFeeling('closed')}
          >
            <View style={style.square}>
              {uiStore.tripFeeling === 'closed' ? (
                <>
                  <BorderSelect
                    style={{ position: 'absolute', top: -3, left: -2 }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: -10,
                      transform: [{ rotate: '90deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                  <BorderSelect
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: -10,
                      transform: [{ rotate: '-90deg' }],
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Closed />
            </View>
            <Text style={style.text}>Closed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.view}>
        <View style={style.bottom}>
          <TouchableOpacity
            style={style.nextButton}
            onPress={goToWarning}
            disabled={uiStore.tripFeeling ? false : true}
          >
            <BackgroundButton />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ));
};

const style = StyleSheet.create({
  pageText: {
    position: 'absolute',
    left: 40,
    top: deviceHeight / 4.5,
    fontSize: FONTSIZES.default,
  },
  pageTitle: {
    position: 'absolute',
    top: 64,
    left: deviceWidth / 2.45,
    fontSize: 20,
    color: 'white',
  },
  view: {
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  background: {
    position: 'absolute',
    top: -35,
  },
  text: {
    marginTop: 10,
  },
  back: {
    position: 'absolute',
    left: MARGINS.defaultValue,
    top: 60,
  },
  square: {
    width: deviceWidth / 3,
    height: deviceHeight / 8,
    backgroundColor: '#CDCDCD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option1: {
    position: 'absolute',
    left: 40,
    alignItems: 'center',
  },
  option2: {
    position: 'absolute',
    right: 40,
    alignItems: 'center',
  },
  option3: {
    position: 'absolute',
    left: 40,
    top: deviceHeight / 4.5,
    alignItems: 'center',
  },
  option4: {
    position: 'absolute',
    right: 40,
    top: deviceHeight / 4.5,
    alignItems: 'center',
  },
  options: {
    marginTop: deviceHeight / 3.4,
    zIndex: 50,
  },
});

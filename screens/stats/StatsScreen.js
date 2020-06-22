import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import TopTitle from '../../assets/images/StatsTitle.svg';
import Bottom from '../../assets/images/statsBottom.svg';
import Back from '../../assets/images/back.svg';
import Stats from '../../assets/images/stats.svg';
import Black from '../../assets/images/blackLine.svg';
import White from '../../assets/images/whiteLine.svg';
import Yellow from '../../assets/images/locationButton.svg';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';

import { MARGINS } from '../../constants/CssConst';

export default function StatsScreen({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();

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

  const goToLocations = () => {
    navigation.navigate('Locations');
  };

  return useObserver(() => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.main}>
        <View style={styles.header}>
          <TitleBackground style={styles.top} />
          <TopTitle style={styles.topTitle} />
        </View>
        <TouchableOpacity style={styles.back} onPress={() => goHome()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.tekst}>
          <Stats />
          <View style={styles.txt}>
            <View style={styles.stat}>
              <Text style={styles.statText}>
                {uiStore.currentUser.system} {'\n'}traveled
              </Text>
              <Text style={styles.number}>
                {uiStore.currentUser.system === 'mile'
                  ? tripStore.distanceDone * (0.62137).toFixed(1)
                  : tripStore.distanceDone}
              </Text>
            </View>
            <Black />
            <View style={styles.stat}>
              <Text style={styles.statText}>trips {'\n'}completed</Text>
              <Text style={styles.number}>{tripStore.trips.length}</Text>
            </View>
            <Black />
            <View style={styles.stat}>
              <Text style={styles.statText}>hours {'\n'}traveled</Text>
              <Text style={styles.number}>{tripStore.timeDone}</Text>
            </View>
          </View>
          <View style={styles.bottomtxt}>
            <View style={styles.statsBottom}>
              <Text style={styles.numberBottom}>
                {uiStore.currentUser.friends.length}
              </Text>
              <Text style={styles.white}>People met</Text>
              <White />
              <Text style={styles.numberBottom}>
                {locationStore.locations.length}
              </Text>
              <Text style={styles.white}>Locations pinned</Text>
            </View>
            <TouchableOpacity onPress={() => goToLocations()}>
              <Yellow />
            </TouchableOpacity>
          </View>
        </View>
        <Bottom style={styles.bottom} />
      </View>
    </ScrollView>
  ));
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 28,
  },
  topTitle: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 60,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(103,146,137)', //rgb(103,146,137)
  },
  main: {
    backgroundColor: 'white',
  },
  top: {
    zIndex: -20,
    position: 'absolute',
    paddingTop: 50,
  },
  back: {
    marginLeft: MARGINS.defaultValue,
    marginTop: 32,
  },
  tekst: {
    zIndex: 1,
    marginTop: 80,
    marginBottom: 0,

    alignItems: 'center',
  },
  txt: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
  },
  bottomtxt: {
    marginTop: 150,
    alignItems: 'center',
  },
  stat: {
    marginRight: MARGINS.defaultValue,
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    marginLeft: 32,
  },

  statText: {
    textTransform: 'capitalize',
  },
  number: {
    fontSize: 32,
    marginBottom: 8,
  },
  numberBottom: {
    fontSize: 32,
    marginBottom: 8,
    color: 'white',
    marginRight: 16,
    marginLeft: MARGINS.defaultValue,
  },
  statsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MARGINS.defaultValue,
  },
  white: {
    color: 'white',
    marginRight: MARGINS.defaultValue,
    alignSelf: 'center',
  },
  bottom: {
    zIndex: 0,
    position: 'absolute',
    top: 375,
  },
});

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Back from '../../assets/images/back.svg';
import TopTitle from '../../assets/images/people.svg';
import Boom from '../../assets/images/boom.svg';
import { useObserver } from 'mobx-react-lite';
import TitleBackground from '../../assets/images/tripDetail/TitleBackground.svg';

import { MARGINS } from '../../constants/CssConst';
import { FONTSIZES } from '../../constants/CssConst';
import Friend from '../../components/friends/Friend';
import NoFriends from '../../components/friends/NoFriends';

export default function PeopleScreen({ navigation }) {
  const { uiStore } = useStore();

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Home',
    });
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const startNewTrip = () => {
    navigation.navigate('NewTripChoice');
  };

  if (uiStore.currentUser) {
    return useObserver(() => (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TitleBackground style={styles.top} />
            <TopTitle style={styles.topTitle} />
          </View>
          <TouchableOpacity style={styles.back} onPress={() => goHome()}>
            <Back />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text style={styles.met}>People you have met</Text>
            {uiStore.currentUser.friends.length === 0 ? (
              <NoFriends onPress={startNewTrip} />
            ) : (
              <>
                <Text style={styles.txt}>Friends </Text>
                <ScrollView
                  style={styles.friendsView}
                  showsHorizontalScrollIndicator={false}
                >
                  {uiStore.currentUser.friends.map((user) => (
                    <Friend friend={user} key={user.email} />
                  ))}
                </ScrollView>
              </>
            )}
            <Boom style={styles.bottom} />
          </View>
        </View>
      </View>
    ));
  } else {
    navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  location: {
    backgroundColor: 'rgb(240,244,243)',
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    backgroundColor: 'white',
  },
  bottom: {
    zIndex: -20,
    position: 'absolute',
    top: 70,
  },
  back: {
    marginLeft: MARGINS.defaultValue,
    marginTop: 32,
  },
  top: {
    zIndex: -20,
    position: 'absolute',
    paddingTop: 50,
  },
  header: {
    flex: 1,
    paddingTop: 28,
  },
  topTitle: {
    position: 'absolute',
    right: MARGINS.defaultValue,
    top: 60,
  },
  txt: {
    marginLeft: MARGINS.defaultValue,
  },
  title: {
    marginTop: 80,
    zIndex: 300,
  },

  friendsView: {
    height: '100%',
  },
  met: {
    fontSize: FONTSIZES.default,
    fontWeight: '700',
    marginLeft: MARGINS.defaultValue,
    marginBottom: 16,
  },
});

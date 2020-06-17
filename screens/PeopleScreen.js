import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Linking } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useStore } from '../hooks/useStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Back from '../assets/images/back.svg';
import Top from '../assets/images/statsTop.svg';
import TopTitle from '../assets/images/people.svg';
import Boom from '../assets/images/boom.svg';
import Insta from '../assets/images/instagram.svg';


export default function PeopleScreen({navigation}) {
  const { uiStore } = useStore();

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Overview',
    });
  };

  const insta = "kfcheist"

  return (
    <ScrollView style={styles.container}>
       <View style={styles.main}>
        <View style={styles.header}>
          <Top style={styles.top}/>
          <TopTitle style={styles.topTitle} />
        </View>
        <TouchableOpacity style={styles.back} onPress={() => goHome()}>
          <Back/>
        </TouchableOpacity>
        <View style={styles.title}>
      <Text style={styles.met}>People you have met</Text>
      {uiStore.currentUser.users.length === 0 ? (
        <Text style={styles.txt}>No friends met yet... </Text>
      ) : (
        <>
        <Text style={styles.txt}>Friends </Text>
        <View style={styles.friends}>
        <Text style={styles.name}>Your Friends Name</Text>
        <Insta  onPress={() => Linking.openURL(`https://www.instagram.com/${insta}`)}></Insta>
        </View>
        </>
      )}
      <Boom style={styles.bottom}/>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    backgroundColor: 'white'
  },
  bottom : { 
    zIndex: -20,
    position: "absolute",
    top: 70,
  },
  back: {
    marginLeft: 32,
    marginTop: 32
  },
  top: {
    zIndex: -20,
    position: "absolute",
    paddingTop: 50
  },
  header: {
    flex: 1,
    paddingTop: 28
  },
  topTitle: {
    position: 'absolute',
    right: 24,
    top: 60
  },
  txt: {
    marginLeft: 24
  },
  title: {
    marginTop: 80,
    zIndex: 300
  },
  friends: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 16,
    backgroundColor: "rgb(240,244,243)",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 4
  },
  name: {
    fontSize: 16
  },
  met: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 24,
    marginBottom: 16
  },
});

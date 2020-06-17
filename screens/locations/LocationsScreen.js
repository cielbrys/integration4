import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';


import Top from '../../assets/images/statsTop.svg';
import TopTitle from '../../assets/images/locations.svg';
import Back from '../../assets/images/back.svg';
import Boom from '../../assets/images/boom.svg';
import Map from '../../assets/images/map.svg';
import Jeet from '../../assets/images/jeet.svg';



export default function LocationsScreen({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.goBack();
  };

  return useObserver(() => (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
      <View style={styles.header}>
          <Top style={styles.top} />
          <TopTitle style={styles.topTitle} />
        </View>
        <TouchableOpacity style={styles.back} onPress={() => goHome()}>
          <Back />
        </TouchableOpacity>
        <View style={styles.locations}>
            <View style={styles.location}>
                <View style={styles.text}>
                    <Text style={styles.name}>Chillspot near te lake</Text>
                    <Text style={styles.loc}>Locatie gps </Text>
                    <Jeet style={styles.view}  onPress={() => Linking.openURL(`https://www.google.be/maps`)}></Jeet>
                </View>
                <Map/>
            </View>
            <View style={styles.location}>
                <View style={styles.text}>
                    <Text style={styles.name}>Chillspot near te lake</Text>
                    <Text style={styles.loc}>Locatie gps </Text>
                    <Jeet style={styles.view}  onPress={() => Linking.openURL(`https://www.google.be/maps`)}></Jeet>
                </View>
                <Map/>
            </View>
        </View>
        <Boom style={styles.bottom}/>
      </View>
    </ScrollView>
  ));
}

const styles = StyleSheet.create({
    topTitle: {
        position: 'absolute',
        right: 24,
        top: 60,
      },
      container: {
          backgroundColor: 'rgb(255,255,255)'
      },
      top: {
        zIndex: -20,
        position: 'absolute',
        paddingTop: 50,
      },
      back: {
        marginLeft: 24,
        marginTop: 60,
      },
      bottom : { 
        zIndex: -20,
        position: "absolute",
        top: 120,
      },
      locations: {
          marginTop: 100
      },
      location: {
        backgroundColor: "rgb(240,244,243)",
        marginLeft: 24,
        marginRight: 24,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderRadius: 6,
        padding: 16,
        marginBottom: 16
      },
      name: {
          color: "rgb(29,120,116)",
          fontSize: 18
      },
      loc: {
          color: "rgb(194,194,194)",
          marginBottom: 24
      },
      text: {
          justifyContent: "space-between"
      }
});

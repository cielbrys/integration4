import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import Top from '../../assets/images/statsTop.svg';
import Bottom from '../../assets/images/statsBottom.svg';
import Back from '../../assets/images/back.svg';
import Stats from '../../assets/images/stats.svg';
import Black from '../../assets/images/blackLine.svg';
import White from '../../assets/images/whiteLine.svg';
import Yellow from '../../assets/images/locationButton.svg';


export default function LocationsScreen({ navigation }) {
  const { tripStore, uiStore, locationStore } = useStore();

  const goHome = () => {
    navigation.navigate('home', {
      screen: 'Overview',
    });
  };

  const goToLocations = () => {
    // navigation.navigate('home', {
    //   screen: 'Overview',
    // });
  };



  return useObserver(() => (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Top  style={styles.top}/>
        <TouchableOpacity style={styles.back} onPress={() => goHome()}>
          <Back/>
        </TouchableOpacity>
        <View style={styles.tekst}>
      <Stats/>
      <View style={styles.txt}>
      <View style={styles.stat}>
      <Text>Km's {"\n"}Traveled</Text>
      <Text style={styles.number}>{tripStore.distanceDone}</Text>
      </View>
      <Black/>
      <View style={styles.stat}>
      <Text>Trips {"\n"}completed</Text>
      <Text style={styles.number}>{tripStore.trips.length}</Text>
      </View>
      <Black/>
      <View style={styles.stat}>
      <Text>Hours {"\n"}traveled</Text>
      <Text style={styles.number}>{tripStore.timeDone}</Text>
      </View>
      </View>
      <View style={styles.bottomtxt}>
      <View style={styles.statsBottom}>
      <Text style={styles.numberBottom}>{uiStore.currentUser.users.length}</Text>
      <Text style={styles.white}>People met</Text>
      <White/>
      <Text style={styles.numberBottom} >{locationStore.locations.length}</Text>
      <Text style={styles.white}>Locations pinned</Text>
      </View>
      <TouchableOpacity onPress={() => goToLocations()}>
      <Yellow/>
      </TouchableOpacity>
      </View>
      </View>
      <Bottom style={styles.bottom}/>
      </View>
    </SafeAreaView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(103,146,137)', //rgb(103,146,137)
  },
  main : {
    backgroundColor: "white",
  },
  top: {
    zIndex: 0,
    position: "absolute"
  },
  back: {
    marginLeft: 24,
    marginTop: 32
  },
  tekst:{
    zIndex: 1,
    marginTop: 100,
    marginBottom: 300,
    alignItems: "center",
  },
  txt: {
    flexDirection:'row',
    marginTop: 32,
    alignItems: "center"
  },
  bottomtxt: {
    marginTop: 220,
    alignItems: "center"
  },
  stat: {
    marginRight: 24,
    flexDirection: "column-reverse",
    alignItems: "center",
    marginLeft: 32
  },
  number: {
    fontSize: 32,
    marginBottom: 8
  },
  numberBottom: {
    fontSize: 32,
    marginBottom: 8,
    color: "white",
    marginRight: 16,
    marginLeft: 24
  },
  statsBottom: {
    flexDirection: "row",
    alignItems: "center",    
    marginBottom: 24
  },
  white: {
    color: "white",
    marginRight: 24,
    alignSelf: "center"
  },
  bottom : { 
    zIndex: 0,
   position: "absolute",
   top: 450,
  }
});

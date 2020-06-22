import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import TutorialBG from '../../assets/images/Tutorial/backgroundTuto.svg';
import First from '../../assets/images/Tutorial/first.svg';
import Second from '../../assets/images/Tutorial/second.svg';
import Third from '../../assets/images/Tutorial/third.svg';

import Next from '../../assets/images/Next.svg';
import StartExpl from '../../assets/images/StartExploringB.svg';

import Back from '../../assets/images/back.svg';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function StatsScreen({ navigation }) {

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

  const tutorial = [
    {
      text: <Text style={{top: deviceHeight/14, color: 'white', fontSize: 18, textAlign: 'center'}} >Explore unknown locations in {"\n"}your own country by giving us your {"\n"}preferred feeling.</Text>,
      img: <First />
    },
    {
      text: <Text style={{top: deviceHeight/14, color: 'white', fontSize: 18, textAlign: 'center'}} >Complete trips, pin locations and save {"\n"}statistics for the ultimate story to tell.</Text>,
      img: <Second />
    },
    {
      text: <Text style={{top: deviceHeight/14, color: 'white', fontSize: 18, textAlign: 'center'}} >Meet other people with the same {"\n"}interests for amazing stories {"\n"}and friendships.</Text>,
      img: <Third />
    },
  ]

  const [pageCount, setPageCount] = useState(1);

  const goNext = () => {
    setPageCount(pageCount + 1)
  }

  const onSwipeLeft = (gestureState) => {
    if(pageCount === 3){
      setPageCount(3)
    }else if(pageCount < 3){
      setPageCount(pageCount + 1)
    }
  }

  const onSwipeRight = (gestureState) => {
    if(pageCount === 1){
      setPageCount(1)
    }else if(pageCount > 1){
      setPageCount(pageCount - 1)
    }
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return useObserver(() => (
    <View 
      style={{
        flex: 1,
        backgroundColor: '#679289'
      }}
    >
      <TouchableOpacity style={{zIndex: 99999999, alignItems: 'flex-end', marginTop: 56, marginRight: 24}} onPress={goHome}>
        <Text style={{zIndex: 99999999,fontSize: 18, color: 'white'}}>Skip</Text>
      </TouchableOpacity>

      <GestureRecognizer
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: '#679289'
        }}
        >

          

          <TutorialBG style={{position: 'absolute', top: -80}} />
          <View style={{ alignItems: 'center', marginTop: deviceHeight/8}}>
            {tutorial[pageCount - 1].img}
            {tutorial[pageCount - 1].text}
          </View>
          <View style={{position:'absolute', bottom: deviceHeight/32, flexDirection: 'row', left: deviceWidth/2.45}}>
            <View style={{width: 10, height: 10, backgroundColor: pageCount === 1 ? 'white' : '#91B0A9', borderRadius: 50, margin: 6}}></View>
            <View style={{width: 10, height: 10, backgroundColor: pageCount === 2 ? 'white' : '#91B0A9', borderRadius: 50, margin: 6}}></View>
            <View style={{width: 10, height: 10, backgroundColor: pageCount === 3 ? 'white' : '#91B0A9', borderRadius: 50, margin: 6}}></View>
          </View>

      </GestureRecognizer>
      <TouchableOpacity onPress={pageCount < 3 ? goNext : goHome} style={{marginBottom: 56, paddingTop: 13, paddingBottom: 13, marginRight: 24, marginLeft: 24}}>
        {/* <Text style={{fontSize: 18, textAlign: 'center'}}>{pageCount === 3 ? 'Start exploring' : 'Next'}</Text> */}
        {pageCount === 3 ? <StartExpl /> : <Next />}
      </TouchableOpacity>
    </View>
    
  ));
}

const styles = StyleSheet.create({

});

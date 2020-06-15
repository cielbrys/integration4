import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useObserver } from 'mobx-react-lite';

import Camping from '../../assets/images/Camping.svg';
import Roads from '../../assets/images/Roads.svg';
import Showering from '../../assets/images/Showering.svg';
import Bathroom from '../../assets/images/Bathroom.svg';
import Supplies from '../../assets/images/Supplies.svg';
import BottomTips from '../../assets/images/BottomTips.svg';

import Back from '../../assets/images/back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ navigation }) => {

  const goHome = () => {
    navigation.navigate("Overview"); 
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });



  const tips = [
    {
      tip: <Text style={style.tipText}>When camping, making a DIY bed in {"\n"} your car by putting your mattras in the {"\n"} back of the car is a top option, or using{"\n"} a tent outside is just as good.{"\n"}{"\n"} Do make sure when looking for a place to sleep at night, it is legal to sleep there.</Text>,
      img: <Camping />
    },
    {
      tip: <Text style={style.tipText}>Try and take the smaller roads to {"\n"} make your experience as fresh as possible. {"\n"}{"\n"} Try to take brakes after lengthy {"\n"} periods of driving to calm the mind.</Text>,
      img: <Roads />
    },
    {
      tip: <Text style={style.tipText}>Finding places to shower can be {"\n"} difficult being as you won’t have don’t {"\n"} shower in your vehicle.{"\n"}{"\n"} If you have a gym membership for showering and public ba this can be a {"\n"} good option other wise use good old {"\n"} mother nature and wash up in a lake.</Text>,
      img: <Showering />
    },
    {
      tip: <Text style={style.tipText}>Going to the bathroom might also {"\n"} become a problem once your body {"\n"} decides it’s time to go.{"\n"}{"\n"} Look for public bathrooms or if you{"\n"} don’t find any in the proximty, mother {"\n"} nature will be your best friend.</Text>,
      img: <Bathroom />
    },
    {
      tip: <Text style={style.tipText}>Bring food and beverages, preferrably{"\n"} for your entire trip, this will save you{"\n"} money and time.{"\n"}{"\n"} If possible try and fit a minifridge in{"\n"} your vehicle to cool certain foods.{"\n"} Once you run out of food, just look for{"\n"} a supermarket, there should always be{"\n"} one nearby.</Text>,
      img: <Supplies />
    }
  ]

  const [tip, setTip] = useState(0);

  return (
    <View style={style.body}>
      <View>
        <TouchableOpacity style={style.back} onPress={goHome}>
          <Back />
        </TouchableOpacity>
      </View>
      <View style={style.tip}>
        <View style={style.img}>
          {tips[tip].img}
        </View>
        {tips[tip].tip}
      </View>
      <View style={style.buttons}>
        {tip > 0 ? (
          <TouchableOpacity onPress={() => setTip(tip - 1)}>
            <Back />
          </TouchableOpacity>
        ) : (
          <Button title=" " disabled={true}></Button>
        )}
        {tip < 4 ? (
          <TouchableOpacity style={style.rotate} onPress={() => setTip(tip + 1)}>
            <Back />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View style={style.svg}>
        <BottomTips />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    backgroundColor: '#90B7AC',
    paddingBottom: 100,
    paddingTop: 50
  },
  img: {
    height: 140
  },
  back: {
    marginLeft: 24,
  },
  tip: {
    alignItems: 'center',
    marginTop: 40
  },
  tipText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24,
    height: 200
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 100,
    marginLeft: 100,
    marginTop: 40
  },
  svg: {
    position: 'absolute',
    top: 350,
    zIndex: -1
  },
  rotate: {
    transform: [{ rotate: '180deg'}]
  }
});

// <Button title="back" onPress={() => setTip(tip - 1)}></Button>
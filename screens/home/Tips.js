import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import Camping from '../../assets/images/Tips/Camping.svg';
import Roads from '../../assets/images/Tips/Roads.svg';
import Showering from '../../assets/images/Tips/Showering.svg';
import Bathroom from '../../assets/images/Tips/Bathroom.svg';
import Supplies from '../../assets/images/Tips/Supplies.svg';
import BottomTips from '../../assets/images/Tips/BottomTips.svg';
import ArrowTips from '../../assets/images/Tips/ArrowTips.svg';

import Back from '../../assets/images/back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

let deviceWidth = Dimensions.get('window').height;
let imgTop, textTop, buttonBottom;
console.log(deviceWidth)
if(deviceWidth > 700){
  imgTop = 60;
  textTop = 50;
  buttonBottom = 170;
}else if(deviceWidth < 700){
  imgTop = 20;
  textTop = 5;
  buttonBottom = 125;
}
console.log(imgTop);

export default ({ navigation }) => {

  const goHome = () => {
    navigation.navigate("Home"); 
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  // const getImgTop = () => {
  //   if(deviceWidth < 700){
  //     return {
  //       marginTop: 60
  //     }

  //   }else if(deviceWidth < 670){
  //     return {
  //       marginTop: 20
  //     }
  //   }
  // }

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
          <TouchableOpacity style={style.rotate} onPress={() => setTip(tip - 1)}>
            <ArrowTips />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.margExtreme} onPress={console.log('cool')}>
            <Button title=" " disabled={true}></Button>
          </TouchableOpacity>
        )}
        {tip < 4 ? (
          <TouchableOpacity style={style.marg} onPress={() => setTip(tip + 1)}>
             <ArrowTips />
          </TouchableOpacity>
        ) : (
          <Button title=" " disabled={true}></Button>
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
    backgroundColor: '#679289',
    paddingBottom: 100,
    paddingTop: 50,
    height: deviceWidth
  },
  img: {
    height: 140
  },
  back: {
    marginLeft: 24,
    marginTop: 10
  },
  tip: {
    alignItems: 'center',
    marginTop: imgTop
  },
  tipText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginTop: textTop,
    marginLeft: 24,
    marginRight: 24,
    height: 200
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    left: '20%',
    right: '25%',
    bottom: buttonBottom
  },
  svg: {
    position: 'absolute',
    bottom: 10,
    zIndex: -1
  },
  rotate: {
    marginRight: 25,
    transform: [{ rotate: '180deg'}]
  },
  marg: {
    marginLeft: 25,
  },
  margExtreme: {
    marginLeft: 95
  }
});

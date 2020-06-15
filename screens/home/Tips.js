import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useObserver } from 'mobx-react-lite';

import Camping from '../../assets/images/Camping.svg';
import Roads from '../../assets/images/Roads.svg';
import Showering from '../../assets/images/Showering.svg';
import Bathroom from '../../assets/images/Bathroom.svg';
import Supplies from '../../assets/images/Supplies.svg';

import Back from '../../assets/images/back.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ({ navigation }) => {

  const goHome = () => {
    navigation.navigate("Overview");
  };

  navigation.setOptions({
    headerStyle: { height: 50 },
    headerTitle: null,
    headerLeft: null,
  });



  const tips = [
    {
      tip: 'When camping, making a DIY bed in your car by putting your mattras in the back of the car is a top option, or using a tent outside is just as good. Do make sure when looking for a place to sleep at night, it is legal to sleep there.',
      img: <Camping />
    },
    {
      tip: 'Try and take the smaller roads to make your experience as fresh as possible. Try to take brakes after lengthy periods of driving to calm the mind.',
      img: <Roads />
    },
    {
      tip: 'Finding places to shower can be difficult being as you won’t have don’t shower in your vehicle. If you have a gym membership for showering and public ba this can be a good option other wise use good old mother nature and wash up in a lake.',
      img: <Showering />
    },
    {
      tip: 'Going to the bathroom might also become a problem once your body decides it’s time to go. Look for public bathrooms or if you don’t find any in the proximty, mother nature will be your best friend.',
      img: <Bathroom />
    },
    {
      tip: 'Bring food and beverages, preferrably for your entire trip, this will save you money and time. If possible try and fit a minifridge in your vehicle to cool certain foods. Once you run out of food, just look for a supermarket, there should always be one nearby',
      img: <Supplies />
    }
  ]

  const [tip, setTip] = useState(0);

  return (
    <View>
      <View>
        <TouchableOpacity onPress={goHome}>
          <Back />
        </TouchableOpacity>
      </View>
      <View>
        {tips[tip].img}
        <Text>{tips[tip].tip}</Text>
      </View>
      <View>
        {tip > 0 ? (
          <Button title="back" onPress={() => setTip(tip - 1)}></Button>
        ) : (
          <></>
        )}
        {tip < 4 ? (
          <Button title="next" onPress={() => setTip(tip + 1)}></Button>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({

});

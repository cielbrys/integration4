import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swipe-image';


export default function StartScreen() {
 
    const images = [
      { url: "../assets/images/startscreen/one.gif" },
      { url: "../assets/images/startscreen/two.gif" },
      { url: "../assets/images/startscreen/tree.gif" }
    ]

  const bottom = (e) => {
  alert('Swipe Bottom')
}

  const top = (e) => {
  alert('Swipe Top')
}
  return (
    <View style={{ flex: 1 }}>
      <Image
      source="../assets/images/startscreen/tree.gif"/>
    <Swiper
      images={images}
      swipeBottom={(e) => bottom(e)}
      swipeTop={(e) => top(e)}
    />
  </View>
  );
}
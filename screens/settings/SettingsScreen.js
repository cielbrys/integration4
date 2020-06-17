import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStore } from '../../hooks/useStore';
import FlipToggle from 'react-native-flip-toggle-button';
import { set } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import Top from '../../assets/images/statsTop.svg';
import TopTitle from '../../assets/images/settings.svg';
import Back from '../../assets/images/back.svg';
import Bottom from '../../assets/images/statsBottom.svg';
import Save from '../../assets/images/save.svg';

export default function GalleryScreen({ navigation }) {
  const { uiStore } = useStore();

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const goHome = () => {
    navigation.goBack();
  };
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isActive, setActive] = useState(false);

  const changeToKm = () => {
    uiStore.currentUser.changeSystem('km');
    console.log(uiStore.currentUser.system);
  };

  const setInsta = (insta) => {
    uiStore.currentUser.setSocials(insta);
    console.log(uiStore.currentUser.socials);
  };

  const changeToMile = () => {
    uiStore.currentUser.changeSystem('mile');
    console.log(uiStore.currentUser.system);
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
        <View style={styles.input}>
          <View style={styles.type}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.textInput}
              label="eai"
              clearButtonMode="always"
              keyboardType="email-address"
              value={name}
              onChangeText={(text) => setName(text)}
              returnKeyType={'next'}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              clearButtonMode="always"
              secureTextEntry={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.visible}>
            <Text style={styles.description}>Visibile to other travellers</Text>
            <FlipToggle
              value={isActive}
              buttonWidth={100}
              buttonHeight={40}
              buttonRadius={40}
              buttonOffColor={'rgb(234,234,234)'}
              buttonOnColor={'rgb(29,120,116)'}
              sliderWidth={30}
              sliderHeight={30}
              sliderRadius={60}
              sliderOffColor={'white'}
              sliderOnColor={'white'}
              onLabel={'On'}
              offLabel={'Off'}
              labelStyle={{ color: 'white' }} //
              onToggle={() => (isActive ? setActive(false) : setActive(true))}
              onToggleLongPress={() => console.log('toggle long pressed!')}
            />
          </View>
          <View style={styles.eenheid}>
            <TouchableOpacity
              style={
                uiStore.currentUser.system === 'km' ? styles.active : styles.km
              }
              onPress={() => changeToKm()}
            >
              <Text style={styles.txt}>Km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                uiStore.currentUser.system === 'mile'
                  ? styles.active
                  : styles.miles
              }
              onPress={() => changeToMile()}
            >
              <Text style={styles.txt}>Miles</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.insta}>
            <Text style={styles.title}>Instagram</Text>
            <Text style={styles.tekst}>
              Connect to instagram to stay in contact with fellow travellers
            </Text>
            <Text style={styles.tekst}>
              Fill in your instagram page name and connect
            </Text>
            <TextInput
              style={styles.instaInput}
              label="eai"
              placeholder="@example"
              clearButtonMode="always"
              value={uiStore.currentUser.socials}
              onChangeText={(text) => setInsta(text)}
              returnKeyType={'next'}
            />
          </View>
        </View>
        <Bottom style={styles.bottom} />
      </View>
    </ScrollView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  header: {
    flex: 1,
    paddingTop: 20,
  },
  topTitle: {
    position: 'absolute',
    right: 24,
    top: 60,
  },
  main: {
    backgroundColor: 'white',
  },
  top: {
    zIndex: -20,
    position: 'absolute',
    paddingTop: 50,
  },
  visible: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 12,
  },
  textInput: {
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 0,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
  bottom: {
    zIndex: -10,
    position: 'absolute',
    top: 500,
  },
  save: {
    zIndex: 8,
  },
  input: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 80,
  },
  back: {
    marginLeft: 24,
    marginTop: 40,
  },
  description: {
    color: 'rgb(29,120,116)',
    fontSize: 18,
  },
  eenheid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  km: {
    backgroundColor: 'rgb(197,212,209)',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  miles: {
    backgroundColor: 'rgb(197,212,209)',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  active: {
    backgroundColor: 'rgb(29,120,116)',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  txt: {
    color: 'white',
    fontSize: 18,
  },
  insta: {
    marginTop: 110,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  tekst: {
    color: 'white',
    marginTop: 10,
  },
  instaInput: {
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 24,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
});

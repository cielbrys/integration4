import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { COLORS } from '../../constants/Colors';
import { MARGINS } from '../../constants/Colors';
import { FONTSIZES } from '../../constants/Colors';

import { useStore } from '../../hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import TopRegister from '../../assets/images/Register/RegisterTopBG.svg';
import Welcome from '../../assets/images/Register/Welcome.svg';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default ({ navigation, route }) => {
  const { name, email, password } = route.params;

  const [insta, setInsta] = useState('');
  const [status, setStatus] = useState('beginner');

  const { uiStore } = useStore();

  const handleSubmit = async () => {
    console.log(email);
    try {
      await uiStore.register({
        name: name,
        email: email,
        password: password,
        status: status,
        socials: insta,
      });
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  return useObserver(() => (
    <View style={style.container}>
      <TopRegister style={style.topRegister} />
      <Welcome style={style.welcome} />

      <View
        style={style.registerView}
      >
        <Text style={style.instagramText}>
          Instagram
        </Text>
        <Text style={{ fontSize: FONTSIZES.small }}>
          Connecting to instagram makes it easier to stay in contact with fellow
          travellers
        </Text>
        <TextInput
          style={style.instaInput}
          label="eai"
          placeholder="@example"
          clearButtonMode="always"
          returnKeyType={'done'}
          value={insta}
          onChangeText={(text) => setInsta(text)}
        />
      </View>

      <View style={style.status}>
        <Text style={style.statusTitle}>Which traveller are you?</Text>
        <View style={style.options}>
          <TouchableOpacity
            style={status === 'beginner' ? style.active : style.opt}
            onPress={() => setStatus('beginner')}
          >
            <Text style={{ color: status === 'beginner' ? 'white' : 'black' }}>
              Beginner
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={status === 'experienced' ? style.active : style.opt}
            onPress={() => setStatus('experienced')}
          >
            <Text
              style={{ color: status === 'experienced' ? 'white' : 'black' }}
            >
              Experienced
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={style.selectValueTravel}
      >
        <TouchableOpacity
          onPress={handleSubmit}
          style={style.selectValueButton}
        >
          <Text
            style={style.selectValueText}
          >
            Start exploring
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ));
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: deviceHeight,
  },
  topRegister: {
    position: 'absolute',
    top: 0,
  },
  welcome: {
    position: 'absolute',
    left: MARGINS.defaultValue,
    top: 50,
  },
  options: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  opt: {
    height: deviceHeight / 8,
    width: deviceWidth / 2.5,
    backgroundColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  active: {
    height: deviceHeight / 8,
    width: deviceWidth / 2.5,
    backgroundColor: '#154945',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  status: {
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
  },
  statusTitle: {
    fontSize: FONTSIZES.default,
  },
  instaInput: {
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
  registerView: {
    marginTop: 90,
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
    marginTop: 180,
    marginBottom: 30,
  },
  instagramText: {
    fontWeight: '600', 
    fontSize: FONTSIZES.default, 
    marginBottom: 10
  },
  selectValueTravel:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 56,
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
  },
  selectValueButton:{
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: COLORS.lightGreen,
    width: '100%',
  },
  selectValueText:{
    fontSize: FONTSIZES.default,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  }
});

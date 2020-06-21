import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import { COLORS } from '../../constants/Colors';
import { MARGINS } from '../../constants/Colors';
import { FONTSIZES } from '../../constants/Colors';

import TopRegister from '../../assets/images/Register/RegisterTopBG.svg';
import Welcome from '../../assets/images/Register/Welcome.svg';

import GoogleIcon from '../../assets/images/GoogleIcon.svg';
import FacebookIcon from '../../assets/images/FacebookIcon.svg';

let deviceHeight = Dimensions.get('window').height;

import { useStore } from '../../hooks/useStore';

export default ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });

  const { uiStore } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToRegisterTwo = () => {
    console.log(email);
    navigation.navigate('RegisterTwo', {
      email: email,
      name: name,
      password: password,
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.container}>
        <TopRegister style={style.topRegister} />

        <View style={style.bottom}>
          <Welcome style={style.welcome} />
          <View style={style.form}>
            <Text style={style.textInputTitle}>Create an account</Text>
            {/* <View style={style.socials}>
              <TouchableOpacity style={style.loginSocialsFB}>
                <FacebookIcon style={style.textInputSocialIcon} />
                <Text style={style.textInputSocial}>Sign in with Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.loginSocialsG}>
                <GoogleIcon style={style.textInputSocialIcon} />
                <Text style={style.textInputSocial}>Sign in with Google</Text>
              </TouchableOpacity>
            </View> */}
            <View>
              <Text style={style.textInput}>Travellers name</Text>
              <TextInput
                style={style.input}
                value={name}
                keyboardType="default"
                autoCorrect={false}
                onChangeText={(text) => setName(text)}
                returnKeyType={'next'}
              />
            </View>

            <View>
              <Text style={style.textInput}>Email</Text>
              <TextInput
                style={style.input}
                keyboardType="email-address"
                clearButtonMode="always"
                value={email}
                onChangeText={(text) => setEmail(text)}
                returnKeyType={'next'}
              />
            </View>

            <View>
              <Text style={style.textInput}>Password</Text>
              <TextInput
                style={style.input}
                clearButtonMode="always"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                returnKeyType={'next'}
                textContentType={'oneTimeCode'}
              />
            </View>

            <View>
              <Text style={style.textInput}>Password confirmation</Text>
              <TextInput
                style={style.input}
                clearButtonMode="always"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                returnKeyType={'done'}
              />
            </View>

            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={goToRegisterTwo}
                underlayColor="#fff"
                style={style.loginButton}
              >
                <Text style={style.loginText}>Create an account</Text>
              </TouchableOpacity>
            </View>
            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={goToLogin}
                underlayColor="#fff"
                style={style.loginButtonSecondary}
              >
                <Text style={style.loginTextSecondary}>
                  I already have an account, sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  welcome: {
    marginBottom: deviceHeight / 8,
    marginTop: deviceHeight / 14,
  },
  container: {
    flex: 1,
  },
  bottom: {
    marginLeft: MARGINS.defaultValue,
    marginRight: MARGINS.defaultValue,
  },
  topRegister: {
    position: 'absolute',
    top: 0,
  },
  loginTextSecondary: {
    color: '#4E4E4E',
    fontSize: FONTSIZES.small,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButtonSecondary: {
    marginTop: 0,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    borderRadius: 0,
  },
  loginText: {
    fontSize: FONTSIZES.default,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButton: {
    marginTop: 20,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 0,
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  loginSocialsFB: {
    marginTop: 10,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: '#475993',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
  },
  loginSocialsG: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: '#D4514C',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
  },
  textInputSocial: {
    fontSize: FONTSIZES.small,
    fontWeight: '600',
    color: 'white',
  },

  textInputTitle: {
    fontSize: FONTSIZES.default,
  },
  textInput: {
    fontSize: FONTSIZES.small,
    marginBottom: 12,
  },
  input: {
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 0,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
  textInputSocialIcon: {
    width: 25,
    height: 25,
  },
  socials: {
    marginBottom: 10,
  },
});

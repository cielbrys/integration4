import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import TopRegister from '../../assets/images/TopRegister.svg';
import GoogleIcon from '../../assets/images/GoogleIcon.svg';
import FacebookIcon from '../../assets/images/FacebookIcon.svg';

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

  const goToRegisterTwo = async () => {
    try {
      await uiStore.register({
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('RegisterTwo');
  };

  return (
    <View style={style.container}>
      <TopRegister style={style.topRegister} />
      <Text style={style.textInputTitle}>Create an account</Text>
      <View style={style.socials}>
        <TouchableOpacity style={style.loginSocialsFB}>
          <FacebookIcon style={style.textInputSocialIcon} />
          <Text style={style.textInputSocial}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.loginSocialsG}>
          <GoogleIcon style={style.textInputSocialIcon} />
          <Text style={style.textInputSocial}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={style.form}>
        <Text style={style.textInput}>Travellers name</Text>
        <TextInput
          style={style.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={style.textInput}>Email</Text>
        <TextInput
          style={style.input}
          keyboardType="email-address"
          clearButtonMode="always"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={style.textInput}>Password</Text>
        <TextInput
          style={style.input}
          clearButtonMode="always"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={style.textInput}>Password confirmation</Text>
        <TextInput
          style={style.input}
          clearButtonMode="always"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={style.buttonWrapper}>
          <Button title="Create account" onPress={() => goToRegisterTwo()} />
        </View>
        <View style={style.buttonWrapper}>
          <Button
            title="I already have an account! Sign in"
            onPress={goToLogin}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  loginSocialsFB: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 10,
    paddingTop: 13,
    paddingBottom: 13,
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
    marginRight: 24,
    marginLeft: 24,
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 13,
    paddingBottom: 13,
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
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  textInputTitle: {
    marginLeft: 24,
    fontSize: 18,
  },
  textInput: {
    marginLeft: 24,
    fontSize: 16,
    marginBottom: 12,
  },
  topRegister: {
    position: 'absolute',
    top: -100,
  },
  container: {
    marginTop: 100,
  },
  input: {
    paddingLeft: 10,
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 20,
    marginTop: 0,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
  buttonWrapper: {
    marginBottom: 16,
  },
  textInputSocialIcon: {
    width: 25,
    height: 25,
  },
});

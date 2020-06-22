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
let deviceWidth = Dimensions.get('window').width;

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [insta, setInsta] = useState('');
  const [status, setStatus] = useState('beginner');
  const [errorName, setErrorName] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorInsta, setErrorInsta] = useState("");
  const [errorConfirmation, setErrorConfirmation] = useState("");

  const handleMoreName = text => {
    setName(text);
    setErrorName("")
  }

  const handleMoreMail = text => {
    setEmail(text);
    setErrorMail("")
  }

  const handleMorePassword = text => {
    setPassword(text);
    setErrorPassword("")
  }

  const handleMoreConfirmationPassword = text => {
    setConfirmPassword(text)
    setErrorConfirmation("")
  }

  const handleSubmit = async() => {
    if(name === ""){
      setErrorName("Please provide a username")
    } else if(email === ""){
      setErrorMail("Please provide an email")
    } else if(password != confirmPassword){
      setErrorConfirmation("Confirmation does not match")
    }else if(password === ""){
      setErrorPassword("Please enter a strong password")
    } else if(insta === ""){
      setErrorInsta("Please enter your instagram handle")
    } else {


      try{
        await uiStore.register({
          name:name,
          email:email,
          password: password,
          status: status,
          socials: insta,
        });
        history.push(ROUTES.home);
      }catch (error) {
        console.log(error.code)
  
        if(error.code === "auth/invalid-email" && error.code === "auth/weak-password"){
          setErrorMail("Please provide an email")
          setErrorPassword('This password is not strong enough')
        } else if (error.code === "auth/invalid-email"){
          setErrorMail("Please provide an email")
        }else if (error.code === "auth/weak-password"){
          setErrorPassword('This password is not strong enough')
        }
      }


    }
    
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={style.container}>
        <TopRegister style={style.topRegister} />
        
        <View style={style.bottom}>
          <Welcome style={style.welcome} />
          <View style={style.form}>
            <Text style={style.textInputTitle}>Create an account</Text>
            <View>
              <Text style={style.textInput}>Travellers name</Text>
              
              <Text style={{color: 'red', fontSize: 14}}>{errorName}</Text>
              <TextInput
                style={style.input}
                value={name}
                keyboardType="default"
                autoCorrect={false}
                onChangeText={(text) => handleMoreName(text)}
                returnKeyType={'next'}
                required
              />
            </View>

            <View>
              <Text style={style.textInput}>Email</Text>
              <Text style={{color: 'red', fontSize: 14}}>{errorMail}</Text>
              <TextInput
                style={style.input}
                keyboardType="email-address"
                clearButtonMode="always"
                value={email}
                onChangeText={(text) => handleMoreMail(text)}
                returnKeyType={'next'}
              />
            </View>

            <View>
              <Text style={style.textInput}>Password</Text>
              <Text style={{color: 'red', fontSize: 14}}>{errorPassword}</Text>
              
              <TextInput
                style={style.input}
                clearButtonMode="always"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => handleMorePassword(text)}
                returnKeyType={'next'}
                textContentType={'oneTimeCode'}
              />
            </View>

            <View>
              <Text style={style.textInput}>Password confirmation</Text>
              <Text style={{color: 'red', fontSize: 14}}>{errorConfirmation}</Text>
              
              <TextInput
                style={style.input}
                clearButtonMode="always"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => handleMoreConfirmationPassword(text)}
                returnKeyType={'done'}
              />
            </View>

            <View>
              <Text style={style.instagramText}>
                Instagram
              </Text>
              <Text style={{ fontSize: FONTSIZES.small, marginBottom: 12 }}>
                Connecting to instagram makes it easier to stay in contact with fellow
                travellers
              </Text>
              <Text style={{color: 'red', fontSize: 14}}>{errorInsta}</Text>
              
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

            <View style={style.buttonWrapper}>
              <TouchableOpacity
                onPress={handleSubmit}
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
  statusTitle: {
    fontSize: FONTSIZES.small,
    marginBottom: 12
  },
  opt: {
    height: 56,
    width: deviceWidth / 2.5,
    backgroundColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  active: {
    height: 56,
    width: deviceWidth / 2.5,
    backgroundColor: '#154945',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  instaInput: {
    paddingLeft: 10,
    marginBottom: 20,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: '#EAEAEA',
    borderRadius: 0,
  },
  instagramText: {
    fontWeight: '600', 
    fontSize: FONTSIZES.default, 
    marginBottom: 10
  },
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
    marginBottom: 24,
    fontWeight: '600', 
  },
  textInput: {
    fontSize: FONTSIZES.small,
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
  status:{
    marginBottom: 40
  }
});
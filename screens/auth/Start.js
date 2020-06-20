import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import StartExploring from '../../assets/images/StartExploring.svg';
import Landscape from '../../assets/images/Start/BGstart.svg';

import { COLORS } from '../../constants/Colors';
import { MARGINS } from '../../constants/Colors';
import { FONTSIZES } from '../../constants/Colors';

export default ({ navigation }) => {

  const goToLogin = () => {
    navigation.navigate("Login")
  }

  const goToRegister = () => {
    navigation.navigate("Register")
  }

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });
  
  return (
    <View style={styles.view}>
      <StartExploring style={styles.logo} />
      <Landscape style={styles.container} />
        <View style={styles.bottom}>
          <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={goToLogin}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.registerScreenButton}
              onPress={goToRegister}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Create an account</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
  },
  bottom: {
    width: '100%',
    alignSelf: 'flex-end',
    marginBottom: 48
  },
  container: {
    position: 'absolute',
    top: 240
  },
  body: {
    backgroundColor: 'white'
  },
  logo: {
    marginTop: 58,
    position: 'absolute'
  },
  backgroundImage: {
    flex: 1
  },
  signin: {
    width: 366,
    backgroundColor: 'white'
  },
  loginScreenButton:{
    marginRight: MARGINS.defaultValue,
    marginLeft:MARGINS.defaultValue,
    marginTop:0,
    paddingTop:MARGINS.buttonPadding,
    paddingBottom:MARGINS.buttonPadding,
    backgroundColor:COLORS.lightGreen,
    borderRadius: 0,
  },
  registerScreenButton:{
    marginRight:MARGINS.defaultValue,
    marginLeft:MARGINS.defaultValue,
    marginTop:MARGINS.buttonPadding,
    paddingTop:MARGINS.buttonPadding,
    paddingBottom:MARGINS.buttonPadding,
    backgroundColor:'#679289',
    borderRadius: 0,
  },
  loginText:{
    fontSize: FONTSIZES.default,
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});

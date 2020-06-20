import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useStore } from '../../hooks/useStore';
import { useHistory } from 'react-router-dom';

import { COLORS } from '../../constants/Colors';
import { MARGINS } from '../../constants/Colors';
import { FONTSIZES } from '../../constants/Colors';

import Landscape from '../../assets/images/Login/BG.svg';

import { TouchableOpacity } from 'react-native-gesture-handler';

let deviceHeight = Dimensions.get('window').height;

console.log(deviceHeight)

export default ({ navigation }) => {

  const goToRegister = () => {
    navigation.navigate("Register");
  }

  navigation.setOptions({
    headerStyle: { height: 0 },
    headerTitle: null,
    headerLeft: null,
  });
  
  const { uiStore } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [focus, setFocus] = useState("light");

  const handleSubmit = async () => {
    try {
      await uiStore.login(email, password);
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  }

  const onFocus = () => {
    if(deviceHeight < 700){
      setFocus('dark')
    }
  }

  const onBlur = () => {
    if(deviceHeight < 700){
      setFocus('light')
    }
  }
  
  return (
      <View style={styles.view}>
        <Landscape style={styles.container}/>
        <View style={styles.bottom}>
          
          <Text 
            style={
              focus === 'light'
              ? styles.text 
              : styles.textDark}
          >
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            label="eai"
            clearButtonMode="always"
            keyboardType="email-address"
            placeholder="someone@example.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType = {"next"}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <Text style={focus === 'light' ? styles.text : styles.textDark}>Password</Text>
          <TextInput
            style={styles.textInput}
            clearButtonMode="always"
            secureTextEntry={true}
            placeholder="•••••••"
            value={password}
            onChangeText={(text) => setPassword(text)}
            returnKeyType = {"done"}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <View>
            <TouchableOpacity
              onPress={handleSubmit}
              underlayColor='#fff'
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Login</Text>  
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={goToRegister}
              underlayColor='#fff'
              style={styles.loginButtonSecondary}
            >
              <Text style={styles.loginTextSecondary}>I don't have an account, create one</Text>  
            </TouchableOpacity>
          </View>
        </View>
      </View>
  )
};


const styles = StyleSheet.create({
  loginTextSecondary: {
    color: COLORS.lightGrey,
    fontSize: 16,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  loginButtonSecondary: {
    marginRight: MARGINS.defaultValue,
    marginLeft: MARGINS.defaultValue,
    marginTop:0,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    borderRadius: 0,
  },
  loginButton:{
    marginRight: MARGINS.defaultValue,
    marginLeft: MARGINS.defaultValue,
    marginTop:30,
    paddingTop: MARGINS.buttonPadding,
    paddingBottom: MARGINS.buttonPadding,
    backgroundColor: COLORS.lightGreen,
    borderRadius: 0,
  },
  loginText: {
    fontSize: FONTSIZES.default,
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  container: {
    position: 'absolute',
    top: 90
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    marginBottom: MARGINS.defaultValue
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginLeft:MARGINS.defaultValue,
    marginBottom: 12
  },
  textDark: {
    fontSize: 16,
    color: '#154945',
    marginLeft:MARGINS.defaultValue,
    marginBottom: 12,
    width: '100%',
    paddingLeft: 10,
  },
  textInput: {
    paddingLeft: 10,
    marginRight:MARGINS.defaultValue,
    marginLeft:MARGINS.defaultValue,
    marginBottom: 20,
    marginTop:0,
    paddingTop:MARGINS.buttonPadding,
    paddingBottom:MARGINS.buttonPadding,
    backgroundColor:'#EAEAEA',
    borderRadius: 0,
  }
});
import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useStore } from '../../hooks/useStore';
import { useHistory } from 'react-router-dom';

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
    color:'#C4C4C4',
    fontSize: 16,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  loginButtonSecondary: {
    marginRight:24,
    marginLeft:24,
    marginTop:0,
    paddingTop:13,
    paddingBottom:13,
    borderRadius: 0,
  },
  loginButton:{
    marginRight:24,
    marginLeft:24,
    marginTop:30,
    paddingTop:13,
    paddingBottom:13,
    backgroundColor:'#7FB1A7',
    borderRadius: 0,
  },
  loginText: {
    fontSize: 18,
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
    marginBottom: 24
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginLeft:24,
    marginBottom: 12
  },
  textDark: {
    fontSize: 16,
    color: '#154945',
    marginLeft:24,
    marginBottom: 12,
    width: '100%',
    paddingLeft: 10,
  },
  textInput: {
    paddingLeft: 10,
    marginRight:24,
    marginLeft:24,
    marginBottom: 20,
    marginTop:0,
    paddingTop:13,
    paddingBottom:13,
    backgroundColor:'#EAEAEA',
    borderRadius: 0,
  }
});
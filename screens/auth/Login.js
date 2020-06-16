import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../../hooks/useStore';
import { useHistory } from 'react-router-dom';

import Landscape from '../../assets/images/Login/BG.svg';

import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const handleSubmit = async () => {
    try {
      await uiStore.login(email, password);
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <View style={styles.view}>
        <Landscape style={styles.container}/>
        <View style={styles.bottom}>
          
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            label="eai"
            clearButtonMode="always"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType = {"next"}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            clearButtonMode="always"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
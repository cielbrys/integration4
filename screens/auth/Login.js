import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useStore } from '../../hooks/useStore';
import { useHistory } from 'react-router-dom';

import Landscape from '../../assets/images/LandscapeSignin.svg';

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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await uiStore.login(email, password);
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <KeyboardAvoidingView 
      style={styles.view}
      behavior={Platform.OS == "ios" ? "margin" : "height"}
    >
      <Landscape style={styles.container}/>
      <View 
        style={styles.bottom}
      >
        
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          label="eai"
          clearButtonMode="always"
          keyboardType="email-address"
          placeholder="Fill in your email."
          value={email}
          onChangeText={(text) => setEmail(text)}
          returnKeyType = {"next"}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          clearButtonMode="always"
          secureTextEntry={true}
          placeholder="Fill in your password."
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View>
          <Button title="Login" onPress={handleSubmit} />
        </View>
        <View>
          <Button title="Don't have an account? Create one" onPress={goToRegister} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80
  },
  view: {
    flex: 1,
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    marginBottom: 48
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

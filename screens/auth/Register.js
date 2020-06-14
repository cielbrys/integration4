import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default ({ navigation }) => {

  const goToLogin = () => {
    navigation.navigate("Login")
  }
  
  navigation.setOptions({
    headerTitle: null,
    headerLeft: null,
  });
  
  return (
    <View>
      <Text>registreer pagina</Text>
      <Button title="I already have an account! Sign me in" onPress={goToLogin} />
    </View>
  )
};

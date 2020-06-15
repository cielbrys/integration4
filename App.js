import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'mobx-react-lite/batchingForReactNative';

import BottomTabNavigator from './navigation/BottomTabNavigator';

import useLinking from './navigation/useLinking';
import { useStore } from './hooks/useStore';
import { useObserver } from 'mobx-react-lite';

import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import RegisterTwo from './screens/auth/RegisterTwo';
import Start from './screens/auth/Start';

const Stack = createStackNavigator();

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  const { uiStore } = useStore();

  const isLoggedIn = false;

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return useObserver(() => {
    if (!isLoadingComplete && !props.skipLoadingScreen) {
      return null;
    } else {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.Os == 'ios' ? 'padding' : 'height'}
        >
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            {(isLoggedIn) ? (
              <Stack.Navigator headerMode="none">
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen 
                  name="Start" 
                  component={Start} 
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="RegisterTwo" component={RegisterTwo} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </KeyboardAvoidingView>
      );
    }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

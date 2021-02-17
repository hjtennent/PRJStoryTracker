/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Home from './app/component/screens/Home';
import styles from './app/component/styles/App';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './app/component/screens/Loading';
import LogIn from './app/component/screens/LogIn';
import SignUp from './app/component/screens/SignUp';
import Updates from './app/component/screens/Updates';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Updates" component={Updates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

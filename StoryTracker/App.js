/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import Home from './app/component/screens/Home';
import styles from './app/component/styles/App';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './app/component/screens/Loading';
import LogIn from './app/component/screens/LogIn';
import SignUp from './app/component/screens/SignUp';
import Updates from './app/component/screens/Updates';
import auth from "@react-native-firebase/auth"

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const [isSignedIn, setIsSignedIn] = useState(false)

  // Handle user state changes
  function onAuthStateChanged(user) {
    user ? setIsSignedIn(true) : setIsSignedIn(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Updates" component={Updates} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={LogIn} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

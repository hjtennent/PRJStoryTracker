/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import Home from './app/component/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './app/component/screens/LogIn';
import SignUp from './app/component/screens/SignUp';
import Updates from './app/component/screens/Updates';
import Stories from './app/component/screens/Stories';
import History from './app/component/screens/History';
import messaging from "@react-native-firebase/messaging";
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {

  //handle foregroud notifications
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const message = JSON.stringify(remoteMessage)
      console.log("A new FCM message has arrived: ", message)
      Alert.alert(remoteMessage['notification']['title'], remoteMessage['notification']['body'])
    });
    return unsubscribe;
  }, []);

  function HomeStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Updates" component={Updates} />
      </Stack.Navigator>
    )
  }

  function StoriesStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Updates" component={Updates} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    )
  }

  function Auth() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={LogIn} />
      </Stack.Navigator>
    )
  }

  function LandingStack() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Stories" component={StoriesStackNavigator} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        <Stack.Screen name="LandingStack" component={LandingStack} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

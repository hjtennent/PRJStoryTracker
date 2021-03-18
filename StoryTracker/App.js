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
import Updates from './app/component/screens/Updates';
import Stories from './app/component/screens/Stories';
import History from './app/component/screens/History';
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import { Alert } from 'react-native';
import { getStoryHeadlineFromID } from './app/helper/firebase/firebase';
import Auth from './app/component/navigators/Auth';
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {

  //Handle notifications when the app is in the foreground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const message = JSON.stringify(remoteMessage)
      const notificationData = Object.entries(remoteMessage['data'])
      const storyID = notificationData[0][0]
      const headline = await getStoryHeadlineFromID(auth().currentUser.uid, storyID)
      Alert.alert(remoteMessage['notification']['title'], "There are new updates for: \n" +
            headline + "\n Check it out in the Stories tab.")
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

  function LandingStack() {
    return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'HomeStack') {
              return <Icon name="home" size={30} color={color} />;
            } else if (route.name === 'StoriesStack') {
              return <Icon name="book" size={30} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#4D8E6B',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="StoriesStack" component={StoriesStackNavigator} />
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

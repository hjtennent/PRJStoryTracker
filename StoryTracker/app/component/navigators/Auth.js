import React from 'react';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import { createStackNavigator } from '@react-navigation/stack';

export default Auth = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
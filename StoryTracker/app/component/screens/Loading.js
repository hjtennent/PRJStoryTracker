import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import styles from '../styles/Loading'
import auth from "@react-native-firebase/auth"

const Loading = (props) => {

  // Handle user state changes
  function onAuthStateChanged(user) {
    props.navigation.navigate(user ? "Home" : "SignUp")
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator size="large" color="#e93766" />
      </View>
    </>
  );
}

export default Loading;


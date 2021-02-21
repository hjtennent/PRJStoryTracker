import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import styles from '../styles/Loading'

const Loading = () => {

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


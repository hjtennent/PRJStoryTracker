import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import styles from '../styles/Updates';

const Updates = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { storyUpdates } = route.params

  if (isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>Updates</Text>
      </View>
      <View style={styles.storyContainer}>
          {Object.entries(storyUpdates).map((key, value) => {
            console.log("Key", key)
            console.log("Value", value)
            return (
              <>
                <Text id={value} style={styles.storyText}>{key[0].substr(0,40)}: {key[1]}</Text>
              </>
            )
          })}
      </View>
    </>
  )
}

export default Updates;
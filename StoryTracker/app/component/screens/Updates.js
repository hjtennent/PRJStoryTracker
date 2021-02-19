import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Linking,
  ScrollView
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

  openLink = (link) => {
    Linking.openURL(link)
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.mainText}>Updates</Text>
        </View>
        <View style={styles.storyContainer}>
            <Text>All stories found:</Text>
            {Object.entries(storyUpdates).map((key, value) => {
              return (
                <>
                  <Text key={value} style={styles.storyText}>{key[0].substr(0,35)}: {key[1]}</Text>
                </>
              )
            })}
        </View>
        <View style={styles.storyContainer}>
            <Text>Stories you may be interested in: </Text>
            {Object.entries(storyUpdates).map((key, value) => {
              if (key[1] > 0) {
                return (
                  <>
                    <TouchableOpacity key={value + 'i'} style={styles.storyText} onPress={() => openLink(key[0])}>
                      <Text>{key[0]}</Text>
                    </TouchableOpacity>
                    <Text>Similarity: {key[1]}</Text>
                    <Text>-----</Text>
                  </>
                )
              }
              
            })}
        </View>
      </ScrollView>
    </>
  )
}

export default Updates;
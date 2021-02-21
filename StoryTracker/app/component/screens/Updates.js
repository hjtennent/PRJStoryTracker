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
import Loading from './Loading';

const Updates = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { storyUpdates } = route.params

  const similarStories = Object.entries(storyUpdates).filter((key, value) => key[1]['score'] > 0)
  console.log(similarStories)
  const otherStories = Object.entries(storyUpdates).filter((key, value) => key[1]['score'] == 0)
  console.log(otherStories)

  if (isLoading) {
    return (
      <><Loading/></>
    )
  }

  openLink = (link) => {
    Linking.openURL(link)
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Most similar stories: </Text>
          <View style={styles.similarStoriesContainer}>
              {similarStories.map(story => {
                return (
                  <View style={styles.similarStoryBox}>
                    <View style={styles.headlineContainer}>
                      <TouchableOpacity key={story[0]} onPress={() => openLink(story[1]['url'])}>
                        <Text style={styles.storyText}>{story[0]}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.similarityLabelContainer}>
                      <Text style={styles.storyText}>{story[1]['score']}</Text>
                    </View>
                  </View>
                )
              })}
          </View>
          <Text style={styles.titleText}>Other stories:</Text>
          {otherStories.map(story => {
            return (
              <>
                <View style={styles.allStoryBox}>
                  <TouchableOpacity key={story[0]} onPress={() => openLink(story[1]['url'])}>
                    <Text key={story[0] + 'all'} style={styles.storyText}>{story[0]}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          })}
        </View>
      </ScrollView>
    </>
  )
}

export default Updates;
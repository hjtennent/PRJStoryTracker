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
import StoryBox from '../common/StoryBox';
import styles from '../styles/Updates';
import Loading from './Loading';
import { addStoryLinkToUserHistory } from '../../helper/firebase/firebase'
import auth from '@react-native-firebase/auth'

const Updates = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const { storyID, storyUpdates, fromNotification } = route.params

  const similarStories = []
  const otherStories = []
  if (fromNotification) {
    console.log(storyUpdates)
    Object.entries(storyUpdates).forEach(item => {
      if (item[1] > 0) {
        similarStories.push(item)
      } else {
        otherStories.push(item)
      }
    })
  } else {
    Object.entries(storyUpdates).forEach(item => {
      if (item[1]['score'] > 0) {
        similarStories.push(item)
      } else {
        otherStories.push(item)
      }
    });
  }

  if (isLoading) {
    return (
      <><Loading/></>
    )
  }

  openLink = (link) => {
    console.log("In openLink")
    addStoryLinkToUserHistory(user.uid, storyID, link)
    Linking.openURL(link)
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Most similar stories: </Text>
          <View style={styles.similarStoriesContainer}>
            {similarStories.length > 0 ?
              similarStories.map((similarStory,i) => {
                return (
                  <StoryBox key={i} url={fromNotification ? similarStory[0] : similarStory[1]['url']} 
                            similarity={fromNotification ? similarStory[1] : similarStory[1]['score']}
                            onPress={() => openLink(fromNotification ? similarStory[0] : similarStory[1]['url'])} />
                )
              })
              :
              <View style={styles.noStoriesContainer}>
                <Text style={styles.noStoriesText}>No similar stories found.</Text>
              </View>
            }
          </View>
          <Text style={styles.titleText}>Other stories:</Text>
          {otherStories.length > 0 ?
            otherStories.map((otherStory,i) => {
              return (
                <StoryBox key={i} url={fromNotification ? otherStory[0] : otherStory[1]['url']} 
                          similarity={fromNotification ? otherStory[1] : otherStory[1]['score']}
                          onPress={() => openLink(fromNotification ? otherStory[0] : otherStory[1]['url'])} />
              )
            })
            :
            <View style={styles.noStoriesContainer}>
              <Text style={styles.noStoriesText}>No other stories found.</Text>
            </View>
          }
        </View>
      </ScrollView>
    </>
  )
}

export default Updates;
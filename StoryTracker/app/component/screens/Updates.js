import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  AppState,
  Linking,
  ScrollView
} from 'react-native';
import StoryBox from '../common/StoryBox';
import styles from '../styles/Updates';
import Loading from './Loading';
import { addStoryLinkToUserHistory } from '../../helper/firebase/firebase'
import auth from '@react-native-firebase/auth'

const Updates = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const { storyID, storyUpdates } = route.params

  const similarStories = []
  const otherStories = []
  Object.entries(storyUpdates).forEach(item => {
    if (item[1]['score'] > 0) {
      similarStories.push(item)
    } else {
      otherStories.push(item)
    }
  });

  if (isLoading) {
    return (
      <><Loading/></>
    )
  }

  const openLink = (link) => {
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
                  <StoryBox key={i} 
                            text={similarStory[0]}
                            url={similarStory[1]['url']} 
                            similarity={similarStory[1]['score']}
                            onPress={() => openLink(similarStory[1]['url'])} />
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
                <StoryBox key={i} 
                          text={otherStory[0]}
                          url={otherStory[1]['url']} 
                          similarity={otherStory[1]['score']}
                          onPress={() => openLink(otherStory[1]['url'])} />
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
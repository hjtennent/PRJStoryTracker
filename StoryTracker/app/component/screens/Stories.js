import React, { useEffect, useState } from 'react';
import {
  Linking,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/Stories';
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import Loading from './Loading';
import StoryBox from "../common/StoryBox"
import { getStoryObject } from '../../helper/models/StoryModel';
import { getStoryUpdates } from '../../helper/api/api';

const Stories = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const [followedStories, setFollowedStories] = useState([])

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/stories/`)
      .on('value', snapshot => {
        fetchedStories = snapshot.val()
        stories = []
        Object.entries(fetchedStories).forEach(item => {
          object = getStoryObject(item[0], item[1]["url"], item[1]["title"], "", item[1]["authors"], item[1]["date"], item[1]["topic"])
          stories.push(object)
        })
        setFollowedStories(stories);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/${user.uid}`)
        .off('value', onValueChange);
  }, [user.uid]);

  if (isLoading) {
    return (
      <><Loading /></>
    )
  }

  openLink = (link) => {
    Linking.openURL(link)
  }

  getUpdatesButton = (id, keywords, test) => {
    setIsLoading(true)
    getStoryUpdates(id, keywords, test).then((response) => {
      props.navigation.navigate("Updates", {
        storyUpdates: response["SIMILARITIES"]
      })
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.mainText}>Your Followed Stories</Text>
        </View>
        <View style={styles.storyContainer}>
          {followedStories !== {} ?
            followedStories.map((story,i) => {
              return (
                <View style={styles.similarStoryBox} key={i}>
                  <View style={styles.headlineContainer}>
                    <TouchableOpacity onPress={() => openLink(story['url'])}>
                      <Text style={styles.storyText}>{story['title']}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getUpdatesButton(story['id'], story['keywords'], true)}>
                      <Text styles={styles.storyText}>Get Updates</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          :
            <>
              <Text>No followed stories.</Text>
            </>
          }
        </View>
      </View>
    </>
  )
}

export default Stories;
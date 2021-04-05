import React, { useEffect, useState } from 'react';
import {
  Linking,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/Stories';
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import Loading from './Loading';
import { getStoryObject } from '../../helper/models/StoryModel';
import { getStoryUpdates } from '../../helper/api/api';
import { deleteStory } from '../../helper/firebase/firebase';
import StoryButton from '../common/StoryButton';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Animated } from 'react-native';

const Stories = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const [followedStories, setFollowedStories] = useState([])

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/stories/`)
      .on('value', snapshot => {
        fetchedStories = snapshot.val()
        stories = []
        if (fetchedStories != null) {
          Object.entries(fetchedStories).forEach(item => {
            object = getStoryObject(item[0], item[1]["url"], item[1]["title"],
                                    "", item[1]["authors"], item[1]["date"],
                                    item[1]["topic"])
            stories.push(object)
          })
        }
        setFollowedStories(stories);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/${user.uid}/stories/`)
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
      navigation.navigate("Updates", {
        storyID: id,
        storyUpdates: response["SIMILARITIES"]
      })
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  showStoryHistory = (storyID) => {
    navigation.navigate("History", {
      storyID
    })
  }

  const DeleteAction = ({ progress, dragX, onPress }) => {
    //Move text when swiped
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [-0.7, 0],
    });
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={onPress}>
        <Animated.Text
          style={[styles.deleteStoryAction,
          {
            transform: [{ translateX: trans }],
          }]}
        >
          Delete
        </Animated.Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.mainText}>Your Followed Stories</Text>
        </View>
        <ScrollView style={styles.storyContainer}>
          {followedStories !== {} ?
            followedStories.map((story,i) => {
              const deletePress = () => {
                deleteStory(user.uid, story['id'])
              }
              return (
                <Swipeable key={i} renderRightActions={(progress, dragX) => 
                  <DeleteAction progress={progress} dragX={dragX} 
                    onPress={deletePress}/>
                }>
                  <View style={styles.similarStoryBox}>
                    <View style={styles.headlineContainer}>
                      <View style={styles.headline}>
                        <TouchableOpacity onPress={() => openLink(story['url'])}>
                          <Text style={styles.storyText}>{story['title']}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.updatesButton}>
                        <View style={styles.buttonContainer}>
                          <StoryButton makeHighlight={false} text={"Get Updates"} 
                            onPress={() => 
                              getUpdatesButton(story['id'], story['keywords'],
                                               false)
                            } smallText={true} />
                        </View>
                        <StoryButton makeHighlight={false} text={"View History"} 
                          onPress={() => showStoryHistory(story['id'])} 
                          smallText={true} />
                      </View>
                    </View>
                  </View>
                </Swipeable>
              )
            })
          :
            <>
              <Text>No followed stories.</Text>
            </>
          }
        </ScrollView>
      </View>
    </>
  )
}

export default Stories;
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/Home';
import { getStoryDetails, getStoryUpdates } from "../../helper/api/api";
import { addTopic } from "../../helper/firebase/firebase";
import auth from "@react-native-firebase/auth"
import Loading from './Loading';
import { getStoryObject } from "../../helper/models/StoryModel"

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState(false)
  const [story, setStory] = useState({})
  const [storyLink, onEnterStoryLink] = React.useState("Enter story link...")
  const [storyURL, setStoryURL] = React.useState("")
  const [storyDate, setStoryDate] = React.useState("")
  const [storyAuthor, setStoryAuthor] = React.useState("")
  const [storyDescription, setStoryDescription] = React.useState("Description")
  const [storyKeywords, setStoryKeywords] = React.useState("")
  const [storyTitle, setStoryTitle] = React.useState("")
  const [savedStoryID, setSavedStoryID] = React.useState("")
  const [savedStoryTopic, setSavedStoryTopic] = React.useState([])
  const user = auth().currentUser

  if (isLoading) {
    return (
      <><Loading /></>
    )
  }

  const logout = () => {
    auth().signOut()
      .then(() => props.navigation.navigate('Login'))
  }

  const retrieveStory = () => {
    setIsLoading(true)
    getStoryDetails(storyLink).then(response => {
      console.log("Home.js: " + response["URL"])
      storyObject = getStoryObject(response["URL"], response["TITLE"], response["STORY"], response["AUTHORS"], response["DATE"], response["KEYWORDS"])
      setStory(storyObject)
      setIsStoryLoaded(true)
      //Call Firebase to save topic to database
      console.log(storyObject)
      firebaseResponse = addTopic(storyObject["url"], storyObject["keywords"], storyObject["date"])
      if (firebaseResponse != null) {
        setSavedStoryID(firebaseResponse.key)
        setSavedStoryTopic(firebaseResponse.keywords)
      }
      setIsLoading(false)
    })
    .catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  const getUpdatesButton = (test=false) => {
    if (savedStoryID == "" || savedStoryTopic == []) {
      Alert.alert("No currently followed story.")
    } else {
      setIsLoading(true)
      console.log('Home.js: ', savedStoryTopic)
      getStoryUpdates(savedStoryID, savedStoryTopic, test).then(response => {
        console.log("Home.js", response["SIMILARITIES"])
        props.navigation.navigate("Updates", {
          originalStory: story,
          storyUpdates: response["SIMILARITIES"]
        })
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
    }
  }

  const cancel = () => {
    setIsStoryLoaded(false)
    setStoryAuthor("")
    setStoryDate("")
    setStoryDescription("")
    setStoryKeywords("")
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.greenFollowStoryButton}
            onPress={() => logout()}>
              <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.mainText}>Welcome to the Story Tracker, {user && user.email}</Text>
        </View>
        <View style={styles.linkInputContainer}>
          <TextInput style={styles.topicLinkInput} onChangeText={text => onEnterStoryLink(text)} value={storyLink} />
          <TouchableOpacity
            style={isStoryLoaded ? styles.greenFollowStoryButton : styles.orangeFollowStoryButton}
            onPress={() => retrieveStory()}>
              <Text style={styles.buttonText}>Get Story Details</Text>
          </TouchableOpacity>
        </View>
        {isStoryLoaded && 
          <View style={styles.storyContainer}>
            <Text style={styles.storyInfo}>Title: {story['title']}</Text>
            <Text style={styles.storyInfo}>Date: {story['date']}</Text>
            <Text style={styles.storyInfo}>Author: {story['authors']}</Text>
            <Text style={styles.storyDescription}>Description: {story['story']}...</Text>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                style={isStoryLoaded ? styles.orangeFollowStoryButton : styles.greenFollowStoryButton}
                onPress={() => followStoryButton(storyURL, storyKeywords, storyDate)}>
                  <Text style={styles.buttonText}>Follow Story</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={isStoryLoaded ? styles.orangeFollowStoryButton : styles.greenFollowStoryButton}
                onPress={() => getUpdatesButton()}>
                <Text style={styles.buttonText}>Get Updates</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.greenFollowStoryButton}
                onPress={() => getUpdatesButton(true)}>
                  <Text style={styles.buttonText}>Get Test Updates</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.greenFollowStoryButton}
                onPress={() => cancel()}>
                  <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    </>
  )
}

export default Home;
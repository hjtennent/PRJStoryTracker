import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import styles from '../styles/Home';
import { getStoryDetails, getStoryUpdates } from "../../helper/api/api";
import { addTopic } from "../../helper/firebase/firebase";
import auth from "@react-native-firebase/auth"

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState(false)
  const [storyLink, onEnterStoryLink] = React.useState("Enter story link...")
  const [storyURL, setStoryURL] = React.useState("")
  const [storyDate, setStoryDate] = React.useState("")
  const [storyAuthor, setStoryAuthor] = React.useState("")
  const [storyDescription, setStoryDescription] = React.useState("Description")
  const [storyKeywords, setStoryKeywords] = React.useState("")
  const [savedStoryID, setSavedStoryID] = React.useState("")
  const [savedStoryTopic, setSavedStoryTopic] = React.useState([])
  const user = auth().currentUser

  if (isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
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
      setStoryURL(response["URL"])
      setStoryAuthor(response["AUTHORS"])
      setStoryDate(response["DATE"])
      setStoryDescription(response["STORY"])
      setStoryKeywords(response["KEYWORDS"])
      setIsStoryLoaded(true)
      setIsLoading(false)
    })
    .catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  const followStoryButton = (storyURL, storyKeywords, storyDate) => {
    setIsLoading(true)
    //Call API to generate topic and save to database
    response = addTopic(storyURL, storyKeywords, storyDate)
    if (response != null) {
      setSavedStoryID(response.key)
      setSavedStoryTopic(response.keywords)
    }
    setIsLoading(false)
  }

  const getUpdatesButton = (test=false) => {
    if (savedStoryID == "" || savedStoryTopic == []) {
      Alert.alert("No currently followed story.")
    } else {
      setIsLoading(true)
      console.log('Home.js: ', savedStoryTopic)
      getStoryUpdates(savedStoryID, savedStoryTopic, test).then(response => {
        responseDict = {}
        Object.entries(response["SIMILARITIES"]).map((key, value) => {
          responseDict[key[0]] = parseFloat(key[1].toFixed(3))
        })
        props.navigation.navigate("Updates", {
          storyUpdates: responseDict
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
        <Button
          style={styles.addTopicButton}
          onPress={() => logout()}
          title="Logout"
        />
        <Text style={styles.mainText}>Welcome to the Story Tracker {user && user.email}</Text>
        <TextInput style={styles.topicLinkInput} onChangeText={text => onEnterStoryLink(text)} value={storyLink} />
        <Button
          style={styles.addTopicButton}
          onPress={() => retrieveStory()}
          title="Get Story Details"
        />
      </View>
      {isStoryLoaded && 
        <View style={styles.storyContainer}>
            <Text style={styles.storyDescription}>Date: {storyDate}</Text>
            <Text style={styles.storyDescription}>Author: {storyAuthor}</Text>
            <Text style={styles.storyDescription}>{storyDescription}</Text>
            <Text style={styles.storyKeywords}>{storyKeywords}</Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.followStoryButton}
                onPress={() => followStoryButton(storyURL, storyKeywords, storyDate)}
                title="Follow Story"
              />
              <Button
                style={styles.followStoryButton}
                onPress={() => getUpdatesButton()}
                title="Get Updates"
              />
              <Button
                style={styles.followStoryButton}
                onPress={() => getUpdatesButton(true)}
                title="Get Test Updates"
              />
              <Button 
                style={styles.cancelButton}
                onPress={() => cancel()}
                title="Cancel"
              />
            </View>
        </View>
      }
    </>
  )
}

export default Home;
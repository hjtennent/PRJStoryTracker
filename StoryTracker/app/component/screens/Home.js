import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import styles from '../styles/Home';
import { getStoryDetails } from "../../helper/api/api";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState(false)
  const [storyLink, onEnterStoryLink] = React.useState("Enter story link...")
  const [storyDate, setStoryDate] = React.useState("")
  const [storyAuthor, setStoryAuthor] = React.useState("")
  const [storyDescription, setStoryDescription] = React.useState("Description")
  const [storyKeywords, setStoryKeywords] = React.useState("")

  if (isLoading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    )
  }

  const retrieveStory = () => {
    setIsLoading(true)
    getStoryDetails(storyLink).then(response => {
      console.log("Home.js: " + response["STORY"])
      setStoryAuthor(response["AUTHORS"])
      setStoryDate(response["DATE"])
      setStoryDescription(response["STORY"])
      setStoryKeywords(response["KEYWORDS"])
      setIsStoryLoaded(true)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }

  const followStoryButton = () => {
    //Call API to generate topic and save to database
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
        <Text style={styles.mainText}>Welcome to the Story Tracker.</Text>
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
            <Button
              style={styles.followStoryButton}
              onPress={() => followStory()}
              title="Follow Story"
            />
            <Button 
              style={styles.cancelButton}
              onPress={() => cancel()}
              title="Cancel"
            />
        </View>
      }
    </>
  )
}

export default Home;
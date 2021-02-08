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
  const [storyLink, onEnterStoryLink] = React.useState("Enter story link...")
  const [storyDescription, setStoryDescription] = React.useState("Description")

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
      setStoryDescription(response["STORY"])
      setIsLoading(false)
    })
    .catch(error => console.log(error))
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
      <View style={styles.storyContainer}>
          <Text style={styles.storyDescription}>{storyDescription}</Text>
      </View>
    </>
  )
}

export default Home;
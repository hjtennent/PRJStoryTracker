import React, { useState, useEffect } from 'react';
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
import { addTopic, pushFCMTokenToFirebase, getStoryHeadlineFromID } from "../../helper/firebase/firebase";
import auth from "@react-native-firebase/auth"
import messaging from "@react-native-firebase/messaging"
import Loading from './Loading';
import { getStoryObject } from "../../helper/models/StoryModel"
import StoryButton from '../common/StoryButton';
import { getData, clearData } from "../../helper/storage/storage";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isStoryLoaded, setIsStoryLoaded] = useState(false)
  const [isStoryFollowed, setIsStoryFollowed] = useState(false)
  const [story, setStory] = useState({})
  const [storyLink, onEnterStoryLink] = React.useState("Enter story link...")
  const [savedStoryID, setSavedStoryID] = React.useState("")
  const [savedStoryTopic, setSavedStoryTopic] = React.useState([])
  const [openedNotification, setOpenedNotification] = React.useState()
  const user = auth().currentUser

  if (isLoading) {
    return (
      <><Loading /></>
    )
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      messaging().getToken().then(token => pushFCMTokenToFirebase(user.uid, token))
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(async remoteMessage => {
      setOpenedNotification(remoteMessage)
    });
    return unsubscribe;
  }, []);


  const displaySavedNotifications = async () => {
    const notifications = await getData('messages')
    console.log("Checking notifications....")
    if (notifications != null) {
      //TODO: Display notifications for user
      console.log(notifications)
      notifications.forEach(async notification => {
        const parsedNotification = JSON.parse(notification)
        console.log(parsedNotification)
        const notificationData = parsedNotification['data']
        const dictionary = Object.entries(notificationData)
        console.log(dictionary)
        const storyID = dictionary[0][0]
        const headline = await getStoryHeadlineFromID(user.uid, storyID)
        Alert.alert(parsedNotification['notification']['title'], parsedNotification['notification']['body'] + "\n" + headline,
        [
          {
            text: 'Read',
            onPress: () => props.navigation.navigate('Stories', {
              screen: 'Updates',
              params: { storyID: storyID, storyUpdates: JSON.parse(dictionary[0][1]), fromNotification: true }
            })
          }
        ])
      })
    }
    clearData(); //get rid of the saved notifications once they've been shown to the user
  }

  const logout = () => {
    //Clear AsyncStorage
    clearData();
    auth().signOut()
      .then(() => props.navigation.replace('Auth'))
  }

  const retrieveStory = () => {
    setIsLoading(true)
    console.log(storyLink)
    getStoryDetails(storyLink).then(async (response) => {
      console.log("Home.js: " + response["URL"])
      const storyObject = getStoryObject(response["ID"], response["URL"], response["TITLE"], response["STORY"], response["AUTHORS"], response["DATE"], response["KEYWORDS"])
      setStory(storyObject)
      setIsStoryLoaded(true)
      //Call Firebase to save topic to database
      const firebaseResponse = await addTopic(user.uid, storyObject["url"], storyObject["title"], storyObject["authors"], storyObject["keywords"], storyObject["date"])
      console.log("Response: ", firebaseResponse)
      setIsStoryFollowed(firebaseResponse.alreadyFollowed)
      if (firebaseResponse.alreadyFollowed == false) {
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
          storyID: savedStoryID,
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
  }

  const navigateStoriesTab = () => {
    props.navigation.navigate("Stories")
  }

  requestUserPermission();
  displaySavedNotifications();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <StoryButton makeHighlight={false} text={"Logout"} onPress={() => logout()} />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.mainText}>Welcome to the Story Tracker, {user && user.email}</Text>
        </View>
        <View style={styles.linkInputContainer}>
          <TextInput style={styles.topicLinkInput} onChangeText={text => onEnterStoryLink(text)} value={storyLink} />
          <StoryButton makeHighlight={!isStoryLoaded} onPress={() => retrieveStory()} text={"Get Story Details"} />
        </View>
        {isStoryFollowed &&
          <View style={styles.alreadyFollowedStoryContainer}>
            <Text style={styles.alreadyFollowedText}>You already follow this story, head to the Stories tab to look for any updates.</Text>
            <StoryButton makeHighlight={true} text={"Followed Stories"} onPress={() => navigateStoriesTab()} />
          </View>
        }
        {!isStoryFollowed && isStoryLoaded && 
          <View style={styles.storyContainer}>
            <Text style={styles.storyInfo}>Title: {story['title']}</Text>
            <Text style={styles.storyInfo}>Date: {story['date']}</Text>
            <Text style={styles.storyInfo}>Author: {story['authors']}</Text>
            <Text style={styles.storyDescription}>Description: {story['story']}...</Text>
            <View style={styles.buttonContainer}>
              <StoryButton makeHighlight={!isStoryLoaded} text={"Get Updates"} onPress={() => getUpdatesButton()} />
              <StoryButton makeHighlight={false} text={"Get Test Updates"} onPress={() => getUpdatesButton(true)} />
              <StoryButton makeHighlight={false} text={"Cancel"} onPress={() => cancel()} />
            </View>
          </View>
        }
      </View>
    </>
  )
}

export default Home;
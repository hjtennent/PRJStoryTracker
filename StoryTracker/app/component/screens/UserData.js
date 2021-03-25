import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import styles from '../styles/UserData';
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import StoryButton from "../common/StoryButton";
import Loading from './Loading';
import { removeUserData } from "../../helper/firebase/firebase";

const UserData = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState()
  const [userToken, setUserToken] = useState()
  const [userHistory, setUserHistory] = useState([])
  const [userStories, setUserStories] = useState([])
  const user = auth().currentUser
  const [links, setLinks] = useState([])

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}`)
      .on('value', snapshot => {
        const userData = snapshot.val()
        if (userData) {
          setUserEmail(userData['email'])
          setUserToken(userData['fcmToken'])
          let history = []
          if (userData['history']) {
            Object.entries(userData['history']).forEach(item => {
              Object.values(Object.values(item)[1]).forEach(link => {
                history.push(link)
              });
            })
          }
          setUserHistory(history)
          let stories = []
          if (userData['stories']) {
            Object.entries(userData['stories']).forEach(item => {
              stories.push(item[1]['title'])
            })
          }
          setUserStories(stories)
        }
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

  const removeAccount = async () => {
    console.log("Removed account!");
    removeUserData(user.uid);
    user.delete();
    navigation.replace('Auth')
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <StoryButton onPress={() => removeAccount()} text="Remove Account"/>
        </View>
        <ScrollView style={styles.storyContainer}>
          <View>
            <Text style={styles.sectionHeader}>User ID</Text>
            <Text style={styles.sectionText}>{user.uid ? user.uid : "None"}</Text>
          </View>
          <View>
            <Text style={styles.sectionHeader}>Email</Text>
            <Text style={styles.sectionText}>{userEmail ? userEmail : "None"}</Text>
          </View>
          <View>
            <Text style={styles.sectionHeader}>Device Token</Text>
            <Text style={styles.sectionText}>{userToken ? userToken : "None"}</Text>
          </View>
          <View>
            <Text style={styles.sectionHeader}>History</Text>
            {userHistory.length > 0 ?
              userHistory.map((link,i) => {
                return (
                  <View key={i}>
                    <Text style={styles.sectionText}>{link}</Text>
                  </View>
                )
              })
              :
              <View style={styles.noStoriesContainer}>
                <Text style={styles.noStoriesText}>No history saved.</Text>
              </View>
            }
          </View>
          <View>
            <Text style={styles.sectionHeader}>Stories</Text>
            {userStories.length > 0 ?
              userStories.map((story,i) => {
                return (
                  <View key={i}>
                    <Text style={styles.sectionText}>{story}</Text>
                  </View>
                )
              })
              :
              <View style={styles.noStoriesContainer}>
                <Text style={styles.noStoriesText}>No stories followed.</Text>
              </View>
            }
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default UserData;
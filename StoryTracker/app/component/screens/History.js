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
import { clearHistory } from "../../helper/firebase/firebase";
import StoryButton from "../common/StoryButton";
import StoryBox from "../common/StoryBox";
import Loading from './Loading';

const History = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const [links, setLinks] = useState([])
  const { storyID } = route.params


  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/history/${storyID}`)
      .on('value', snapshot => {
        const fetchedLinks = snapshot.val()
        if (fetchedLinks) {
          const stories = Object.values(fetchedLinks)
          setLinks(stories);
        } else {
          setLinks([]);
        }
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/${user.uid}/history/${storyID}`)
        .off('value', onValueChange);
  }, [user.uid]);

  if (isLoading) {
    return (
      <><Loading /></>
    )
  }

  const openLink = (link) => {
    Linking.openURL(link)
  }

  const clearHistoryOnClick = async () => {
    clearHistory(user.uid, storyID).then(() => navigation.goBack());
  }
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <StoryButton onPress={() => clearHistoryOnClick()} text="Clear History"/>
        </View>
        <ScrollView style={styles.storyContainer}>
          {links != [] ?
            links.map((link,i) => {
              return (
                <View key={i}>
                  <StoryBox text={link} url={link} onPress={() => openLink(link)}/>
                </View>
              )
            })
          :
            <>
              <Text>No history yet.</Text>
            </>
          }
        </ScrollView>
      </View>
    </>
  )
}

export default History;
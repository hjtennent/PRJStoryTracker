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

const History = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const user = auth().currentUser
  const [links, setLinks] = useState([])
  const { storyID } = route.params


  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user.uid}/history/${storyID}`)
      .on('value', snapshot => {
        fetchedLinks = snapshot.val()
        stories = Object.values(fetchedLinks)
        setLinks(stories);
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.mainText}>History</Text>
        </View>
        <ScrollView style={styles.storyContainer}>
          {links !== [] ?
            links.map((link,i) => {
              return (
                <View key={i}>
                  <TouchableOpacity onPress={() => openLink(link)}>
                    <Text style={styles.storyText}>{link}</Text>
                  </TouchableOpacity>
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
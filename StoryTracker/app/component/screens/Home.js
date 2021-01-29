import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import styles from '../styles/Home';

const Home = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>Welcome to the Story Tracker.</Text>
        <TextInput style={styles.topicLinkInput} placeholder="Enter story link..." />
        <Button
          style={styles.addTopicButton}
          onPress={() => console.log("Button click!")}
          title="Add Topic Of Interest"
        />
      </View>
    </>
  )
}

export default Home;
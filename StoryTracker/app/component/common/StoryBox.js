import React from 'react';
import styles from "./styles/StoryBox";
import {
  View, TouchableOpacity, Text
} from 'react-native';

export default StoryBox = (props) => {

  return (
    <View style={styles.similarStoryBox}>
      <View style={styles.headlineContainer}>
        <TouchableOpacity onPress={() => props.onPress(props.story[1]['url'])}>
          <Text style={styles.storyText}>{props.story[0]}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.similarityLabelContainer}>
        <Text style={styles.storyText}>{props.story[1]['score']}</Text>
      </View>
    </View>
  )
}
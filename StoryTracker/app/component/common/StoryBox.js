import React from 'react';
import styles from "./styles/StoryBox";
import {
  View, TouchableOpacity, Text
} from 'react-native';

export default StoryBox = (props) => {

  return (
    <View style={styles.similarStoryBox}>
      <View style={styles.headlineContainer}>
        <TouchableOpacity onPress={() => props.onPress()}>
          <Text style={styles.storyText}>{props.url}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.similarityLabelContainer}>
        <Text style={styles.storyText}>{props.similarity}</Text>
      </View>
    </View>
  )
}
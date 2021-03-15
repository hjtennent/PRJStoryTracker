import React from 'react';
import styles from "./styles/StoryButton";
import {
  TouchableOpacity, Text
} from 'react-native';

export default StoryButton = (props) => {
  return (
    <TouchableOpacity
      id={'storyButton'}
      style={props.makeHighlight ? styles.orangeFollowStoryButton : styles.greenFollowStoryButton}
      onPress={() => props.onPress()}>
        <Text style={props.smallText ? styles.smallButtonText : styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mainText: {
    flex: 0.3,
    fontStyle: "italic"
  },
  storyContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  storyDescription: {
    color: "black"
  },
  topicLinkInput: {
    paddingBottom: 20,
    fontSize: 18,
  },
  cancelButton: {
    color: 'grey'
  }
});

export default styles;
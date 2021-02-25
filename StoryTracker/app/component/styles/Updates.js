import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  storyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  similarStoriesContainer: {
    flex: 1,
  },
  noStoriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noStoriesText: {
    fontStyle: 'italic'
  },
});

export default styles;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sectionHeader: {
    fontFamily: 'Oxygen-Bold',
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  noStoriesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionText: {
    fontStyle: 'italic'
  },
});

export default styles;
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
  similarStoryBox: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
  },
  allStoryBox: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
  },
  headlineContainer: {
    flex: 0.8,
  },
  similarityLabelContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  storyText: {
    fontFamily: 'Oxygen-Regular'
  }
});

export default styles;
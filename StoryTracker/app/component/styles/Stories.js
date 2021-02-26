import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
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
  headlineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headline: {
    flex: 0.8,
    justifyContent: 'center',
  },
  updatesButton: {
    flex: 0.3,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  storyText: {
    fontFamily: 'Oxygen-Regular',
  }
});

export default styles;
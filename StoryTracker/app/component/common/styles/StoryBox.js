import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
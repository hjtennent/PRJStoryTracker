import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noHistoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  storyContainer: {
    flex: 1,
  },
  linkContainer: {
    borderBottomWidth: 0.5,
  },
  linkButton: {
    margin: 20,
  },
  linkText: {
    fontFamily: 'Oxygen-Regular',
  }
});

export default styles;
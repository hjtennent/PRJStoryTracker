import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#94CFAB",
  },
  logoutContainer: {
    flex: 0.2,
    width: '100%',
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    margin: 5,
  },
  welcomeContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  linkInputContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  alreadyFollowedStoryContainer: {
    flex: 1,
    width: '80%',
  },
  alreadyFollowedText: {
    paddingBottom: 20,
  },
  mainText: {
    fontSize: 18,
    color: "white",
    fontStyle: "italic"
  },
  storyContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  storyInfo: {
    fontFamily: 'Oxygen-Regular',
    marginBottom: 5
  },
  storyDescription: {
    color: "black",
    height: '30%',
  },
  topicLinkInput: {
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    backgroundColor: "#4D8E6B",
    borderRadius: 20,
    alignItems: "center",
    color: "white",
    width: '80%',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
  },
  orangeFollowStoryButton: {
    backgroundColor: "#F25E2E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  greenFollowStoryButton: {
    backgroundColor: "#4D8E6B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Oxygen-Bold",
    fontSize: 16,
  },
  cancelButton: {
    color: 'grey'
  },
});

export default styles;
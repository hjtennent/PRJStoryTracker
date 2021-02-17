import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: '90%',
    borderColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 8
  },
  loginLink: {
    color: 'red'
  },
  signUpButton: {
    color: 'green'
  }
});

export default styles;
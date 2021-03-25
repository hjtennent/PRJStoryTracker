import React, { useState } from "react"
import { View, Text, Button, TextInput, Alert } from "react-native"
import styles from "../styles/SignUp"
import auth from "@react-native-firebase/auth"
import { addUser } from "../../helper/firebase/firebase" 


const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignUp = () => {
    if (email != "" && password != "") {
      auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        addUser(userCredential.user.uid, email)
        Alert.alert("Privacy Notice", "We care about your privacy. This app stores your email, password, a unique ID for your device, the stories you follow, and a history of links you've clicked.")
        props.navigation.replace('LandingStack')
      })
      .catch(error => setErrorMsg(error.message))
    } else {
      Alert.alert("Please enter both an email and a password to sign up.")
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up For An Account</Text>
      {errorMsg != "" && 
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      }
      <TextInput 
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput 
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Button title="Sign Up" style={styles.signUpButton} onPress={() => handleSignUp()} />
      <View>
        <Text>Already have an account? 
          <Text onPress={() => props.navigation.navigate('Login')} style={styles.loginLink}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  )

}

export default SignUp;
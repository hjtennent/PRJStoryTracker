import React, { useState, useEffect } from "react"
import { View, TextInput, Text, Button, Alert } from "react-native"
import styles from "../styles/SignUp"
import auth from "@react-native-firebase/auth";

const LogIn = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isSignedIn, setIsSignedIn] = useState(false)

  // Handle user state changes
  function onAuthStateChanged(user) {
    user ? setIsSignedIn(true) : setIsSignedIn(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogIn = () => {
    if (email != "" && password != "") {
      auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        if (isSignedIn) { props.navigation.replace('LandingStack') }
      })
      .catch(error => setErrorMsg(error.message))
    } else {
      Alert.alert("Please enter both an email and a password to log in.");
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Log In</Text>
        {errorMsg != "" && 
          <Text style={styles.errorMsg}>{errorMsg}</Text>
        }
        <TextInput 
          id="emailInput"
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          secureTextEntry
          id="passwordInput"
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Button id="logInButton" title="Login" style={styles.signUpButton} 
                onPress={() => handleLogIn()} />
        <View>
          <Text>Don't have an account? 
            <Text onPress={() => props.navigation.navigate('SignUp')} 
                  style={styles.loginLink}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </>
  )

}

export default LogIn;
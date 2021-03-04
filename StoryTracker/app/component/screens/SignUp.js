import React, { useState } from "react"
import { View, Text, Button, TextInput } from "react-native"
import styles from "../styles/SignUp"
import auth from "@react-native-firebase/auth"
import { addUser } from "../../helper/firebase/firebase" 


const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSignUp = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        addUser(userCredential.user.uid, email)
        props.navigation.replace('LandingStack')
      })
      .catch(error => setErrorMsg(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
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
jest.mock('@react-native-firebase/app', () => {
  return () => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn()
  })
})

jest.mock('@react-native-firebase/auth', () => {
  return {
    onAuthStateChanged: jest.fn({user: 'user'}),
    signInWithEmailAndPassword: jest.fn(),
  }
});

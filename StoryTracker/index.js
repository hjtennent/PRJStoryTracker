/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
import { storeData } from "./app/helper/storage/storage";

messaging().getInitialNotification(async remoteMessage => {
  console.log("getInitialNotification handler", remoteMessage)
  await storeData(remoteMessage)
})

// Register background handler for notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await storeData(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);

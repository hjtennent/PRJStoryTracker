import database from '@react-native-firebase/database'

const deleteStory = async (uid, storyID) => {
  await database().ref(`/users/${uid}/stories/${storyID}/`)
    .remove()
    .catch(error => console.log(error))
}

const removeUserData = async (uid) => {
  await database().ref(`/users/${uid}/`)
    .remove()
    .catch(error => console.log(error))
}

const clearHistory = async (uid, storyID) => {
  await database().ref(`/users/${uid}/history/${storyID}/`)
    .remove()
    .catch(error => console.log(error))
}

const getStoryHeadlineFromID = async (uid, storyID) => {
  const result = await database().ref(`/users/${uid}/stories/${storyID}/`)
    .once('value')
    .then(snapshot => {
      return snapshot.val()
    })
    .catch(error => console.log(error))
  if (result) {
    return result["title"]
  } else {
    return ""
  }
}

const pushFCMTokenToFirebase = (uid, token) => {
  database().ref(`/users/${uid}`).update({
    fcmToken: token
  }).catch(error => console.log(error))
}

const addStoryLinkToUserHistory = (uid, storyID, link) => {
  database().ref(`/users/${uid}/history/${storyID}/`).push(link)
    .catch(error => console.log(error))
}

const addUser = (uid, email) => {
  database().ref(`/users/`).child(uid).set({
    email
  }).catch(error => console.log(error))
}

const addTopic = async (userID, url, title, authors, keywords, date) => {
  var alreadyFollowed = false
  const result = await database().ref('/users/').child(userID).child('/stories/').once('value').then(snapshot => {
    const followedStories = snapshot.val()
    //Check if the user already follows this story
    if (followedStories) {
      Object.entries(followedStories).forEach((item, key) => {
        if (item[1]["url"] == url) {
          alreadyFollowed = true
        }
      })
    }
    return {
      alreadyFollowed
    }
  })
  if (result['alreadyFollowed'] == true) {
    return result
  }
  //Add story to database
  const newRef = database().ref(`/users/${userID}/stories/`)
    .push();
  const key = newRef.key
  newRef.set({
    id: key,
    date: date,
    topic: keywords,
    url: url,
    title,
    authors
  })
  .catch(error => console.log(error))
  
  return {
    alreadyFollowed,
    key: key,
    keywords: keywords
  }
}

export {
  addTopic,
  addUser,
  addStoryLinkToUserHistory,
  pushFCMTokenToFirebase,
  getStoryHeadlineFromID,
  clearHistory,
  removeUserData,
  deleteStory
}
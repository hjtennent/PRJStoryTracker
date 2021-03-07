import database from '@react-native-firebase/database'

const getStoryHeadlineFromID = async (uid, storyID) => {
  console.log("In getStoryHeadlineFromID")
  const result = await database().ref(`/users/${uid}/stories/${storyID}/`)
    .once('value')
    .then(snapshot => {
      console.log("Snapshot: ", snapshot.val())
      return snapshot.val()
    })
    .catch(error => console.log(error))
  return result["title"]
}

const pushFCMTokenToFirebase = (uid, token) => {
  console.log(token)
  database().ref(`/users/${uid}`).update({
    fcmToken: token
  }).catch(error => console.log(error))
}

const addStoryLinkToUserHistory = (uid, storyID, link) => {
  console.log("In add story link to user history")
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
  console.log(userID)
  const result = await database().ref('/users/').child(userID).child('/stories/').once('value').then(snapshot => {
    const followedStories = snapshot.val()
    console.log("URL: ", url)
    if (followedStories) {
      Object.entries(followedStories).forEach((item, key) => {
        console.log("Followed URL: ", item[1]['url'])
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
  //TODO only return this when set was successful
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
  getStoryHeadlineFromID
}
import database from '@react-native-firebase/database'

const addUser = (uid, email) => {
  console.log(uid)
  console.log(email)
  database().ref(`/users/`).child(uid).set({
    email
  }).catch(error => console.log(error))
}

const addTopic = async (userID, url, title, authors, keywords, date) => {
  alreadyFollowed = false
  result = await database().ref(`/users/${userID}/stories/`).once('value').then(snapshot => {
    followedStories = snapshot.val()
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
  addUser
}
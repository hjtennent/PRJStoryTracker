import database from '@react-native-firebase/database'

const addTopic = (url, keywords, date) => {
  const newRef = database().ref('/stories/')
    .push();
  const key = newRef.key
  newRef.set({
    id: key,
    storyDate: date,
    topic: keywords,
    storyUrl: url,
  })
  .catch(error => console.log(error))
  //TODO only return this when set was successful
  return {
    key: key,
    keywords: keywords
  }

}

export {
  addTopic
}
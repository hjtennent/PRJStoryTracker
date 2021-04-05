import axios from 'axios'

//Call bias endpoint of API
const getBias = (id) => {
  return axios({
    "method": "GET",
    "url": "https://prjstorytrackerapp.herokuapp.com/bias/",
    "params": {
      id
    }
  })
  .then(response => {
    if (response) {
      return response.data
    }
  })
  .catch((error) => console.log("Error fetching bias analysis: ", error))
}

//Get story info (e.g. headline, keywords) from API
const getStoryDetails = (url) => {
  return axios({
    "method": "GET",
    "url": "https://prjstorytrackerapp.herokuapp.com/story/",
    "params": {
      url
    }
  })
  .then(response => {
    if (response) {
      return response.data
    }
  })
  .catch((error) => console.log("Error fetching story details: ", error))
}

//Check for new stories similar to user's topic
const getStoryUpdates = (id, topic) => {
  return axios({
    "method": "GET",
    "url": "https://prjstorytrackerapp.herokuapp.com/update/",
    "params": {
      id,
      topic: JSON.stringify(topic)
    }
    })
    .then(response => {
      if (response) {
        return response.data
      }
    })
    .catch((error) => console.log("Error fetching story details: ", error))
}

export {
  getStoryDetails,
  getStoryUpdates,
  getBias
}
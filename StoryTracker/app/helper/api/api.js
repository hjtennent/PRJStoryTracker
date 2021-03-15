import axios from 'axios'

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

const getStoryUpdates = (id, topic, test) => {
  return axios({
    "method": "GET",
    "url": "https://prjstorytrackerapp.herokuapp.com/update/",
    "params": {
      id,
      topic: JSON.stringify(topic),
      test
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
  getStoryUpdates
}
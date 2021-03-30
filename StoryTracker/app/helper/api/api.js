import axios from 'axios'

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
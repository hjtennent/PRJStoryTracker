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
      console.log("API.js " + response.data)
      return response.data
    }
  })
  .catch((error) => console.log("Error fetching story details: ", error))
}

export {
  getStoryDetails
}
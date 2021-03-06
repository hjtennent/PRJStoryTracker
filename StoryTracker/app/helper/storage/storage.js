import AsyncStorage from "@react-native-async-storage/async-storage"

const storeData = async (value) => {
  try {
    jsonValue = JSON.stringify(value)
    messages = await getData('messages')
    data = ""
    if (messages == null) {
      data = JSON.stringify([jsonValue])
    } else {
      messages.push(jsonValue)
      data = JSON.stringify(messages)
    }
    await AsyncStorage.setItem('messages', data)
  } catch (error) {
    console.log(error)
  }
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    if (jsonValue) {
      parsedValue = JSON.parse(jsonValue)
      return parsedValue
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

const clearData = async () => {
  try {
    await AsyncStorage.removeItem('messages')
  } catch (error) {
    console.log(error)
  }
}

export {
  storeData,
  getData,
  clearData
}
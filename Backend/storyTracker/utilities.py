def sortStoriesByMostSimilar(stories):
  #Sort the dictionary to have the most similar stories first
  sortedValues = sorted(stories.items(), key=lambda item : item[1]['score'],
                        reverse=True)
  storyDictionary = {}
  for item in sortedValues:
    storyDictionary[item[0]] = item[1]
  return storyDictionary

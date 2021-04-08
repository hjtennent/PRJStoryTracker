# app.py
from storyTracker.utilities import sortStoriesByMostSimilar
from flask import request, jsonify
from storyTracker.storyHandler import StoryHandler
from storyTracker.keywordExtractor import KeywordExtractor
from storyTracker.newsApiHandler import NewsAPIHandler
from storyTracker.similarityCalculator import SimilarityCalculator
from storyTracker.biasCalculator import BiasCalculator

def respondEndpoint():
    # Retrieve the name from url parameter
    url = request.args.get("url", None)

    response = {}

    # Check if user sent a name at all
    if not url:
        response["STATUS"] = "fail"
        response["ERROR"] = "No URL found, please send a URL."
    # Check if the user entered a number not a name
    elif str(url).isdigit():
        response["STATUS"] = "fail"
        response["ERROR"] = "URL can't be numeric."
    # Now the user entered a valid name
    else:
        handler = StoryHandler()
        story = handler.getArticleText(url)
        extractor = KeywordExtractor()
        keywordsList = extractor.getKeywords(story)
        response = {
          "STATUS": 200,
          "KEYWORDS": keywordsList[:10],
          "URL": url,
          "TITLE": handler.getArticleTitle(),
          "STORY": story[:200],
          "DATE": handler.getArticlePublishDate(),
          "AUTHORS": handler.getArticleAuthors(),
          "IMAGE": handler.getArticleTopImage()
        }

    # Return the response in json format
    return jsonify(response)

def updateEndpoint():
    # Retrieve the id from url parameter
    id = request.args.get("id", None)
    topic = request.args.get("topic", None)
    test = request.args.get("test", False)

    if topic != None:
      topTailString = str(topic)[1:-1]
      topicList = topTailString.split(',')
      topic = [word[1:-1] for word in topicList]

    response = {}

    # Check if user sent a id at all
    if (not id) or (not topic):
        response["STATUS"] = "fail"
        response["ERROR"] = "Please send both an ID and a topic signature."
    else: # Now the user entered a valid id
      results = {}
      handler = StoryHandler()
      extractor = KeywordExtractor()
      simCalculator = SimilarityCalculator()
      storyHandler = NewsAPIHandler()
      topStories = storyHandler.getTopHeadlines()
      for story in topStories:
        text = handler.getArticleText(story["url"])
        title = handler.getArticleTitle()
        if text != "":
          testSignature = extractor.getKeywords(text)
          score = simCalculator.getSimilarity(topic, testSignature)
          results[title] = {
            "url": story["url"],
            "score": score
          }
      sortedResults = sortStoriesByMostSimilar(results)
      response["STATUS"] = "ok"
      response["SIMILARITIES"] = sortedResults

    # Return the response in json format
    return jsonify(response)

# A welcome message to test our server
def indexEndpoint():
  return "<h1>Welcome to our server !!</h1>"

def biasEndpoint():
  # Retrieve the user id from parameter
  id = request.args.get("id", None)
  response = {}
  # Check if user sent an ID at all
  if not id:
      response["STATUS"] = "fail"
      response["ERROR"] = "No ID found, please send a user ID."
  # Now the user entered a valid ID
  else:
    biasHandler = BiasCalculator()
    response["STATUS"] = 200
    response["SOURCE"] = biasHandler.getMostCommonSource(id)
    response["SUGGESTED"] = biasHandler.getSuggestedSources(id)
  # Return the response in json format
  return jsonify(response)
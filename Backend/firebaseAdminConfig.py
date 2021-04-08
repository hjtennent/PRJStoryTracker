import firebase_admin
from firebase_admin import credentials, db, messaging
from storyTracker.newsApiHandler import NewsAPIHandler
from storyTracker.storyHandler import StoryHandler
from storyTracker.keywordExtractor import KeywordExtractor
from storyTracker.similarityCalculator import SimilarityCalculator
import json

#Initialise connection to database through Firebase Admin SDK
cred = credentials.Certificate(
    "prjstorytracker-firebase-adminsdk-t5jhv-d8046a5c62.json"
  )
firebase_admin.initialize_app(cred, {
  'databaseURL': 'https://prjstorytracker-default-rtdb.' +
                 'europe-west1.firebasedatabase.app/'
})
root = db.reference()
usersRef = root.child('users')
users = usersRef.get()

def getArticleDetailsDictionary():
  checker = NewsAPIHandler()
  storyHandler = StoryHandler()
  headlines = checker.getTopHeadlines()
  urls = [headline['url'] for headline in headlines]
  articleDetails = {}
  for story in urls:
    text = storyHandler.getArticleText(story)
    title = storyHandler.getArticleTitle()
    articleDetails[title] = {
      'text': text,
      'url': story
    }
  return articleDetails

def getUpdates(keywords, articles):
  results = {}
  extractor = KeywordExtractor()
  simCalculator = SimilarityCalculator()
  for (title, details) in articles.items():
    testSignature = extractor.getKeywords(details['text'])
    score = simCalculator.getSimilarity(keywords, testSignature)
    if score > 0.1:
      results[title] = {
        'score': str(score),
        'url': details['url']
      }
    # Return the response in json format
  return results


    # android=messaging.AndroidConfig(
    #   priority='high',
    # )
def sendMessage(registration_token, results):
  message = messaging.Message(
    notification=messaging.Notification(
      title='Story Update',
      body="We have some new stories about one of your followed" + 
           " topics that you might be interested in."
    ),
    data=results,
    token=registration_token
  )
  try:
    response = messaging.send(message)
    return response
  except:
    print("Error sending message!")

#Get updates on each story for each user
articleDetails = getArticleDetailsDictionary()
for user in users:
  storiesRef = usersRef.child(user).child('stories')
  stories = storiesRef.get()
  if stories != None:
    for id, story in stories.items():
      result = {}
      similarStories = getUpdates(story['topic'], articleDetails)
      result[id] = json.dumps(similarStories)
      if len(similarStories) > 0:
        #Send notification
        reg_token = usersRef.child(user).child('fcmToken').get()
        sendMessage(reg_token, result)
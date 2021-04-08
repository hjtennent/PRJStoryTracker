from typing import Counter
import firebase_admin
from firebase_admin import credentials, db, messaging

class BiasCalculator:

  def __init__(self):
    #Initialise connection to database through Firebase Admin SDK
    try:
      firebase_admin.get_app()
    except ValueError:
      self.cred = credentials.Certificate("prjstorytracker-firebase-adminsdk" +
                                          "-t5jhv-d8046a5c62.json")
      firebase_admin.initialize_app(self.cred, {
        'databaseURL': 'https://prjstorytracker-default-rtdb' +
                       '.europe-west1.firebasedatabase.app/'
      })
    except:
      print("Error in getting Firebase database from AdminSDK")

    self.root = db.reference()
    self.usersRef = self.root.child('users')
    self.users = self.usersRef.get()

  def getMostCommonSource(self, id):
    storiesRef = self.usersRef.child(id).child('stories')
    stories = storiesRef.get()
    if stories != None:
      authorList = []
      for id, story in stories.items():
        try:
          for author in story['authors']:
            authorList.append(author)
        except KeyError:
          print("Error referencing authors in Firebase.")
      if len(authorList) > 0:
        counterList = Counter(authorList)
        mostCommonAuthor = counterList.most_common()[0]
        if mostCommonAuthor[1] >= (len(authorList) / 2):
          #Over 50% of the user's stories are from 1 author
          return mostCommonAuthor[0]
      else:
        return None

  def getSuggestedSources(self, id):
    return ['The Economist, BBC News, Fox News']
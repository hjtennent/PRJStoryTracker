from newsapi.newsapi_client import NewsApiClient
from storyTracker.config import api_key

class NewsAPIHandler:
  def __init__(self):
    self.api = NewsApiClient(api_key=api_key)

  def getSources(self):
    sources = self.api.get_sources()['sources']
    return sources[:10]

  def getHeadlinesFromKeywords(self, keywords):
    headlines = self.api.get_top_headlines(
      language='en',
      q=keywords
    )
    if headlines['totalResults'] == 0:
      return []
    elif headlines['totalResults'] > 25:
      return headlines['articles'][:25]
    else:
      return headlines['articles']

  def getTopHeadlines(self): #gets top 25 articles
    headlines = self.api.get_top_headlines(sources='bbc-news, independent,' +
        'the-hill, fox-news, associated-press, bloomberg, cnn, techcrunch',
        language='en')
    if headlines['totalResults'] == 0:
      return []
    elif headlines['totalResults'] > 25:
      return headlines['articles'][:25]
    else:
      return headlines['articles']

  def getTopBBCHeadline(self):
    headlines = self.api.get_top_headlines(sources='bbc-news', language='en')
    if headlines['totalResults'] != 0:
      return headlines['articles'][0]
    else:
      return "No articles found."
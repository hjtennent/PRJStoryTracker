from newspaper import Article

class StoryHandler:

  def __init__(self):
    self.article = ""

  def getArticleText(self, url):
    try:
      article = Article(url)
      article.download()
      article.parse()
      self.article = article
      return article.text
    except:
      print("Failed to download article text.")
      return ""

  def getArticleTitle(self):
    if self.article != "":
      return self.article.title
    else:
      print("Can't get title because no article has been retrieved.")
      return ""

  def getArticleAuthors(self):
    if self.article != "":
      return self.article.authors
    else:
      print("Can't get authors when no article has been retrieved.")
      return ""

  def getArticlePublishDate(self):
    if self.article != "":
      return self.article.publish_date
    else:
      print("Can't get date when no article has been retrieved.")
      return ""

  def getArticleTopImage(self):
    if self.article != "":
      return self.article.top_image
    else:
      print("Can't get image when no article has been retrieved.")
      return ""
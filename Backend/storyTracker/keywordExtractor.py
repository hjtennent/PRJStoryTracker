from gensim.summarization import keywords

class KeywordExtractor:
  
  def getKeywords(self, article):
    kw = str(keywords(article))
    return (kw.split('\n'))
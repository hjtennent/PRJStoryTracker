from collections import Counter
import math

class SimilarityCalculator:

  def getSimilarity(self, userSig, testSig):
    userCounter = Counter(userSig)
    testCounter = Counter(testSig)
    return self.counterCosineSimilarity(userCounter, testCounter)

  def counterCosineSimilarity(self, userSig, testSig):
    if len(userSig) == 0 or len(testSig) == 0:
      return 0
    else:
      terms = set(userSig).union(testSig)
      dotprod = sum(userSig.get(k, 0) * testSig.get(k, 0) for k in terms)
      magA = math.sqrt(sum(userSig.get(k, 0)**2 for k in terms))
      magB = math.sqrt(sum(testSig.get(k, 0)**2 for k in terms))
      return round(float(dotprod) / (magA * magB), 3)
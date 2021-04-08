import os
from storyTracker.similarityCalculator import SimilarityCalculator
import unittest

class TestClass(unittest.TestCase):
  @classmethod
  def setUpClass(cls):
       pass

  @classmethod
  def tearDownClass(cls):
       pass 

  def setUp(self):
    self.calculator = SimilarityCalculator()

  def tearDown(self):
    pass 

  def test_get_similarity_different(self):
    signatureOne = ["jihadists", "jihadist", "french", "france military",
                    "countries", "forced", "force", "government", 
                    "governments", "killing"]
    signatureTwo = ["governments", "workers", "income", "incomes",
                    "government debts", "social spending", "digital",
                    "spends", "assistance", "labour"]
    similarity = self.calculator.getSimilarity(signatureOne, signatureTwo)
    self.assertEqual(similarity, 0.1)
  
  def test_get_similarity_same(self):
    signatureOne = ["jihadists", "jihadist", "french", "france military",
                    "countries", "forced", "force", "government", 
                    "governments", "killing"]
    signatureTwo = ["jihadists", "jihadist", "french", "france military", 
                    "countries", "forced", "force", "government", 
                    "governments", "killing"]
    similarity = self.calculator.getSimilarity(signatureOne, signatureTwo)
    self.assertEqual(similarity, 1)

  def test_get_similarity_same(self):
    signatureOne = []
    signatureTwo = []
    similarity = self.calculator.getSimilarity(signatureOne, signatureTwo)
    self.assertEqual(similarity, 0)

# runs the unit tests in the module
if __name__ == '__main__':
  unittest.main()
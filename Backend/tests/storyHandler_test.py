import os
from storyTracker.similarityCalculator import SimilarityCalculator
import unittest
from storyTracker.storyHandler import StoryHandler

class TestClass(unittest.TestCase):
  # initialization logic for the test suite declared in the test module
  # code that is executed before all tests in one test run
  @classmethod
  def setUpClass(cls):
       pass

  # clean up logic for the test suite declared in the test module
  # code that is executed after all tests in one test run
  @classmethod
  def tearDownClass(cls):
       pass 

  # initialization logic
  # code that is executed before each test
  def setUp(self):
    self.handler = StoryHandler()
    self.url = "https://www.bbc.co.uk/news/world-africa-55522236"
    self.handler.getArticleText(self.url)

  # clean up logic
  # code that is executed after each test
  def tearDown(self):
    pass 

  def test_get_article_text(self):
    expectedText = ("In that instance militants from the Group to Support Islam "
                    "and Muslims (GSIM), which is linked to al-Qaeda, said they"
                    " were behind the attack.")
    text = self.handler.getArticleText(self.url)
  
    self.assertEqual(text, expectedText)

  def test_get_article_title(self):
    expectedTitle = "Sahel conflict: Two French soldiers killed in Mali"
    title = self.handler.getArticleTitle()
  
    self.assertEqual(expectedTitle, title)

  def test_get_article_authors(self):
    expectedAuthors = []
    authors = self.handler.getArticleAuthors()
  
    self.assertEqual(expectedAuthors, authors)

  def test_get_article_date(self):
    expectedDate = None
    date = self.handler.getArticlePublishDate()
  
    self.assertEqual(expectedDate, date)

  def test_get_article_image(self):
    expectedImg = ("https://ichef.bbci.co.uk/news/1024/branded_news/10F3E/"
                  "production/_115783496_gettyimages-1206918033.jpg")
    img = self.handler.getArticleTopImage()
  
    assert expectedImg in img

  

# runs the unit tests in the module
if __name__ == '__main__':
  unittest.main()
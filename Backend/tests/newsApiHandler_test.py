import os
import unittest
from storyTracker.newsApiHandler import NewsAPIHandler

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
    self.handler = NewsAPIHandler()

  # clean up logic
  # code that is executed after each test
  def tearDown(self):
    pass 

  def test_get_sources(self):
    # sends HTTP GET request to the application
    # on the specified path
    sources = self.handler.getSources()
    # assert the method returns an array
    self.assertEqual(len(sources), 10)

  def test_get_top_headlines(self):
    headlines = self.handler.getTopHeadlines()
    assert len(headlines) <= 25

  def test_get_top_bbc_headlines(self):
    headlines = self.handler.getTopBBCHeadline()
    assert headlines == "No articles found." or headlines['author'] == 'BBC News'


# runs the unit tests in the module
if __name__ == '__main__':
  unittest.main()
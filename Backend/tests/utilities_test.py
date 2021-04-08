import os
import unittest
from storyTracker.utilities import sortStoriesByMostSimilar

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
    pass

  # clean up logic
  # code that is executed after each test
  def tearDown(self):
    pass 

  def test_dictionary_sorter(self):
    dictToSort = {'test': {
      'url': 'test',
      'score': 0.1
    }, 'test2': {
      'url': 'test2',
      'score': 0.2
    }, 'test3': {
      'url': 'test3',
      'score': 0.3
    }}
    sortedDict = sortStoriesByMostSimilar(dictToSort)
    expectedDict = {'test3': {
      'url': 'test3',
      'score': 0.3
    }, 'test2': {
      'url': 'test2',
      'score': 0.2
    }, 'test': {
      'url': 'test',
      'score': 0.1
    }}
    assert expectedDict == sortedDict

  def test_empty_dictionary_sorter(self):
    dictToSort = {}
    sortedDict = sortStoriesByMostSimilar(dictToSort)
    assert sortedDict != None
    assert sortedDict == {}
  
# runs the unit tests in the module
if __name__ == '__main__':
  unittest.main()
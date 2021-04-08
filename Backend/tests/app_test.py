import os
import unittest
from app import app
import urllib.parse

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
    self.app = app.test_client()

  # clean up logic
  # code that is executed after each test
  def tearDown(self):
    pass 

  def test_home(self):
    # sends HTTP GET request to the application
    # on the specified path
    result = self.app.get('/')

    # assert the status code of the response
    self.assertEqual(result.status_code, 200) 
    self.assertEqual(result.data, b'<h1>Welcome to our server !!</h1>')

  def test_story(self):
    # sends HTTP GET request to the application
    # on the specified path
    originalURL = ("https://www.economist.com/middle-east-and-africa/2021/02/17/" 
                  "frances-forever-war-in-the-sahel")
    URL = urllib.parse.quote(originalURL)
    result = self.app.get('/story/?url=' + URL)
    html = result.data.decode()
    
    # assert the response data
    assert result.status_code == 200
    assert ('["jihadists","jihadist","french","france military","countries"'
            ',"forced","force","government","governments","killing"]') in html
    assert "Which way out?" in html #article title
    assert originalURL in html

  #test with no id to story endpoint
  def test_story_without_url(self):
    # sends HTTP GET request to the application
    # on the specified path
    result = self.app.get('/story/')
    html = result.data.decode()
    
    # assert the response data
    assert 'ERROR' in html
    assert 'No URL found, please send a URL.' in html

  #test update endpoint
  def test_update(self):
    # sends HTTP GET request to the application on the specified path
    id = "-MUy8GOdXyoVN0KhDOAd"
    topic = ('["jihadists","jihadist","french","france military","countries"'
            ',"forced","force","government","governments","killing"]')
    test = str(True)
    encodedId = urllib.parse.quote(id)
    encodedTopic = urllib.parse.quote(topic)
    result = self.app.get('/update/?id=' + encodedId + '&topic=' +
                encodedTopic + '&test=' + test)
    html = result.data.decode()
    
    # assert the response data
    assert result.status_code == 200
    assert "SIMILARITIES" in html
    
  #test update endpoint with no id
  def test_update_without_id(self):
    topic = ('["jihadists","jihadist","french","france military","countries"'
            ',"forced","force","government","governments","killing"]')
    test = str(True)
    encodedTopic = urllib.parse.quote(topic)
    #Don't send ID and check the error is handled correctly
    result = self.app.get('/update/?topic=' + encodedTopic + '&test=' + test)
    html = result.data.decode()
    
    # assert the response data
    assert "ERROR" in html
    assert "Please send both an ID and a topic signature." in html

  #test update endpoint with no topic
  def test_update_without_topic(self):
    id = "-MUy8GOdXyoVN0KhDOAd"
    test = str(True)
    encodedId = urllib.parse.quote(id)
    #Don't send ID and check the error is handled correctly
    result = self.app.get('/update/?id=' + encodedId + '&test=' + test)
    html = result.data.decode()
    
    # assert the response data
    assert "ERROR" in html
    assert "Please send both an ID and a topic signature." in html

# runs the unit tests in the module
if __name__ == '__main__':
  unittest.main()
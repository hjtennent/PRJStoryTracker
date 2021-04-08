# app.py
from flask import Flask
from storyTracker.storyTracker import respondEndpoint, updateEndpoint, indexEndpoint, biasEndpoint

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# User follows a new story
@app.route('/story/', methods=['GET'])
def respond():
  return respondEndpoint()
    
# User gets updates on an existing story
@app.route('/update/', methods=['GET'])
def update():
  return updateEndpoint()

# User gets a bias score based on their viewed stories
@app.route('/bias/', methods=['GET'])
def bias():
  return biasEndpoint()

#Default landing page of the endpoint
@app.route('/')
def index():
  return indexEndpoint()

if __name__ == '__main__':
    # Threaded option to enable multiple instances 
    # for multiple user access support
    app.run(threaded=True, port=5000)
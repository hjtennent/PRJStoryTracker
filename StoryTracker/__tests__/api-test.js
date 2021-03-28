import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getStoryDetails } from '../app/helper/api/api';

Enzyme.configure({ adapter: new Adapter() })

describe('API Helper Functions', () => {
  //Ensure correct details are returned from /story/ endpoint
  it('getStoryDetails', async () => {
    const response = await getStoryDetails("https://www.economist.com/middle-east-and-africa/2021/02/17/frances-forever-war-in-the-sahel");
    const expectedResponse = {
      "AUTHORS": ["The Economist"],
      "DATE": "Wed, 17 Feb 2021 00:00:00 GMT",
      "IMAGE": "https://www.economist.com/img/b/1280/720/90/sites/default/files/images/2021/02/articles/main/20210220_map002.jpg",
      "KEYWORDS": ["jihadists", "jihadist", "french", "france military", "countries", "forced", "force", "government", "governments", "killing"],
      "STATUS": 200, 
      "STORY": "A T MIDDAY ON January 2nd the roar of motorbikes cut through the quiet near Tchoma Bangou and Zaroumadareye, two villages in western Niger. Next came the rat-tat-tat of gunfire. Then the screaming, as", "TITLE": "Which way out? - France’s forever war in the Sahel",
      "URL": "https://www.economist.com/middle-east-and-africa/2021/02/17/frances-forever-war-in-the-sahel"
    }
    expect(response).toStrictEqual(expectedResponse);
  });
});


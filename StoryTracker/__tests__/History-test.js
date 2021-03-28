import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import History from '../app/component/screens/History';
import { ScrollView, Text } from 'react-native';
import StoryButton from '../app/component/common/StoryButton';
import StoryBox from '../app/component/common/StoryBox';

Enzyme.configure({ adapter: new Adapter() })

describe('<History />', () => {

  const routeParams = { params: {
    storyID: "testID",
    storyUpdates: [('headline', {'url':'testURL', 'score': '0.5'})]
  }}

  it('renders a scroll view and story button, but no story box', () => {
    const wrapper = shallow(<History route={routeParams}/>);
    expect(wrapper.find(ScrollView).length).toBe(1);
    expect(wrapper.find(StoryButton).length).toBe(1);
    expect(wrapper.find(StoryBox).length).toBe(0);
  });

  it('renders correctly', () => {
    const tree = TestRenderer.create(<History route={routeParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});



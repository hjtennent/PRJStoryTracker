import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render } from '@testing-library/react-native';
import History from '../app/component/screens/Updates';
import { ScrollView, Text } from 'react-native';
import StoryBox from '../app/component/common/StoryBox';

Enzyme.configure({ adapter: new Adapter() })

describe('<History />', () => {
  const routeParams = { params: {
    storyID: "testID",
    storyUpdates: [('headline', {'url':'testURL', 'score': '0.5'})]
  }}

  it('renders a text input and button to submit link', () => {
    const wrapper = shallow(<History route={routeParams}/>);
    expect(wrapper.find(ScrollView).length).toBe(1);
    expect(wrapper.find(Text).length).toBe(3);
  });

  it('renders correctly', () => {
    const tree = TestRenderer.create(<History route={routeParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});



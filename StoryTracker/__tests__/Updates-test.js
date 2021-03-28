import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render } from '@testing-library/react-native';
import Updates from '../app/component/screens/Updates';
import { ScrollView, Text } from 'react-native';
import StoryBox from '../app/component/common/StoryBox';

Enzyme.configure({ adapter: new Adapter() })

describe('<Updates />', () => {

  const routeParams = { params: {
    storyUpdates: [('headline', {'url':'testURL', 'score': '0.5'})]
  }}

  it('renders a scroll view and text', () => {
    const wrapper = shallow(<Updates route={routeParams}/>);
    expect(wrapper.find(ScrollView).length).toBe(1);
    expect(wrapper.find(Text).length).toBe(3);
  });

  it('Check story updates creates a StoryBox', () => {
    const wrapper = shallow(<Updates route={routeParams} />);
    expect(wrapper.find(StoryBox).length).toBe(1);
  })

  test('Check similar heading is present', () => {
    const { getByText } = render(<Updates route={routeParams}/>);
    const element = getByText("Most similar stories: ");
    expect(element).not.toBe(null);
  })
  
  test('Check other heading is present', () => {
    const { getByText } = render(<Updates route={routeParams}/>);
    const element = getByText("Other stories:");
    expect(element).not.toBe(null);
  })
  
  test('renders correctly', () => {
    const tree = TestRenderer.create(<Updates route={routeParams}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});


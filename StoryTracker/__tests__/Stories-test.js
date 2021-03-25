import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render } from '@testing-library/react-native';
import Stories from '../app/component/screens/Stories';
import { ScrollView, Text } from 'react-native';

Enzyme.configure({ adapter: new Adapter() })

describe('<Stories />', () => {
  it('renders a text input and button to submit link', () => {
    const wrapper = shallow(<Stories />);
    expect(wrapper.find(ScrollView).length).toBe(1);
    expect(wrapper.find(Text).length).toBe(1);
  });

});

test('Check title is present', () => {
  const { getByText } = render(<Stories />);
  const element = getByText("Your Followed Stories");
  expect(element).not.toBe(null);
})

test('renders correctly', () => {
  const tree = TestRenderer.create(<Stories />).toJSON();
  expect(tree).toMatchSnapshot();
});

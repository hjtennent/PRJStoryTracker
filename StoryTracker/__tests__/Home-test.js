import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render } from '@testing-library/react-native';
import Home from '../app/component/screens/Home';
import { TextInput } from 'react-native';
import StoryButton from '../app/component/common/StoryButton';

Enzyme.configure({ adapter: new Adapter() })

describe('<Home />', () => {
  it('renders a text input and button to submit link', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(StoryButton).length).toBe(2);
    expect(wrapper.find(TextInput).length).toBe(1);
  });
});

test('Check title is present', () => {
  const { getByTestId } = render(<Home />);
  const element = getByTestId("mainTitle");
  expect(element).not.toBe(null);
})

test('renders correctly', () => {
  const tree = TestRenderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

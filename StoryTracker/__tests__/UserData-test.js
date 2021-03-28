import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserData from '../app/component/screens/UserData';
import { ScrollView, Text } from 'react-native';
import StoryButton from '../app/component/common/StoryButton';

Enzyme.configure({ adapter: new Adapter() })

describe('<UserData />', () => {

  it('at least 6 text boxes', () => {
    const wrapper = shallow(<UserData />);
    expect(wrapper.find(ScrollView).length).toBe(1);
    expect(wrapper.find(Text).length).toBeGreaterThanOrEqual(6);
  });

  it('One StoryButton for removing account', () => {
    const wrapper = shallow(<UserData />);
    expect(wrapper.find(StoryButton).length).toBe(1);
  })
  
  test('renders correctly', () => {
    const tree = TestRenderer.create(<UserData />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should remove account', async () => {
    const page = render(<UserData />);
    const removeAccountButton = page.getByText("Remove Account");
    // WHEN: simulate user interaction
    fireEvent.press(removeAccountButton);
    // THEN: expect a visual feedback
    const signedOut = await waitFor(() => page.queryByText("Remove Account"));
    expect(signedOut).toBeTruthy();
  });

});


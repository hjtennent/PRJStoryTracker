import React from 'react';
import LogIn from '../app/component/screens/LogIn';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { TextInput } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render, fireEvent, waitFor } from '@testing-library/react-native';

Enzyme.configure({ adapter: new Adapter() })

describe('<LogIn />', () => {
  it('renders two <TextInput /> components', () => {
    const wrapper = shallow(<LogIn />);
    expect(wrapper.find(TextInput).length).toBe(2);
  });

});

test('Check email field is present', () => {
  const { getByPlaceholderText } = render(<LogIn />);
  const element = getByPlaceholderText('Email');
  expect(element).not.toBe(null);
})

test('Check password field is present', () => {
  const { getByPlaceholderText } = render(<LogIn />);
  const element = getByPlaceholderText('Password');
  expect(element).not.toBe(null);
})

test('renders correctly', () => {
  const tree = TestRenderer.create(<LogIn />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should log in', async () => {
  // SETUP: render the page you want to test
  const page = render(<LogIn />);
  // GIVEN: get the DOM elements you want to interact with
  const emailInput = page.getByPlaceholderText("Email");
  const passwordInput = page.getByPlaceholderText("Password");
  const loginButton = page.getByText("Login");
  // WHEN: simulate user interaction
  fireEvent.changeText(emailInput, "test3@test.com");
  fireEvent.changeText(passwordInput, "testtest");
  fireEvent.press(loginButton);
  // THEN: expect a visual feedback
  const loggedIn = await waitFor(() => page.queryByText("Login"));
  expect(loggedIn).toBeTruthy();
});

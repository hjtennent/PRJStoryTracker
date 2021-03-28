import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { TextInput } from 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../app/component/screens/SignUp';

Enzyme.configure({ adapter: new Adapter() })

describe('<SignUp />', () => {
  it('renders two <TextInput /> components', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find(TextInput).length).toBe(2);
  });

});

test('Check email field is present', () => {
  const { getByPlaceholderText } = render(<SignUp />);
  const element = getByPlaceholderText('Email');
  expect(element).not.toBe(null);
})

test('Check password field is present', () => {
  const { getByPlaceholderText } = render(<SignUp />);
  const element = getByPlaceholderText('Password');
  expect(element).not.toBe(null);
})

it('should sign up', async () => {
  const page = render(<SignUp />);
  //Get inputs and buttons to control
  const emailInput = page.getByPlaceholderText("Email");
  const passwordInput = page.getByPlaceholderText("Password");
  const signUpButton = page.getByText("Sign Up");
  //Fill in values
  fireEvent.changeText(emailInput, "test10@test.com");
  fireEvent.changeText(passwordInput, "testtest");
  fireEvent.press(signUpButton);

  const signedUp = await waitFor(() => page.queryByText("Sign Up"));
  expect(signedUp).toBeTruthy();
});

test('renders correctly', () => {
  const tree = TestRenderer.create(<SignUp />).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import LogIn from '../app/component/screens/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from "@testing-library/react-native"
import Auth from '../app/component/navigators/Auth';

jest.mock('@react-native-firebase/auth', () => {
  return {
      onAuthStateChanged: jest.fn({user: 'user'}),
      signInWithEmailAndPassword: jest.fn(),
  }
})

test('renders correctly', () => {
  const tree = renderer.create(<LogIn />).toJSON();
  expect(tree).toMatchSnapshot();
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

//Check it navigates to SignUp
test('Check we can navigate to SignUp page', () => {
  const component = (
      <LogIn />
  );
  const { findByText } = render(component);
  const toClick = findByText('Sign Up');
  
  fireEvent(toClick, 'press');
  const signUpPageText = findByText('Already have an account?'); //specific to SignUp page

  expect(signUpPageText).toBeTruthy();
})

//Check LogIn button and firebase signin method

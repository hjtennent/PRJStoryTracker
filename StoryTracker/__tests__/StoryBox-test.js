import React from 'react';
import renderer from 'react-test-renderer';
import StoryBox from '../app/component/common/StoryBox';
import { configure } from 'enzyme';
import { render, fireEvent } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('StoryBox renders correctly', () => {
  const tree = renderer.create(<StoryBox onPress={jest.fn()} text={"www.test.com"} 
                                  url={"www.test.com"} similarity="0.0"/>
                              ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('StoryBox onPress function fires', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <StoryBox onPress={mockFn} text={"www.test.com"} url="www.test.com"
      similarity="0.0" />
  );
  fireEvent.press((getByText('www.test.com')))
  expect(mockFn.mock.calls.length).toBe(1);
})
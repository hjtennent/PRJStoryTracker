import React from 'react';
import renderer from 'react-test-renderer';
import StoryButton from '../app/component/common/StoryButton';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, fireEvent } from '@testing-library/react-native';

configure({ adapter: new Adapter() });

test('StoryButton renders correctly', () => {
  const tree = renderer.create(
      <StoryButton onPress={jest.fn()} makeHighlight={false}
        text={"Text"} smallText={"Small Text"}/>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('onPress function fires', () => {
  const mockFn = jest.fn();
  const { getByText } = render(
    <StoryButton onPress={mockFn} makeHighlight={false} text="Text" 
      smallText="Small Text" />
  );
  fireEvent.press((getByText('Text')))
  expect(mockFn.mock.calls.length).toBe(1);
})


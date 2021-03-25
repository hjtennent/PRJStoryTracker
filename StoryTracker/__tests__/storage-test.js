import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { storeData, getData, clearData } from '../app/helper/storage/storage';

Enzyme.configure({ adapter: new Adapter() })

describe('Storage Helper Functions', () => {
  it('getData', async () => {
    const response = await getData('messages')
    expect(response).toBe(null);
  });
  it('getData after storing data', async () => {
    const value = { test: "object" }
    const response = storeData(value).then(async () => getData('messages'))
    expect(response).resolves.toBe(value);
  });
  it('clearData', async () => {
    const value = { test: "object" }
    const response = storeData(value).then(async () => clearData().then(async () => getData('messages')))
    expect(response).resolves.toBe(null);
  });
});


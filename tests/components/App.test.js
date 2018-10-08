import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/components/App';

global.fetch = require('jest-fetch-mock');

describe('App', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });

  afterEach(() => {
    wrapper = null;
    instance = null;
  });

  test('string to number', () => {
    const result = instance.stringToNumber('12');
    const expected = 12;
    expect(result).toEqual(expected);
  });

  test('string to number for picture cards', () => {
    const result = instance.stringToNumber('KING');
    const expected = 13;
    expect(result).toEqual(expected);
  });

  test('data clean maps array', () => {
    const result = instance.cleanData([
      { image: 'url', value: 'KING', ref: 'KD' }
    ]);
    const expected = [{ img: 'url', value: 13 }];
    expect(result).toEqual(expected);
  });

  test('card shuffle', () => {
    const mockRandom = jest.fn();
    mockRandom.mockReturnValue(0.5231);
    global.Math.random = mockRandom;
    const result = instance.shuffleCards(['a', 'b', 'c', 'd']);
    const expected = ['a', 'd', 'b', 'c'];
    expect(result).toEqual(expected);
  });
});

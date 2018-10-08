import React from 'react';
import { shallow, render } from 'enzyme';

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

  describe('On load', () => {
    test('User should be shown instructions on how to play', () => {
      const output = render(<App />);
      expect(output).toMatchSnapshot();
      console.log(output);
    });

    test('cleanData should return an object with two properties {img: string, value: number}', () => {
      const result = instance.cleanData([
        { image: 'url', value: 'KING', ref: 'KD' }
      ]);
      const expected = [{ img: 'url', value: 13 }];
      expect(result).toEqual(expected);
      expect(typeof result[0].img).toEqual('string');
      expect(typeof result[0].value).toEqual('number');
    });

    test('stringToNumber should return numerical string values as numbers', () => {
      const result = instance.stringToNumber('12');
      const expected = 12;
      expect(result).toEqual(expected);
    });

    test('stringToNumber should return picture cards as number values', () => {
      const result = instance.stringToNumber('KING');
      const expected = 13;
      expect(result).toEqual(expected);
    });

    test('cardShuffle should return a randomised array', () => {
      const mockRandom = jest.fn();
      mockRandom.mockReturnValue(0.5231);
      global.Math.random = mockRandom;
      const result = instance.shuffleCards(['a', 'b', 'c', 'd']);
      const expected = ['a', 'd', 'b', 'c'];
      expect(result).toEqual(expected);
    });
  });

  describe('On game start', () => {
    test('startGame should initialises App.state conditions', () => {
      instance.startGame(['a', 'b', 'c', 'd'], 2);
      expect(instance.state.inGame).toEqual(true);
      expect(instance.state.winner).toEqual('');
      expect(instance.state.roundResult).toEqual('');
      expect(instance.state.round).toEqual(1);
      expect(instance.state.score.player).toEqual(2);
      expect(instance.state.score.player).toEqual(2);
    });

    test('startGame should call dealCards with an array and a number', () => {
      const mockDealCards = jest.fn();
      global.dealCards = mockDealCards;
      instance.startGame(['a', 'b', 'c', 'd', 'e'], 2);
      expect(mockDealCards).toBeCalledWith(['a', 'b', 'c', 'd', 'e'], 2);
    });
  });

  describe('During play', () => {
    test('cardToEnd should move first card in array to the end ', () => {
      const result = instance.cardToEnd(['a', 'b', 'c', 'd']);
      const expected = ['b', 'c', 'd', 'a'];
      expect(result).toEqual(expected);
    });
  });
});

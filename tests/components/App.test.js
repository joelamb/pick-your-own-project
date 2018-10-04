import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/components/App';

global.fetch = require('jest-fetch-mock');

describe('App', () => {

    test('string to number', () => {
        const wrapper = shallow(< App />);
        const instance = wrapper.instance();
        const result = instance.stringToNumber("12");
        const expected = 12;
        expect(result).toEqual(expected);
    });

    test('string to number handles NaN', () => {
        const wrapper = shallow(<App />);
        const instance = wrapper.instance();
        const result = instance.stringToNumber('unknown');
        const expected = 'No data';
        expect(result).toEqual(expected);
    });


});

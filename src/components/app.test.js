import React from 'react';
import { shallow } from 'enzyme';
import App from "./app";
import Map from './map';

let wrapped;

beforeEach(() => {
    wrapped = shallow(<App />);
});


it('shows a Map', () => {
    expect(wrapped.find(Map).length).toEqual(1);
});
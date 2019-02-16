// test file
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import {App} from '../App'

// var wrapper = enzyme.shallow(<App />);
test('Should render AdminPage component', () => {
    const alert = {
        messsage: '',
        type: ''
    }
    const wrapper = shallow(<App alert={alert}/>);
    expect(wrapper).toMatchSnapshot();
});
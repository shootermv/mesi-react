// test file

import React from 'react';
import {shallow} from 'enzyme'


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
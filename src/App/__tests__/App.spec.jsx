// test file

import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

import {App} from '../App'

// var wrapper = enzyme.shallow(<App />);
test('Should render AdminPage component', () => {
    const alert = {
        messsage: '',
        type: ''
    }
    const wrapper = Enzyme.shallow(<App alert={alert}/>);
    expect(wrapper).toMatchSnapshot();
});
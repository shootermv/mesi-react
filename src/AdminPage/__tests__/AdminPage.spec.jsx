// test file
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import {AdminPage}  from '../AdminPage';


/*test('Should render AdminPage component', () => {
    const testUser = {
        firstName: '',
        lastName: '',
        tasks: []
    }
    const wrapper = shallow(<AdminPage user={testUser} />);
    expect(wrapper).toMatchSnapshot();
});*/

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

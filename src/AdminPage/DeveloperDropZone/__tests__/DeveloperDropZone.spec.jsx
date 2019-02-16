// test file
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import {DeveloperDropZone}  from '../DeveloperDropZone'

test('Should render DeveloperDropZone component', () => {
    const testUser = {
        firstName: '',
        lastName: '',
        tasks: []
    }
    const wrapper = shallow(<DeveloperDropZone user={testUser} />);
    expect(wrapper).toMatchSnapshot();
});
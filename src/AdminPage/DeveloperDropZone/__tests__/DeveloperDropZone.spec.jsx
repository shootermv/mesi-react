// test file
import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });
import {DeveloperDropZone}  from '../DeveloperDropZone'

test('Should render DeveloperDropZone component', () => {
    const testUser = {
        firstName: '',
        lastName: '',
        tasks: []
    }
    const wrapper = Enzyme.shallow(<DeveloperDropZone user={testUser} />);
    expect(wrapper).toMatchSnapshot();
});
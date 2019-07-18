// test file
import React from 'react';
import {shallow} from 'enzyme'

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
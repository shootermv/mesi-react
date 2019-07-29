// test file
import React from 'react';
import {shallow} from 'enzyme';
import {NotConnAdminPage as AdminPage} from '../AdminPage';

const mockDispatch = jest.fn();

afterEach(() => {
  mockDispatch.mockClear();
});

test('Admin page should have title that says "Hi"', () => {
  const data = {
      admin: {firstName:'sasha'},
      tasks: {loading: true},
      users: {loading: true},
      getAll: () => {}
  };
  const admin = shallow(<AdminPage  dispatch={mockDispatch} {...data}/>);

  expect(admin.find('h1').text()).toContain('Hi sasha!');

});

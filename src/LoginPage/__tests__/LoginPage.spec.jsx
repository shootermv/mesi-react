import React from 'react';
import {shallow} from 'enzyme';
import {NotConnLoginPage} from '../LoginPage';
  // our mock login function to replace the one provided by mapDispatchToProps
const mockDispatch = jest.fn();

afterEach(() => {
  mockDispatch.mockClear();
});

test('Login page should  have title "Login"', () => {
  // Render a checkbox with label in the document
  const login = shallow(<NotConnLoginPage  dispatch={mockDispatch}/>);

  expect(login.find('h2').text()).toContain('Login');

});

test('When submitting with empty inputs - should display valiadtion errors"', () => {
  // Render a checkbox with label in the document
  const login = shallow(<NotConnLoginPage  dispatch={mockDispatch}/>);
  login.find('form').simulate(
    'submit', 
    {preventDefault() {}}
  )
  expect(login.find('div.help-block').first().text()).toContain('Username is required');

});

test('When submitting with some credentialls - should call "dispatch"', () => {
  // Render a checkbox with label in the document
  const login = shallow(<NotConnLoginPage  dispatch={mockDispatch}/>);
  expect(mockDispatch).toHaveBeenCalledWith({"type": "USERS_LOGOUT"});
  expect(typeof mockDispatch.mock.calls[0][0]).toBe('object');
  mockDispatch.mockClear();
  login.find('input').at(0).simulate('change', { target: { name: 'username', value: 'Changed' } });
  login.find('input').at(1).simulate('change', { target: { name: 'password', value: 'Changed' } });
  login.find('form').simulate(
    'submit', 
    {preventDefault() {}}
  )
  expect(mockDispatch).toHaveBeenCalled();
  expect(typeof mockDispatch.mock.calls[0][0]).toBe('function');

});
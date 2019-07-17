import React from 'react';
import {shallow} from 'enzyme';
import {NotConnLoginPage} from '../LoginPage';
  // our mock login function to replace the one provided by mapDispatchToProps
const mockDispatch = jest.fn();
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
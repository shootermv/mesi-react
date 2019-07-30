import React from "react";
import { shallow } from "enzyme";
import { NotConnPrivatePage } from "../PrivatePage";
// our mock login function to replace the one provided by mapDispatchToProps
const mockDispatch = jest.fn();

afterEach(() => {
  mockDispatch.mockClear();
});

test('Private page should  have title "Hi username"', () => {
  const data = {
    user: { _id: "1", firstName: "bobo" },
    getById: () => {}
  };
  const privatePage = shallow(
    <NotConnPrivatePage dispatch={mockDispatch} {...data} />
  );

  expect(privatePage.find("h1").text()).toContain("Hi bobo");
});

test('Private page should display list with tasks', () => {
  const tasks = [
      { _id: 1, summary: 'summary 1' }, 
      { _id: 2, summary: 'summary 2' }, 
      { _id: 3, summary: 'summary 3' }
  ];
  const data = {
    user: { _id: "1", firstName: "bobo", tasks },
    getById: () => {}
  };
  const privatePage = shallow(
    <NotConnPrivatePage dispatch={mockDispatch} {...data} />
  );

  expect(privatePage.find("ul li").length).toBe(3);
});

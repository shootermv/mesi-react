import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import  { userActions as actions } from '../user.actions';
import {userConstants as types}  from '../../_constants/user.constants'
import fetchMock from 'fetch-mock';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async user actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_USERS_SUCCESS when fetching user has been done', () => {
    const mockUser = {
      _id: "1", 
      firstName: "Jojo", 
      lastName: "BenJuou", 
      username: "jojoslaaav"
    };
        
    fetchMock.getOnce(`${process.env.REACT_APP_API_URL}/users/1`, mockUser)

    const expectedActions = [
      { id: {id: 1}, type: types.GETUSER_REQUEST },
      { type: types.GETUSER_SUCCESS, user: mockUser}
    ]
    const store = mockStore({authentication: { user: null }});

    return store.dispatch(actions.getById(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
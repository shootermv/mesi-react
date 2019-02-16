import { alertActions as actions } from './alert.actions';
import { alertConstants  as types } from '../_constants/alert.constants';

describe('actions', () => {
  it('should create an action success', () => {
    const message = 'success!'
    const expectedAction = {
      type: types.SUCCESS,
      message
    }
    expect(actions.success(message)).toEqual(expectedAction)
  })
})
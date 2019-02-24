import { userActions, taskActions } from '../_actions';

export const allActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(userActions.getAll());
        dispatch(taskActions.getAll());
    }
}

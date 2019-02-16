import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { taskActions } from './task.actions';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    delete: _delete,
    assign,
    changeStatus
};

function getById(id) {
    return dispatch => {
        dispatch(request({id}));

        userService.getById(id)
            .then(
                user => { 
                    dispatch(success(user));                   
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );        
    };
    function request(id) { return { type: userConstants.GETUSER_REQUEST, id } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }    
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    if (user.role === 'admin') {
                        history.push('/admin');
                    } else {
                        history.push('/private');
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function assign(user, task) {
    
    return dispatch => {
        dispatch(request());

        userService.assign(user, task)
            .then(
                () => {
                     dispatch(taskActions.getAll()); // TODO: change this in the future to get tasks of this specific user instead of getting all users
                     dispatch(getAll());
                     dispatch(success());   
                },
                error => dispatch(failure( error.toString()))
            );
    };

    function request() { return { type: userConstants.ASSIGN_REQUEST} }   
    function success() { return { type: userConstants.ASSIGN_SUCCESS } } 
    function failure(error) { return { type: userConstants.ASSIGN_FAILURE, error } }
}

function changeStatus(user, task) {
    const taskCopy = { ...task, status:  task.status >= 2 ? 0 : task.status + 1};

    return dispatch => {
        dispatch(request());

        userService.changeStatus(user, taskCopy)
            .then(
                (resTask) => dispatch(success(resTask)),
                error => dispatch(failure( error.toString()))
            );
    };

    function request() { return { type: userConstants.CHANGE_STATUS_REQUEST} }   
    function success(newTask) { return { type: userConstants.CHANGE_STATUS_SUCCESS, task: newTask} } 
    function failure(error) { return { type: userConstants.CHANGE_STATUS_FAILURE, error } }
}
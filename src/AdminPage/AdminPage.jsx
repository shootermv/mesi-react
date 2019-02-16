import React from 'react';
import { connect } from 'react-redux';
import { userActions, taskActions } from '../_actions';
import {DeveloperDropZone} from './DeveloperDropZone';
import socketIOClient from "socket.io-client";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          summary: '',
          response: false,
          endpoint: `${process.env.REACT_APP_API_URL}`
        }
        
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("status-change", () => {        
            this.props.getAll();
        });

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAssignTaskToUser = this.handleAssignTaskToUser.bind(this);
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.save = this.save.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleAssignTaskToUser(user, e) {
        e && e.preventDefault();
        this.props.assign(user, this.props.draggedTask);
    }

    deleteTask(task, e) {
        e && e.preventDefault();
        this.props.deleteTask(task);
    }

    componentDidMount() {
        this.props.getAll();
    }
    
    dragStartHandler(task, ev) {
        this.props.taskStartedDragging(task);//.dispatch(taskActions.taskStartedDragging(task));
        ev.dataTransfer.setData("text", ev.target.id);       
    }

    save(e) {
        e.preventDefault();
        this.state.summary && this.props.createTask(this.state.summary);
        this.setState({summary: ''});
    }

    render() {
        const { admin, users, tasks } = this.props;
        return (<div>
                <h1>Hi {admin.firstName}!</h1>
                <form>
                    <input name="summary" name="summary" value={this.state.summary} placeholder="what is the task"
         onChange={this.handleInputChange}/>
                    <button onClick={e => this.save(e)}>Save</button>
                </form>
                <hr/>
                 <h3>Unassigned tasks:</h3>
                {tasks.loading && <em>Loading tasks...</em>}
                {tasks.error && <span className="text-danger">ERROR: {tasks.error}</span>}
                {tasks.items && tasks.items.length ?
                    <ul>
                        {tasks.items.map((task, index) =>
                            <li key={task.id} draggable="true" onDragStart={ev => this.dragStartHandler(task, ev)}>
                                <span className="glyphicon glyphicon-th-list"></span> {task.summary} 
                                <a onClick={e => this.deleteTask(task, e)}><span className="glyphicon glyphicon-remove"></span></a>
                            </li>
                        )}
                    </ul>: !tasks.loading && tasks.items && tasks.items.length===0 && 'No tasks yet'
                }    
                <hr/>   
                <h3>Developers:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <div className='row'>
                        {users.items.filter(u => u.role !== 'admin').map((user, index) =>
                            <DeveloperDropZone user={user} key={user.id} assignTaskToUser={this.handleAssignTaskToUser}/>
                        )}
                    </div>
                }
        </div>);
    }
}

function mapStateToProps(state) {
    const { users, authentication:{user: admin}, tasks, tasks:{draggedTask} } = state;
    return {
        admin,
        users,
        tasks,
        draggedTask
    };
}

function mapDispatchToProps(dispatch) {
    return {
        assign: (user, task) => {
            dispatch(userActions.assign(user, task))
        },
        getAll: () => {
            dispatch(userActions.getAll());
            dispatch(taskActions.getAll());
        },
        deleteTask: (task) => {
            dispatch(taskActions.delete(task._id));
        },
        taskStartedDragging: (task) => {
            dispatch(taskActions.taskStartedDragging(task));
        },
        createTask: (task) => {
            dispatch(taskActions.createTask(task));
        }    
    }
}

const connectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export { connectedAdminPage as AdminPage };

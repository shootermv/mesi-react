import React from 'react';
import { connect } from 'react-redux';
import { userActions, taskActions, allActions as all } from '../_actions';
import { DeveloperDropZone } from './DeveloperDropZone';
import socketIOClient from "socket.io-client";

const endpoint = `${process.env.REACT_APP_API_URL}`;

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: '',
            response: false,
            endpoint
        }

        const socket = socketIOClient(endpoint);
        socket.on("status-change", () => {
            this.props.getAll();
        });
    }

    handleInputChange = ({target:{name, value}}) => {
        this.setState({
            [name]: value
        });
    }

    handleAssignTaskToUser = (user, e) => {
        e && e.preventDefault();
        this.props.assign(user, this.props.draggedTask);
    }

    deleteTask = ({ _id: id }, e) => {
        e && e.preventDefault();
        this.props.deleteTask(id);
    }

    dragStartHandler = (task, ev) => {
        this.props.taskStartedDragging(task);//.dispatch(taskActions.taskStartedDragging(task));
        ev.dataTransfer.setData("text", ev.target.id);
    }

    save = (e) => {
        e.preventDefault();
        this.state.summary && this.props.createTask(this.state.summary);
        this.setState({ summary: '' });
    }

    /* life hooks */
    componentDidMount() {
        this.props.getAll();
    }

    render() {
        const { admin, users, tasks } = this.props;
        const { summary } = this.state;
        return (<div>
            <h1>Hi {admin.firstName}!</h1>
            <form>
                <input name="summary" value={summary} placeholder="what is the task"
                    onChange={this.handleInputChange} />
                <button onClick={this.save}>Save</button>
            </form>
            <hr />
            <h3>Unassigned tasks:</h3>
            {tasks.loading && <em>Loading tasks...</em>}
            {tasks.error && <span className="text-danger">ERROR: {tasks.error}</span>}
            {tasks.items && tasks.items.length ?
                <ul>
                    {tasks.items.map((task, index) =>
                        <li key={task.id} draggable="true" onDragStart={ev => this.dragStartHandler(task, ev)}>
                            <span className="glyphicon glyphicon-th-list"></span> {task.summary}
                            <a href="#top" onClick={e => this.deleteTask(task, e)}><span className="glyphicon glyphicon-remove"></span></a>
                        </li>
                    )}
                </ul> : !tasks.loading && tasks.items && tasks.items.length === 0 && 'No tasks yet'
            }
            <hr />
            <h3>Developers:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <div className='row'>
                    {users.items.filter(u => u.role !== 'admin').map((user, index) =>
                        <DeveloperDropZone user={user} key={user.id} assignTaskToUser={this.handleAssignTaskToUser} />
                    )}
                </div>
            }
        </div>);
    }
}

function mapStateToProps(state) {
    const { users, authentication: { user: admin }, tasks, tasks: { draggedTask } } = state;
    return {
        admin,
        users,
        tasks,
        draggedTask
    };
}

const mapDispatchToProps = {
    assign: userActions.assign,
    deleteTask: taskActions.delete,
    taskStartedDragging: taskActions.taskStartedDragging,
    createTask: taskActions.createTask,
    getAll: all.getAll
}

const connectedAdminPage = connect(mapStateToProps, mapDispatchToProps)(AdminPage);
export { AdminPage as NotConnAdminPage, connectedAdminPage as AdminPage };

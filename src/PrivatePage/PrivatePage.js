import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { userActions } from "../_actions";

class PrivatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      response: false,
      endpoint: `${process.env.REACT_APP_API_URL}`
    };

    const { endpoint } = this.state,
      {
        getById,
        user: { _id }
      } = this.props,
      socket = socketIOClient(endpoint);
    socket.on("task-assigned", () => {
      getById(_id);
    });
  }

  componentDidMount() {
    const {
      getById,
      user: { _id }
    } = this.props;
    getById(_id);
  }

  changeStatus = (user, task) => (e) => {
    e.preventDefault();  
    const { changeTaskStatus } = this.props;
    changeTaskStatus(user, task);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>Tasks for you:</h3>
        {user.tasks && user.tasks.length ? (
          <ul>
            {user.tasks.map((task, index) => (
              <li key={task._id}>
                {task.summary}{" "}
                <a href="/#" onClick={this.changeStatus(user, task)}>
                  {task.status === 0
                    ? "new"
                    : task.status === 1
                    ? "in process"
                    : "done"}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          "No tasks yet"
        )}
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    authentication: { user }
  } = state;

  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTaskStatus: (user, task) =>
      dispatch(userActions.changeStatus(user, task)),
    getById: _id => dispatch(userActions.getById(_id))
  };
}

const connectedPrivatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivatePage);

export { connectedPrivatePage as PrivatePage };

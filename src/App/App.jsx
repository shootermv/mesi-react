import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { AdminPage } from '../AdminPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { PrivatePage } from '../PrivatePage';

import { AppHeader } from '../AppHeader';


export class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">

                <AppHeader/>

                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/private" component={PrivatePage} />
                                <PrivateRoute exact path="/admin" component={AdminPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}


export default connect(mapStateToProps)(App); 
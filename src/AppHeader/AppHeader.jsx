import React from 'react';

export class AppHeader extends React.Component {

    render() {
        return (<nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Mesi</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#/admin">Admin</a></li>
                        <li><a href="#/private">Private</a></li>
                        <li><a href="#/login">Login</a></li>
                        <li><a href="#/register">Register</a></li>                                                    
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="#/login">Logout</a>
                        </li>                   
                    </ul>
                </div>

            </div>
        </nav>)
    }
}

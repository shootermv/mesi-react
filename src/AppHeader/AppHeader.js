import React from 'react';

export class AppHeader extends React.Component {

    render() {
        function getClassName(url) {
           return (new RegExp(url, 'g')).test(window.location.href) ? 'active' : '';
        }
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
                        {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role==='admin' && <li className={getClassName("admin")}><a href="#/admin">Admin</a></li>}
                        {localStorage.getItem('user')  && <li className={getClassName("private")}><a href="#/private">Private</a></li>}
                        {!localStorage.getItem('user') && <li className={getClassName("login")}><a href="#/login">Login</a></li>}
                        <li className={getClassName("register")}><a href="#/register">Register</a></li>                                                    
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {localStorage.getItem('user') && <a href="#/login">Logout</a>}
                        </li>                   
                    </ul>
                </div>

            </div>
        </nav>)
    }
}

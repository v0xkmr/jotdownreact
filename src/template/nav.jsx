import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                    <a href="#" className="navbar-brand">JotDown</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link mr-3">Home</a>
                        </li>
                        <li className="nav-item">
                            <button type="button" class="btn btn-warning mr-3">Login</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" class="btn btn-warning">Register</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;
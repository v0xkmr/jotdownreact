import React, { Component } from 'react';
import NavBar from './nav';

class NotFound extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <h1>Not Found</h1>
            </div>
        );
    }
}

export default NotFound;
import React, { Component } from 'react';
import NavBar from './nav';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <main className="main">
                    <div className="main_heading">
                        <h1 className="main_heading_primary">jotdown</h1>
                        <h3 className="main_heading_secondary">Note things as you progress</h3>
                        {/* <div className="btn main_heading_btn">Register</div> */}
                        <Link to="/register" className="btn main_heading_btn">Register</Link>
                    </div>
                </main>
            </div>

        );
    }
}

export default Home;
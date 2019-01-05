import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecoder from 'jwt-decode';
import axios from 'axios';

class NavBar extends Component {
    state = {
        name: '',
        userId: ''
    }
    async componentDidMount() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const user = jwtDecoder(jwt);
            console.log(user);
            const { data: customer } = await axios.get(` https://warm-stream-20780.herokuapp.com/api/customer/${user._id}`);
            this.setState({
                name: customer.firstName,
                userId: user._id
            });
        }
    }
    onLogout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    }
    render() {
        return (
            <div>
                <nav className="nav">
                    {/* <div className="nav_icon">jd</div> */}
                    <Link to="/" className="nav_icon">jd</Link>
                    {
                        !this.state.userId ?
                            <React.Fragment>
                                <Link to="/login" className="btn nav_btn">Login</Link>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Link to="/login" className="btn nav_btn" onClick={this.onLogout}>Logout</Link>
                            </React.Fragment>
                    }
                </nav>
            </div>
        );
    }
}

export default NavBar;
import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import NavBar from './nav';

class Login extends Component {
    state = {
        account: {
            email: '',
            password: ''
        },
        errors: {}
    }
    schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, { abortEarly: false });
        if (!result.error) {
            return null
        }
        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message
        }
        return errors;
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        const { data: result } = await axios.post('https://warm-stream-20780.herokuapp.com/api/customer/login', this.state.account);
        console.log(result);
        localStorage.setItem('token', result);
        this.props.history.push('/post');
        console.log(result);
    }
    handleChange = (e) => {
        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account: account });
    }
    render() {
        return (
            <div>
                <NavBar />
                <main className="main">
                    <div className="main_form">
                        <form action="#" className="form">
                            <div className="form_group">
                                <input
                                    className="form_input"
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.account.email}
                                />
                                {this.state.errors.email && <div className="alert aletr-danger">{this.state.errors.email}</div>}
                                <label htmlFor="email" className="form_label">Email Address</label>
                            </div>
                            <div className="form_group">
                                <input
                                    type="password"
                                    class="form_input"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.account.password}
                                />
                                {this.state.errors.password && <div className="alert aletr-danger">{this.state.errors.password}</div>}
                                <label htmlFor="password" className="form_label">Password</label>
                            </div>
                            <div
                                className="btn"
                                onClick={this.handleSubmit}
                                disabled={!this.state.account.email || !this.state.account.password}
                            >log in</div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default Login;
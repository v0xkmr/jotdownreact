import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import NavBar from './nav';

class Register extends Component {
    state = {
        register: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        errors: {}
    }
    schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    validate = () => {
        const result = Joi.validate(this.state.register, this.schema, { abortEarly: false });
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
        const { data: result } = await axios.post(' https://warm-stream-20780.herokuapp.com/api/customer/register', this.state.register);
        localStorage.setItem('token', result);
        this.props.history.push('/post');
        console.log(result);
    }
    handleChange = (e) => {
        const register = { ...this.state.register };
        register[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ register: register });
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
                                    placeholder="First Name"
                                    id="firstName"
                                    type="firstName"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    value={this.state.register.firstName}
                                />
                                {this.state.errors.firstName && <div className="alert aletr-danger">{this.state.errors.firstName}</div>}
                                <label htmlFor="firstName" className="form_label">Email Address</label>
                            </div>
                            <div className="form_group">
                                <input
                                    type="lastName"
                                    class="form_input"
                                    placeholder="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    onChange={this.handleChange}
                                    value={this.state.register.lastName}
                                />
                                {this.state.errors.lastName && <div className="alert aletr-danger">{this.state.errors.lastName}</div>}
                                <label htmlFor="lastName" className="form_label">Last Name</label>
                            </div>
                            <div className="form_group">
                                <input
                                    className="form_input"
                                    placeholder="Email"
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.register.email}
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
                                    value={this.state.register.password}
                                />
                                {this.state.errors.password && <div className="alert aletr-danger">{this.state.errors.password}</div>}
                                <label htmlFor="password" className="form_label">Password</label>
                            </div>
                            <div
                                className="btn"
                                onClick={this.handleSubmit}
                                disabled={!this.state.register.email || !this.state.register.password}
                            >register</div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;
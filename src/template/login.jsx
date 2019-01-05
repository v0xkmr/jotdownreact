import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
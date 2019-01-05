import React, { Component } from 'react';
import Joi from 'joi-browser';
import jwtDecoder from 'jwt-decode';
import axios from 'axios';
import NavBar from './nav';

class CreatePost extends Component {
    state = {
        post: {
            customerId: "5c1e57709e7dc212acf7d0a6",
            title: '',
            postBody: ''
        },
        errors: {}
    }
    componentDidMount() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const user = jwtDecoder(jwt);
            this.setState({
                post: {
                    customerId: user._id,
                    title: '',
                    postBody: ''
                }
            });
            return;
        }
        this.props.history.push('/not-found');
    }
    schema = {
        customerId: Joi.string().required(),
        title: Joi.string().required(),
        postBody: Joi.string().required()
    }
    validate = () => {
        const result = Joi.validate(this.state.post, this.schema, { abortEarly: false });
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
        const { data: result } = await axios.post('https://warm-stream-20780.herokuapp.com/api/post/', this.state.post);
        if (result) {
            this.props.history.push('/post')
        }
    }
    handleChange = (e) => {
        const post = { ...this.state.post };
        post[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ post: post });
    }
    // handlesave = () => {
    //     this.props.history.push('/post')
    // }
    render() {
        return (
            <div>
                <NavBar />
                <main className="main">
                    <div className="main_form">
                        <form action="#" className="form">
                            <div className="form_group">
                                <input
                                    type="text"
                                    className="form_input"
                                    placeholder="Title"
                                    id="title"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.post.title}
                                />
                                {this.state.errors.title && <div className="alert aletr-danger">{this.state.errors.title}</div>}
                            </div>
                            <div className="form_group">
                                <textarea
                                    type="text"
                                    className="form_input"
                                    placeholder="Note"
                                    id="postBody"
                                    name="postBody"
                                    onChange={this.handleChange}
                                    value={this.state.post.postBody}
                                    rows="10"
                                ></textarea>
                                {this.state.errors.postBody && <div className="alert aletr-danger">{this.state.errors.postBody}</div>}
                            </div>
                            <div className="btn" onClick={this.handleSubmit}>add</div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default CreatePost;
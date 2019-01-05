import React, { Component } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import NavBar from './nav';

class EditPost extends Component {
    state = {
        post: {
            customerId: '',
            title: '',
            postBody: ''
        },
        errors: {}
    }
    async componentDidMount() {
        const { data: post } = await axios.get(`https://warm-stream-20780.herokuapp.com/api/post/single/${this.props.match.params.id}`);
        if (post) {
            this.setState({
                post: {
                    customerId: post.customerId,
                    title: post.title,
                    postBody: post.postBody
                }
            });
        }
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
        const { data: result } = await axios.put(`https://warm-stream-20780.herokuapp.com/api/post/${this.props.match.params.id}`, this.state.post);
        if (result) {
            this.props.history.push('/post')
        }
    }
    handleChange = (e) => {
        const post = { ...this.state.post };
        post[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ post: post });
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
                            <div className="btn" onClick={this.handleSubmit}>Submit</div>
                        </form>
                    </div>
                </main>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        onChange={this.handleChange}
                                        value={this.state.post.title}
                                    />
                                    {this.state.errors.title && <div className="alert aletr-danger">{this.state.errors.title}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="postBody">Message</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="postBody"
                                        name="postBody"
                                        onChange={this.handleChange}
                                        value={this.state.post.postBody}
                                        rows="10"
                                    >
                                    </textarea>
                                    {this.state.errors.postBody && <div className="alert aletr-danger">{this.state.errors.postBody}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default EditPost;
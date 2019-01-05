import React, { Component } from 'react';
import axios from 'axios';
import jwtDecoder from 'jwt-decode';
import { Link } from 'react-router-dom';
import NavBar from './nav';

class Post extends Component {
    state = {
        posts: []
    }
    async componentDidMount() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const user = jwtDecoder(jwt);
            console.log(user);
            const { data: posts } = await axios.get(`http://localhost:4000/api/post/all/${user._id}`);
            this.setState({ posts: posts });
            return;
        }
        this.props.history.push('/not-found');
    }
    handleDelete = async (post) => {
        const originalPost = this.state.posts;
        const posts = this.state.posts.filter((p) => { return p._id !== post._id });
        this.setState({ posts: posts });
        try {
            await axios.delete(`http://localhost:4000/api/post/${post._id}`);
        } catch (e) {
            alert('Something went wrong');
            this.setState({ posts: originalPost });
        }
    }
    render() {
        return (
            <div>
                <NavBar />
                <main class="main">
                    <div class="post">
                        {/* <div class="btn post_btn">Add Post</div> */}
                        <Link to="/create" className="btn post_btn">Add Post</Link>

                        {this.state.posts.length == 0 ? <p>No Post</p> : this.state.posts.map((post) => {
                            return (
                                <div>
                                    <div class="post_box">
                                        <div class="post_box_content">
                                            <div class="post_box_content_title">
                                                {post.title} | {post.createdOn}
                                            </div>
                                            <div class="post_box_content_body">
                                                {post.postBody}
                                            </div>
                                        </div>
                                        {/* <div class="post_box-btn btn-small">Edit</div> */}
                                        <Link to={`/post/${post._id}`} class="post_box-btn btn-small">Edit</Link>
                                        {/* <div class="post_box-btn-right btn-small">delete</div> */}
                                        <div class="post_box-btn-right btn-small" onClick={() => { this.handleDelete(post) }}>Delete</div>
                                        {/* <button type="button" className="post_box-btn-right btn-small" onClick={() => { this.handleDelete(post) }}>Delete</button> */}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </main>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-8 offset-md-2">
                            <Link to="/create" className="btn btn-primary my-2">Add Item</Link>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Created On</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.posts.length == 0 ? <p>No Post</p> : this.state.posts.map((post) => {
                                        return (
                                            <tr>
                                                <td>{post.title}</td>
                                                <td>{post.postBody}</td>
                                                <td>{post.createdOn}</td>
                                                <td><Link to={`/post/${post._id}`} class="btn btn-info">Edit</Link></td>
                                                <td><button type="button" className="btn btn-danger" onClick={() => { this.handleDelete(post) }}>Delete</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Post;
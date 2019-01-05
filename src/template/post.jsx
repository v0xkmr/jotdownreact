import React, { Component } from 'react';
import NavBar from './nav';

class Post extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-md-2">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mark</td>
                                        <td>Mark</td>
                                        <td><button type="button" class="btn btn-info">Edit</button></td>
                                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
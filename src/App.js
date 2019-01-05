import React, { Component } from 'react';
import Login from './components/login';
import Register from './components/register';
import Post from './components/post';
import Home from './components/home';
import NotFound from './components/not-found';
import EditPost from './components/editPost';
import CreatePost from './components/createPost';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* Passing Props
          <Route path="/register" render={(props)=><Register sort="new" {...props}/>} /> */}
          <Route path="/post/:id" component={EditPost} />
          <Route path="/create" component={CreatePost} />
          <Route path="/post" component={Post} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from './signin';
import CommentList from './comment-list';
import Register from './register';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/signin.html">
          <SignIn />
        </Route>
        <Route exact path="/">
          <CommentList />
        </Route>
        <Route exact path="/register.html">
          <Register />
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App;

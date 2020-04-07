import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import Login from './login.js'
import Register from './register.js'
import * as serviceWorker from './serviceWorker';


import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} /> 
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

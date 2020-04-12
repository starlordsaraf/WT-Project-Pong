import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import Login from './login.js'
import Register from './register.js'
import Game from './game.js'
import Train from './train.js'
import Comp from './comp.js'
import Scores from './scores.js'
import * as serviceWorker from './serviceWorker';


import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} /> 
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/game" component={Game} />
      <Route path="/train" component={Train} />
      <Route path="/comp" component={Comp} />
      <Route path="/scores" component={Scores} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { Component } from 'react';
import './App.css';
import Zoom from 'react-reveal/Zoom';
import logo from './pong-logo.jpg';


import { Link } from 'react-router-dom'

class App extends Component {
  render(){
  return (
      <Zoom bottom cascade>
        <div>
          <img src={logo} className="logo"/>
          <button className="login_button"><Link to="/login">Login</Link></button>
          <button className="register_button"><Link to="/register">Register</Link></button>
        </div>
      </Zoom>
    
  );
  }
}


export default App;

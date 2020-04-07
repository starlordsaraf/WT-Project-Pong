import React, { Component } from 'react';
import './forms.css';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-router-dom'


class Register extends Component {
  render() {
    return (
    <Zoom top>
        <div className="register_div">
            <form action="http://localhost:5000/login" method="POST">
                <input type="email" id="email" name="email" placeholder="Email" /><br></br>
                <input type="text" id="username" name="username" placeholder="Username" /><br></br>
                <input type="password" id="password" name="password" placeholder="Password"/><br></br>
  
                <input type="submit" value="Register" />
                <button className="log_butt"><Link to="/login" className="log_a">Log In</Link></button>
            </form>
        </div>
    </Zoom>
    );
  }
}

export default Register;
import React, { Component } from 'react';
import './forms.css';
import Zoom from 'react-reveal/Zoom';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    
    return (
    <Zoom top>
        <div className="login_div">
            <form action="http://localhost:5000/login" method="POST"> 
                <input type="text" id="username" name="username" placeholder="Username" required/><br></br>
                <input type="password" id="password" name="password" placeholder="Password" required /><br></br>
  
                <input type="submit" value="Log In" />
                <button className="reg_butt"><Link to="/register" className="reg_a">Register</Link></button>
            </form>
        </div>
    </Zoom>
    );
  }
}

export default Login;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

class Comp extends Component {
  render() {
    
    return (
    <Zoom bottom cascade>
    <div>
        <div className="comp_nav">
            <button className="train_button"><Link to="/train">Train</Link></button>
            <button className="scores_button"><Link to="/scores">Scoreboard</Link></button>
            <button className="logout_button"><Link to="/">Logout</Link></button>
        </div>
        <h1 className="comp_head">Play with the Computer</h1>

    </div>
    </Zoom>

    );
  }
}

export default Comp;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

class Train extends Component {
  render() {
    return (
        <Zoom bottom cascade>
        <div>
            <div className="train_nav">
                <button className="comp_button"><Link to="/comp">Player vs Computer</Link></button>
                <button className="scores_button"><Link to="/scores">Scoreboard</Link></button>
                <button className="logout_button"><Link to="/">Logout</Link></button>
            </div>
            <h1 className="train_head">Train The Neural Network</h1>
        </div>
        </Zoom>

    );
  }
}

export default Train;
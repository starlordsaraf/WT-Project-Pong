import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

class Game extends Component {
  render() {
    
    return (
    <Zoom bottom cascade>
        <div className="options_buttons">
            <button className="train_button"><Link to="/train">Train</Link></button>
            <button className="comp_button"><Link to="/comp">Player vs Computer</Link></button>
            <button className="scores_button"><Link to="/scores">Scoreboard</Link></button>
        </div>
    </Zoom>
    );
  }
}

export default Game;
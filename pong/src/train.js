import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

import AIDiv from './div_ai.js';

class Train extends Component {

  constructor(props) {
    super(props);

    this.aiDivRef = React.createRef();
  }

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
          <AIDiv ref={this.aiDivRef} />

          <SaveInfo airef={this.aiDivRef}/>
        </div>


      </Zoom>

    );
  }
}

class SaveInfo extends React.Component {

  constructor(props) {
    super(props);
    
    this.sendNN = this.sendNN.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  sendNN(event) {
    var self = this;
    console.log(this);
    fetch('/saveNN', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': this.state.value,
        'nn': self.props.airef.current.myP5.getBestNN()
      })
    }).then((resp) => {
      console.log(resp);
      if(resp.ok)
      {
        document.querySelector("#submitted").innerHTML = `Submitted neural network ${this.state.value}`;
      }
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div style={{ display: 'inline-block', float: 'left' }}>
        <form onSubmit={this.sendNN}>
          <input type="text" value={this.nnName} placeholder="Enter name for neural network" onChange={this.handleChange}></input>Name
          <input type="submit" value="Save"></input>
        </form>
        <div>
          <h3 id="submitted" className="text"></h3>
        </div>
      </div>
    );
  }

}

export default Train;
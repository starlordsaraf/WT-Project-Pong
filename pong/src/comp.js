import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';

import SingleDiv from './div_single.js';

class Comp extends Component {

  constructor(props) {
    super(props);

    this.changeNN = this.changeNN.bind(this);

    this.nnName = this.props.match.params.nnName;
    
  }

  componentDidMount() {
    console.log(this);
  }

  changeNN() {
    window.location.href = "http://localhost:3000/comp/gen3"
  }

  render() {
    return (
      <div>
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
        <SingleDiv nnName={this.nnName} />
        <button onClick={this.changeNN}>Change</button>
        <NNList />
      </div>
    );
  }
}

class NNList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nns: []
    }

    var self = this;

    fetch("/listNN").then((resp) => resp.json()).then((resp) => {
      var arr = [];
      var i = 0;
      for (const nn of resp) {
        var url = `http://localhost:3000/comp/${nn}`;
        arr.push(
          <li key={i}>
            <a href={url}>{nn}</a>  
          </li>
        );
        i++;
      }

      console.log(arr);
      self.setState({
        nns: arr
      });
    })
  }

  render() {

    return (
      <div className="text">
        <ul>
          {this.state.nns}
        </ul>
      </div>
    );
  }

}

export default Comp;
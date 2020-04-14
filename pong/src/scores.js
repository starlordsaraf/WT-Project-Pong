import React, { Component } from 'react';
import { JsonToTable } from "react-json-to-table";
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';


class Scores extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }


  componentDidMount() {
    var username = sessionStorage.getItem("username");

    var self = this;
    this.interval = setInterval(() => {
      fetch("http://localhost:5000/scores/" + username, {
        method: 'get'
      }).
        then((Response) => Response.json()).
        then((findresponse) => {
          self.setState({ data: findresponse["stats"] })
          console.log(self.state.data);

        })
    }, 2000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    return (
      <Zoom bottom cascade>
        <div>
          <div className="score_nav">
            <button className="train_button"><Link to="/train">Train</Link></button>
            <button className="comp_button"><Link to="/comp/gen1">Player vs Computer</Link></button>
            <button className="allscores_button"><Link to="/allscores">All Scores</Link></button>
            <button className="yourscores_button"><Link to="/scores">Your Scores</Link></button>
            <button className="logout_button"><Link to="/">Logout</Link></button>
          </div>
          <h1 className="score_head">YOUR SCOREBOARD</h1>
          <JsonToTable json={this.state.data} className="json_table" />
        </div>
      </Zoom>
    );
  }
}

export default Scores;
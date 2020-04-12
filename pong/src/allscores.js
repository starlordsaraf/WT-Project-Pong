import React, { Component } from 'react';
import { JsonToTable } from "react-json-to-table";
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';


class AllScores extends Component {

  constructor(){
      super();
      this.state ={
          data: []
      }
  }
  

  componentDidMount(){
    fetch("http://localhost:5000/allscores",{
        method: 'get'
    }).
    then((Response)=>Response.json()).
    then((findresponse)=>{
        this.setState({data: findresponse})
        console.log(this.state.data);

    })
  }



  render() {
    return (
    <Zoom bottom cascade>
    <div>
        <div className="score_nav">
            <button className="train_button"><Link to="/train">Train</Link></button>
            <button className="comp_button"><Link to="/comp">Player vs Computer</Link></button>
            <button className="allscores_button"><Link to="/allscores">All Scores</Link></button>
            <button className="yourscores_button"><Link to="/scores">Your Scores</Link></button>
            <button className="logout_button"><Link to="/">Logout</Link></button>
        </div>
            <h1 className="score_head">TOTAL SCOREBOARD</h1>
            <JsonToTable json={this.state.data} className="json_table"/> 
    </div>
    </Zoom>
    
    );
  }
}

export default AllScores;
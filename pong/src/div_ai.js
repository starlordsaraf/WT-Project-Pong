import React from 'react';
import p5 from 'p5';


class AIDiv extends React.Component {
    constructor(props) {
        super(props)
        this.aiDivRef = React.createRef();
        this.AISketch = null;
    }

    componentDidMount() {
        this.AISketch = window.pongai_sketch;
        this.myP5 = new p5(this.AISketch, this.aiDivRef.current);
    }

    render() {
        return (
            <div style={{display: 'inline-block', float: 'left'}}>
                <div ref={this.aiDivRef}>

                </div>
                <div id="info" className="text">
                    Generation: <span id="generation"></span><br />
                    Total population {window.TOTAL}<br />
                    Active population: <span id="activepop"></span><br />
                    Train speed: <span id="trainspeed"></span>x<br/>
                </div>
            </div>
        )
    }
}

export default AIDiv;
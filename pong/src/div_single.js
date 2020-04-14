import React from 'react';
import p5 from 'p5';


class SingleDiv extends React.Component {
    constructor(props) {
        super(props)
        this.singleDivRef = React.createRef();
        this.SingleSketch = null;

        this.gameEndCallback = this.gameEndCallback.bind(this);
    }

    gameEndCallback(val) {
        fetch('/setscore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": sessionStorage.getItem("username"),
                "neural network": this.props.nnName,
                "win": val,
                "lost": 1-val
            })
        });
    }

    componentDidMount() {
        window.pcNNURL = `/getNN/${this.props.nnName}`;
        window.pcNN = null;
        window.WinCallback = this.gameEndCallback;
        var self = this;
        fetch(window.pcNNURL).then(resp => resp.text()).then((nntext) => {
            window.pcNN = JSON.parse(nntext);
            self.SingleSketch = window.pongsingle_sketch;
            self.myP5 = new p5(self.SingleSketch, self.singleDivRef.current);
        });
    }

    render() {
        return (
            <div style={{display: 'inline-block', float: 'left'}}>
                <div ref={this.singleDivRef}>

                </div>
            </div>
        )
    }
}

export default SingleDiv;
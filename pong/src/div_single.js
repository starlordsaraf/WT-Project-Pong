import React from 'react';
import p5 from 'p5';


class SingleDiv extends React.Component {
    constructor(props) {
        super(props)
        this.singleDivRef = React.createRef();
        this.SingleSketch = null;
    }



    componentDidMount() {
        this.SingleSketch = window.pongsingle_sketch;
        this.myP5 = new p5(this.SingleSketch, this.singleDivRef.current);
    }

    render() {
        return (
            <div>
                <div ref={this.singleDivRef}>

                </div>
            </div>
        )
    }
}

export default SingleDiv;
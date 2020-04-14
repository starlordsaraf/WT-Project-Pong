class PongElement {
    constructor(alphaVal, brain) {
        this.rightPaddle = new Paddle_AI(false, alphaVal);
        this.puck = new Puck_AI(alphaVal);

        this.hasEnded = false;

        this.score = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(4, 7, 2);
        }
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think() {

        let inputs = [];
        inputs[0] = this.puck.x / p5inst.width;
        inputs[1] = this.puck.y / p5inst.height;
        inputs[2] = this.rightPaddle.y / p5inst.height;
        inputs[3] = this.rightPaddle.ychange / 3;

        let output = this.brain.predict(inputs);

        if (output[0] > output[1]) {
            this.rightPaddle.move(-3);
        } else {
            this.rightPaddle.move(3);
        }

        // if(output[1] > 0.8) {
        //     this.rightPaddle.move(0);
        // }


    }
}
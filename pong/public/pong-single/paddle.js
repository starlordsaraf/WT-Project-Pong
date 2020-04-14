class Paddle_Single {
  constructor(isLeft) {
    this.y = p5inst.height / 2;
    this.w = 20;
    this.h = 100;
    this.ychange = 0;

    if (isLeft) {
      this.x = this.w;
    } else {
      this.x = p5inst.width - this.w;
      this.brain = NeuralNetwork.deserialize(pcNN);
    }
  }

  update() {
    this.y += this.ychange;
    this.y = p5inst.constrain(this.y, this.h / 2, p5inst.height - this.h / 2);
  }

  move(steps) {
    this.ychange = steps;
  }

  show() {
    p5inst.fill(255);
    p5inst.rectMode(p5inst.CENTER);
    p5inst.rect(this.x, this.y, this.w, this.h);
  }

  think(puckinst) {

    let inputs = [];
    inputs[0] = puckinst.x / p5inst.width;
    inputs[1] = puckinst.y / p5inst.height;
    inputs[2] = this.y / p5inst.height;
    inputs[3] = this.ychange / 3;

    let output = this.brain.predict(inputs);

    if (output[0] > output[1]) {
      this.move(-3);
    } else {
      this.move(3);
    }

    // if(output[1] > 0.8) {
    //     this.rightPaddle.move(0);
    // }


  }
}

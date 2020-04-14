class Puck_Single {
  constructor() {
    this.x = p5inst.width / 2;
    this.y = p5inst.eight / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.r = 12;

    this.reset();
  }

  checkPaddleLeft(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2
    ) {
      if (this.x > p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let rad = p5inst.radians(45);
        let angle = p5inst.map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * p5inst.cos(angle);
        this.yspeed = 5 * p5inst.sin(angle);
        this.x = p.x + p.w / 2 + this.r;
      }
    }
  }
  checkPaddleRight(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2
    ) {
      if (this.x < p.x) {
        let diff = this.y - (p.y - p.h / 2);
        let angle = p5inst.map(diff, 0, p.h, p5inst.radians(225), p5inst.radians(135));
        this.xspeed = 5 * p5inst.cos(angle);
        this.yspeed = 5 * p5inst.sin(angle);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  reset() {
    this.x = p5inst.width / 2;
    this.y = p5inst.height / 2;
    let angle = p5inst.random(-p5inst.PI / 4, p5inst.PI / 4);
    this.xspeed = 5 * Math.cos(angle);
    this.yspeed = 5 * Math.sin(angle);

    if (p5inst.random(1) < 0.5) {
      this.xspeed *= -1;
    }
  }

  edges() {
    if (this.y < 0 || this.y > p5inst.height) {
      this.yspeed *= -1;
    }

    if (this.x - this.r > p5inst.width) {
      ding.play();
      leftscore++;
      this.reset();
    }

    if (this.x + this.r < 0) {
      ding.play();
      rightscore++;
      this.reset();
    }
  }

  show() {
    p5inst.fill(255);
    p5inst.ellipse(this.x, this.y, this.r * 2);
  }
}

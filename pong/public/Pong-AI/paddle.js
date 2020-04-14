class Paddle_AI {
    constructor(isLeft, alpha) {
        this.y = p5inst.height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;

        this.alpha = alpha;
        
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = p5inst.width - this.w;
        }
        
        
    }
    
    update() {
        this.y += this.ychange;
        this.y = p5inst.constrain(this.y, this.h/2, p5inst.height-this.h/2);
    }
    
    move(steps) {
        this.ychange = steps;
    }
    
    show() {
        p5inst.fill(255, 255, 255, this.alpha);
        p5inst.rectMode(p5inst.CENTER);
        p5inst.rect(this.x, this.y, this.w, this.h);
    }
}

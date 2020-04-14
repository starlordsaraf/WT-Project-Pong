// port of Daniel Shiffman's Pong coding challenge

TOTAL = 200;

activeEle = [];
genCount = 1;

let eliminatedEle = [];
let speedSlider;

let loadBestBrain = false;

let bestBrainJSON = null;
let bestBrain = null;

let showBest = false;


let sketch = function (_p5) {
    window.p5inst = _p5;
    _p5.preload = function () {
        bestBrainJSON = _p5.loadJSON("Pong-AI/BestPaddleGen27.json");
    }

    _p5.setup = function () {
        _p5.createCanvas(600, 400);
        bestBrain = NeuralNetwork.deserialize(bestBrainJSON);
        speedSlider = _p5.createSlider(1, 10, 1);
        for (let i = 0; i < TOTAL; i++) {
            if (loadBestBrain == true) {
                activeEle[i] = new PongElement(_p5.floor(_p5.random(150, 255)), bestBrain);
            }
            else {
                activeEle[i] = new PongElement(_p5.floor(_p5.random(150, 255)));
            }
        }
    }

    _p5.draw = function () {
        for (let n = 0; n < speedSlider.value(); n++) {
            _p5.background(0);

            for (let i = 0; i < activeEle.length; i++) {
                let didItHit = activeEle[i].puck.checkPaddleRight(activeEle[i].rightPaddle);
                if (didItHit) {
                    activeEle[i].score++;
                }
                activeEle[i].rightPaddle.update();

                activeEle[i].puck.update();
                if (activeEle[i].puck.edges()) {
                    activeEle[i].hasEnded = true;
                }

                activeEle[i].think();

                if (showBest == false) {
                    activeEle[i].rightPaddle.show();
                    activeEle[i].puck.show();
                }

            }

            if (showBest == true && activeEle.length > 0) {
                activeEle[0].rightPaddle.show();
                activeEle[0].puck.show();
            }

            eliminatedEle.push(...activeEle.filter(pongele => pongele.hasEnded));
            activeEle = activeEle.filter(pongele => !pongele.hasEnded);

            if (activeEle.length === 0) {

                //CREATE A NEW GENERATION
                nextGeneration();
                genCount++;
                
            }
        }

        document.querySelector("#activepop").innerHTML = activeEle.length;
        document.querySelector("#generation").innerHTML = genCount;
        document.querySelector("#trainspeed").innerHTML = speedSlider.value();
    }

    _p5.keyPressed = function () {
        if (_p5.keyCode === _p5.LEFT_ARROW) {
            showBest = !showBest;
        }
    }

    _p5.getBestNN = function() {
        return activeEle[0].brain.serialize();
    }

}

// let p5inst = new p5(sketch);

window.pongai_sketch = sketch;
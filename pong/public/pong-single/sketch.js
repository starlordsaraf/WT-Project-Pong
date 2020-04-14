// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;

const MaxScore = 5;
let WinCallback = null;

// WinCallback = function(params) {
//   console.log(params);
// }

let pcNN = null;

pongsingle_sketch = function (_p5) {
  window.p5inst = _p5;

  _p5.preload = function () {
    // load nn
    pcNN = _p5.loadJSON("pcnn.json");
  }

  _p5.setup = function () {
    _p5.createCanvas(600, 400);
    ding = _p5.loadSound('data/ding.mp3');
    puck = new Puck_Single();
    left = new Paddle_Single(true);
    right = new Paddle_Single(false); // store nn for this
  }

  function checkWinner() {

    function showWinText(txt) {
      _p5.fill(255);
      _p5.textSize(32);
      _p5.text(txt, _p5.width / 2 - (1 / 10) * _p5.width, 40);
    }

    if (leftscore == MaxScore) {
      // player wins
      showWinText("Player Wins");
      _p5.noLoop();

      if(WinCallback != null)
        WinCallback(1);
    }
    else if (rightscore == MaxScore) {
      // computer wins
      showWinText("Computer Wins");
      _p5.noLoop();

      if(WinCallback != null)
        WinCallback(0);
    }
  }

  _p5.draw = function () {
    _p5.background(0);

    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();

    right.think(puck);

    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    _p5.fill(255);
    _p5.textSize(32);
    _p5.text(leftscore, 32, 40);
    _p5.text(rightscore, _p5.width - 64, 40);

    // check who won
    // call apt callback depending on who won
    // stop animation
    checkWinner();
  }

  _p5.keyReleased = function () {
    left.move(0);
    right.move(0);
  }

  _p5.keyPressed = function () {
    if (_p5.key == 'ArrowUp') {
      left.move(-10);
    } else if (_p5.key == 'ArrowDown') {
      left.move(10);
    }
  }
}

// new p5(pongsingle_sketch);
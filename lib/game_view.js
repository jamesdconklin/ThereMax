Game = require('./game.js');

function GameView(ctx, el) {
  this.game = new Game();
  this.el = el;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.bindMouseDownHandler();
  this.bindMouseUpHandler();
  this.bindMouseMoveHandler();
  this.bindTouchDownHandler();
  this.bindTouchMoveHandler();
  window.setInterval(
    () => {
      this.game.step();
      this.game.draw(this.ctx);
    }, 40);
};

GameView.prototype.bindKeyHandlers = function() {
  // let ship = this.game.ship;
  // key('w', function() {ship.power([0, -1])});
  // key('s', function() {ship.power([0, 1])});
  // key('a', function() {ship.power([-1, 0])});
  // key('d', function() {ship.power([1, 0])});
};

GameView.prototype.drawGrid = function() {};

GameView.prototype.bindMouseDownHandler = function() {
  this.el.addEventListener("mousedown",
    (e) => {
      this.game.handleMouseDown(e);
    }
  );
};

GameView.prototype.bindMouseUpHandler = function() {
  this.el.addEventListener("mouseup",
    (e) => {
      this.game.handleMouseUp(e);
    }
  );
};

GameView.prototype.bindTouchDownHandler = function() {
  this.el.addEventListener("touchstart",
    (e) => {
      this.game.handleTouchDown(e);
    }

  );
};

GameView.prototype.bindTouchMoveHandler = function () {
  this.el.addEventListener("touchmove",
    (e) =>  {
      // console.log(e);
      this.game.handleTouchMove(e);
    }
  );
};

GameView.prototype.bindMouseMoveHandler = function() {
  this.el.addEventListener("mousemove",
    (e) => {
      this.game.handleMouseMove(e);
    }
  );
};


document.addEventListener("DOMContentLoaded",
  function(event) {
    let canvas = document.getElementById("game-canvas");
    // let $canvas = $("canvas");
    // canvas.addEventListener("touchstart",
    //   e => console.log(e)
    // );

    canvas.width = 800; //window.innerWidth;
    canvas.height = 600; //window.innerHeight;
    let context = canvas.getContext("2d");
    window.el = canvas;
    let gv = new GameView(context, canvas);
    gv.start();
  }
);

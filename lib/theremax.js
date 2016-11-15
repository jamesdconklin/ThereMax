import Grid from './grid.js';

class Theremax {
  constructor(ctx, el) {
    this.grid = new Grid();
    this.el = el;
    this.ctx = ctx;
  }

  bindMouseHandlers() {
    this.bindMouseDownHandler();
    this.bindMouseUpHandler();
    this.bindMouseMoveHandler();
  }

  bindTouchHandlers() {
    this.bindTouchDownHandler();
    this.bindTouchMoveHandler();
    this.bindTouchEndHandler();
  }

  start() {
    this.bindMouseHandlers();
    this.bindTouchHandlers();
    window.setInterval(
      () => {
        this.grid.step();
        this.grid.draw(this.ctx);
      },
      40
    );
    // TODO: Listener for resize
  }

  bindMouseDownHandler() {
    this.el.addEventListener("mousedown",
      (e) => {
        this.grid.handleMouseDown(e);
      }
    );
  }

  bindMouseUpHandler() {
    this.el.addEventListener("mouseup",
      (e) => {
        this.grid.handleMouseUp(e);
      }
    );
  }

  bindTouchDownHandler() {
    this.el.addEventListener("touchstart",
      (e) => {
        this.grid.handleTouchDown(e);
      }
    );
  }

  bindTouchEndHandler() {
    this.el.addEventListener("touchend",
      (e) => {
        this.grid.handleTouchEnd(e);
      }
    );
    this.el.addEventListener("touchcancel",
      (e) => {
        this.grid.handleTouchEnd(e);
      }
    );
  }

  bindTouchMoveHandler() {
    this.el.addEventListener("touchmove",
      (e) =>  {
        this.grid.handleTouchMove(e);
      }
    );
  }

  bindMouseMoveHandler() {
    this.el.addEventListener("mousemove",
      (e) => {
        this.grid.handleMouseMove(e);
      }
    );
  }
}

document.addEventListener("DOMContentLoaded",
  function(event) {
    console.log("FOOOOOO");
    let canvas = document.getElementById("game-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext("2d");
    window.el = canvas;
    let tm = new Theremax(context, canvas);
    tm.start();
  }
);

const Control = require('./control.js');
const NUM_CONTROLS = 3;

var DIM_X = 1201;
var DIM_Y = 641;

function Game() {
  DIM_X = window.innerWidth;
  DIM_Y = window.innerHeight;
  this.asteroids = [];

  this.focusObject = null;
  this.mouseDown = false;
  this.addControls();
  this.scroll = 0;
  this.amplitude = 0;
}

Game.prototype.handleMouseUp = function(e) {
  this.mouseDown = false;
  this.focusObject = null;
};


Game.prototype.handleMouseMove = function(e) {
  let x = e.layerX,
      y = e.layerY;
  let pos = [x,y];

  if (this.focusObject) {
    this.focusObject.pos = pos;
  } else if (this.corner1 && this.mouseDown) {
    this.corner2 = [e.layerX, e.layerY];
  }
};

Game.prototype.handleMouseDown = function(e) {
  let x = e.layerX,
  y = e.layerY;
  if (this.mouseDown) {
    return;
  }

  this.mouseDown = true;

  let pos = [x,y];
  let objects = this.allObjects();
  for (var i = 0; i < objects.length; i++) {
    if (objects[i].isClicked(pos)) {
      this.focusObject = objects[i];
      return;
    }
  }

  this.focusObject = null;

};

Game.prototype.allObjects = function() {
  return this.asteroids; //.concat(this.);
};

Game.prototype.addControls = function() {
  for (var i = 0; i < NUM_CONTROLS; i++) {
    let opts = {
      pos: this.randomPosition(),
      game: this
    };
    this.asteroids.push(new Control(opts));
  }
};

Game.prototype.randomPosition = function() {
  let x = Math.random() * DIM_X;
  let y = Math.random() * DIM_Y;

  return [x, y];
};

Game.prototype.sin = function(x) {
  let norm = this.asteroids.length;
  return DIM_Y/2 + this.asteroids.reduce(
      (acc, el) => acc + el.pos[1]*0.5/norm*Math.sin(this.scroll + x*4*Math.PI * (1 + el.pos[0] * 15 / DIM_X) / DIM_X),
      0
  );

};

Game.prototype.draw = function(ctx) {
  let saveStyle = ctx.strokeStyle;
  let saveWidth = ctx.lineWidth;
  let saveAlpha = ctx.globalAlpha;
  ctx.clearRect(0, 0, DIM_X, DIM_Y);
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(0, this.sin(0));

  for (var i = 0; i <= DIM_X; i += 5) {
    console.log(i, this.sin(i));
    ctx.lineTo(i, this.sin(i));
  }

  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "#11AA11";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#CCFFDD"; //#33FF33";
  ctx.globalAlpha = 1;
  ctx.stroke();

  ctx.globalAlpha = saveAlpha;
  ctx.strokeStyle = saveStyle;
  ctx.lineWidth = saveWidth;
  this.allObjects().forEach(
    (object) => {
      object.draw(ctx);
    }
  );
  this.drawGrid(ctx);

};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(
    (obj) => { obj.move(); }
  );
};

Game.prototype.drawGrid = function(ctx) {

  let saveStyle = ctx.strokeStyle;
  ctx.strokeStyle = "#AAAAAA";
  for (var i = 0; i <= DIM_X; i += 80) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, DIM_Y);
    ctx.stroke();
  }
  let saveWidth = ctx.lineWidth;
  ctx.lineWidth = 5;
  for (i = 0; i <= DIM_Y/2; i += 80) {
    ctx.beginPath();
    ctx.moveTo(0,DIM_Y/2-i);
    ctx.lineTo(DIM_X, DIM_Y/2-i);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,DIM_Y/2+i);
    ctx.lineTo(DIM_X, DIM_Y/2+i);
    ctx.stroke();
    ctx.lineWidth = saveWidth;
  }
};

Game.prototype.remove = function(asteroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
};

Game.prototype.step = function() {
  // this.moveObjects();
  // this.checkCollisions();
  this.scroll = (this.scroll + 4/(2*Math.PI));// % DIM_X;
};

Game.prototype.wrap = function(pos) {
  let x = (pos[0] + DIM_X) % DIM_X;
  let y = (pos[1] + DIM_Y) % DIM_Y;
  return [x, y];
};

module.exports = Game;

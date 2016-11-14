function Control(options) {
  this.pos = options.pos || [0,0];
  this.vel = options.vel || [0,0];
  this.radius = options.radius ||15;
  this.color = options.color || "#FF0000";
  this.game = options.game;
}

Control.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(...this.pos, this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
  let width = ctx.canvas.clientWidth;
  let height = ctx.canvas.clientHeight;
  let wrapX;
  let wrapY;

  if (this.pos[0] <= this.radius) {
    wrapX = this.pos[0] + width;
  }
  if (width - this.pos[0] <= this.radius) {
    wrapX = this.pos[0] - width;
  }
  if (this.pos[1] <= this.radius) {
    wrapY = this.pos[1] + height;
  }
  if (height - this.pos[1] <= this.radius) {
    wrapY = this.pos[1] - height;
  }

  if (wrapX || wrapY) {
    wrapX = wrapX || this.pos[0];
    wrapY = wrapY || this.pos[1];
    ctx.beginPath();
    ctx.arc(wrapX, wrapY, this.radius, 0, 2* Math.PI, false);
    ctx.fill();
  }
};

Control.prototype.move = function() {
  this.pos = this.game.wrap([this.pos[0] + this.vel[0],
              this.pos[1] + this.vel[1]]);
  return this.pos;
};

Control.prototype.isClicked = function(pos) {
  // console.log(this.pos, pos);
  let dxp = this.pos[0] - pos[0];
  let dyp = this.pos[1] - pos[1];
  return dxp*dxp + dyp*dyp < this.radius * this.radius;
};

Control.prototype.movingToward = function(otherObject) {
  let dxv = this.vel[0] - otherObject.vel[0];
  let dyv = this.vel[1] - otherObject.vel[1];
  let dxp = this.pos[0] - otherObject.pos[0];
  let dyp = this.pos[1] - otherObject.pos[1];

  return dxv * dxp + dyv * dyp < 0;
};

Control.prototype.isCollideWith = function(otherObject) {
  let dx = this.pos[0] - otherObject.pos[0];
  let dy = this.pos[1] - otherObject.pos[1];
  let distance = Math.pow(dx * dx + dy * dy, .5);
  if (distance < this.radius + otherObject.radius &&
    this.movingToward(otherObject)) {
    return true;
  }
  return false;
};



module.exports = Control;

import Note from './note';

class Control {
  constructor(options) {
    this.pos = options.pos || [0,0];
    this.radius = options.radius || 30;
    this.color = options.color || "#FF0000";
    this.grid = options.grid;


    this.note = new Note(
      this.pos[0]/this.grid.width,
      this.pos[1]/this.grid.height
    );

  }

  stop() {
    this.note.stop();
  }

  draw(ctx) {
    let { strokeStyle, fillStyle, lineWidth, globalAlpha } = ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(...this.pos, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.fillStyle = fillStyle;
  }

  move(pos) {
    this.pos = this.grid.wrap(pos);
    this.note.shift(
      this.pos[0]/this.grid.width,
      this.pos[1]/this.grid.height
    );
    return this.pos;
  }

  isClicked(pos) {
    let dxp = this.pos[0] - pos[0];
    let dyp = this.pos[1] - pos[1];
    return dxp*dxp + dyp*dyp <= this.radius * this.radius;
  }
}


export default Control;

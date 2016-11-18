import Note from './note';

class Control {
  constructor(options) {
    this.pos = options.grid.wrap(options.pos) || [0,0];
    this.radius = options.radius || 40;
    this.faceColor = options.control && "#cdae64";
    this.ridgeColor = options.control && "#543210"; // "#895537";
    this.grid = options.grid;
    this.dragged = Boolean(options.dragged);
    this.note = new Note(
      this.pos[0]/this.grid.viewWidth,
      Math.max(0,1-this.pos[1]/this.grid.viewHeight)
    );
  }

  active() {
    return this.note.active();
  }

  stop() {
    this.note.stop();
  }

  start() {
    this.note.start();
  }

  distanceTo(pos) {
    return Math.pow(Math.pow(this.pos[0]-pos[0]) + Math.pow(this.pos[1]-pos[1]), .5);
  }

  drawSlice(ctx, opts) {
    let { strokeStyle, fillStyle, lineWidth, globalAlpha } = ctx;
    ctx.fillStyle = opts.fillStyle || "#FFFFFF";
    ctx.globalAlpha = opts.globalAlpha || 1.0;
    ctx.beginPath();
    ctx.moveTo(...this.pos);
    ctx.arc(...this.pos, opts.radius || this.radius, opts.beginning, opts.end);
    ctx.fill();
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = fillStyle;
  }

  drawSpokes(ctx, numSpokes=18, fromRadius=0, toRadius=1) {
    let { globalAlpha, strokeStyle, lineWidth } = ctx;
    ctx.strokeStyle = "#000";
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 2;
    for (var i = 0; i < 36; i++) {
      ctx.beginPath();
      ctx.moveTo(...this.arcPos(Math.PI / numSpokes * i, this.radius * fromRadius));
      ctx.lineTo(...this.arcPos(Math.PI / numSpokes * i), this.radius * toRadius);
      ctx.stroke();
    }
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalAlpha;
  }

  draw(ctx) {
    let { strokeStyle, fillStyle, lineWidth, globalAlpha } = ctx;
    this.drawSlice(ctx, {
      fillStyle: this.ridgeColor,
      globalAlpha: 1.0,
      beginning: 0,
      end: 2 * Math.PI
    });

    this.drawSlice(ctx, {
      fillStyle: "#000",
      globalAlpha: 0.25,
      beginning: 0,
      end: 2 * Math.PI,
      radius: this.radius * 0.9
    });
    this.drawSpokes(ctx);

    this.drawSlice(ctx, {
      fillStyle: this.faceColor,
      globalAlpha: 1.0,
      beginning: 0,
      end: 2 * Math.PI,
      radius: this.radius * 0.9 - 2
    });

    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalAlpha;
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
  }

  arcPos(angle, radius) {
    if (radius === undefined) {
      radius = this.radius;
    } else {
      radius = this.radius * radius;
    }
    return [ this.pos[0] + Math.cos(angle) * radius,
             this.pos[1] + Math.sin(angle) * radius ];
  }

  move(pos) {
    this.pos = this.grid.wrap(pos);
    this.note.shift(
      this.pos[0]/this.grid.viewWidth,
      Math.max(1-this.pos[1]/this.grid.viewHeight, 0)
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

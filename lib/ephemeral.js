import Control from './control.js';

class Ephemeral extends Control {
  constructor(options) {
    super(options);
  }

  draw(ctx) {
    let { strokeStyle, lineWidth, globalAlpha } = ctx;
    for (var i = 0; i < 5; i++) {
      let radius = 0.5 * this.radius * (((this.grid.scroll / 6)+i) % 5);
      ctx.beginPath();
      ctx.strokeStyle = "#34FF56";
      ctx.lineWidth = 7;
      // debugger;
      ctx.globalAlpha = 5/radius;
      ctx.arc(...this.pos, radius, 0, 2*Math.PI);
      ctx.stroke();

    }

    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = globalAlpha;
    ctx.strokeStyle = strokeStyle;
  }
}

export default Ephemeral;

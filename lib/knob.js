import Control from './control';

class Knob extends Control {
  constructor(options) {
    super(options);
    this.img = document.getElementById("control-knob");
  }

  draw(ctx) {
    if (this.img.complete) {
      ctx.drawImage(this.img, this.pos[0]-40, this.pos[1]-40);
    } else {
      super.draw(ctx);
    }
  }
}

export default Knob;

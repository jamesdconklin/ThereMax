import Control from './control.js';
const NUM_CONTROLS = 1;

var DIM_X = 800;
var DIM_Y = 600;

class Grid {
  constructor() {
    DIM_X = window.innerWidth;
    DIM_Y = window.innerHeight;
    this.width = DIM_X;
    this.height = DIM_Y;
    this.controls = [];
    this.touches = [];
    this.focusObject = null;
    this.mouseDown = false;
    this.addControls();
    this.scroll = 0;
    this.click = null;
  }

  getCursorPosition(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      return [x,y];
  }

  handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.click && this.click.stop();
    this.click = null;
    this.mouseDown = false;
    this.focusObject = null;
  }

  getClicked(pos) {
    let objects = this.allControls();
    for (var i = 0; i < objects.length; i++) {
      if (objects[i].isClicked(pos)) {
        return objects[i];
      }
    }
    return null;
  }

  touchMap(e) {
    let posArray = [];
    for (var j = 0; j < e.targetTouches.length; j++) {
      let et = e.targetTouches[j];
      posArray.push(this.getCursorPosition(e.target, et));
      // posArray.push([et.clientX, et.clientY]);
    }
    return posArray;
  }

  handleTouchDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let posArray = this.touchMap(e);

    var el, opts;
    for (var i = 0; i < posArray.length; i++) {
      if ((el = this.getClicked(posArray[i]))) {
        // Pass
      } else {
        opts = {
          pos: posArray[i],
          grid: this
        };
        this.touches.push(new Control(opts));
      }
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    e.stopPropagation();
    let posArray = this.touchMap(e);
    let unmatchedPos = [];
    let matchedEls = [];
    let el;
    for (var i = 0; i < posArray.length; i++) {
      if ((el = this.getClicked(posArray[i]))) {
        matchedEls.push(el);
        el.move(posArray[i]);
      } else {
        unmatchedPos.push(posArray[i]);
      }
    }
    // Clean up dropped notes.

    let unmatchedEls = this.allControls().filter((u) => matchedEls.indexOf(u) < 0);
    while (unmatchedEls.length > unmatchedPos.length) {
      el = unmatchedEls.shift();
      (this.controls.indexOf(el) < 0) && el.stop();
    }
    while (unmatchedPos.length > unmatchedEls.length) {
      this.touches.push(new Control({grid: this, pos: unmatchedPos.shift()}));
    }
    for (i = 0; i < unmatchedEls.length; i++) {
      console.log("Unmatched: ", unmatchedPos, unmatchedEls);
      unmatchedEls[i].move(unmatchedPos[i]);
    }
  }

  handleTouchEnd(e) {
    let posArray = this.touchMap(e);
    let newTouches = [];
    for (var i = 0; i < this.touches.length; i++) {
      let el = this.touches[i];
      if (posArray.reduce((a, pos) => a || el.isClicked(pos), 0)) {
        newTouches.push(el);
      } else {
        el.stop();
      }
    }
    if (this.focusObject && posArray.reduce(
      (a,b)=> a || this.focusObject.isClicked(b),
      0
    )) {
      // pass
    } else {
      this.focusObject = null;
    }
    this.touches = newTouches;
  }

  handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    let pos = this.getCursorPosition(e.target, e);

    if (this.focusObject) {
      this.focusObject.move(pos);
    }
  }

  handleMouseDown(e) {
    let pos = this.getCursorPosition(e.target, e);
    if (this.mouseDown) {
      return;
    }

    this.mouseDown = true;

    let objects = this.controls;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i].isClicked(pos)) {
        this.focusObject = objects[i];
        return;
      }
    }
    this.focusObject = new Control({pos, grid: this});
    this.click = this.focusObject;
  }

  allControls() {
    return this.controls.concat(this.touches).concat(this.click).concat(this.focusObject).filter((p=>p));
  }

  addControls() {
    for (var i = 1; i < NUM_CONTROLS+1; i++) {
      let opts = {
        // pos: [ 30, i * (1/(NUM_CONTROLS+1)) * (DIM_Y-30) + 15 ],
        pos: [ 30, i * (1/(NUM_CONTROLS+1)) * (DIM_Y-30) + 15 ],
        grid: this,
        radius: 30
      };
      console.log(opts);
      this.controls.push(new Control(opts));
    }
  }

  sin(x) {
    let norm = this.allControls().length;
    return DIM_Y/2 + this.allControls().reduce(
      (acc, el) => acc + el.pos[1]*0.5/norm*Math.sin(this.scroll + x*4*Math.PI * (1 + el.pos[0] * 15 / DIM_X) / DIM_X),
      0
    );
  }

  draw(ctx) {
    // TODO: THIS MUST BE BROKEN UP.
    let saveStyle = ctx.strokeStyle;
    let saveWidth = ctx.lineWidth;
    let saveAlpha = ctx.globalAlpha;
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(0, this.sin(0));

    for (var i = 0; i <= DIM_X; i += 5) {
      // console.log(i, this.sin(i));
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
    this.allControls().forEach(
      (object) => {
        object && object.draw(ctx);
      }
    );
    this.drawGrid(ctx);

  }

  drawGrid(ctx) {
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
  }

  step() {
    this.scroll = (this.scroll + 2/(Math.PI));
  }

  wrap(pos) {
    return [ Math.max(0, Math.min(DIM_X, pos[0])),
    Math.max(0, Math.min(DIM_Y, pos[1])) ];
  }
}

export default Grid;

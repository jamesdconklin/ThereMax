import Control from './control.js';
const NUM_CONTROLS = 3;

var DIM_X = 800;
var DIM_Y = 600;

class Grid {
  constructor() {
    DIM_X = window.innerWidth - 4;
    DIM_Y = window.innerHeight - 4;
    this.viewWidth = DIM_X;
    this.viewHeight = DIM_Y-150;
    this.trayHeight = 150;
    this.controls = [];
    this.touches = [];
    this.mouseDown = false;
    this.addControls();
    this.scroll = 0;
    this.click = null;
    this.paused = 0;
  }

  togglePlay() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  pause() {
    this.touches.forEach(touch=>touch.stop());
    this.touches = [];
    this.mouseDown = false;
    this.click && this.click.stop();
    this.click = null;
    this.controls.forEach(control=>control.stop());
    this.paused = 1;
  }

  play() {
    this.controls.forEach(control => control.start());
    this.paused = 0;
  }

  getCursorPosition(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      return [x,y];
  }

  handleMouseUp(e) {
    if (this.paused) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.click && (this.controls.indexOf(this.click) < 0) && this.click.stop();
    this.click = null;
    this.mouseDown = false;
  }

  getClicked(pos, freeNode=true) {
    let objects = this.allControls();
    for (var i = 0; i < objects.length; i++) {
      if ((objects[i].dragged || freeNode) && objects[i].isClicked(pos)) {
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
    if (this.paused) {
      return;
    }
    let posArray = this.touchMap(e);

    var el, opts;
    for (var i = 0; i < posArray.length; i++) {
      if ((el = this.getClicked(posArray[i]))) {
        el.dragged = true;
        el.move(posArray[i]);
      } else {
        opts = {
          pos: posArray[i],
          grid: this,
          dragged: true
        };
        this.touches.push(new Control(opts));
      }
    }
  }

  getClosestElement(elList, pos) {
    let cand, dist, el, candDist;
    for (var i = 0; i < elList.length; i++) {
      cand = elList[i];
      if (!el || (candDist = el.distanceTo(pos)) < dist) {
        dist = candDist;
        el = cand;
      }
    }
    return el;
  }

  handleTouchMove(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.paused) {
      return;
    }
    let posArray = this.touchMap(e);
    let unmatchedPos = [];
    let matchedEls = [];
    let el;
    for (var i = 0; i < posArray.length; i++) {
      // debugger;
      if ((el = this.getClicked(posArray[i], false))) {
        matchedEls.push(el);
        el.move(posArray[i]);
      } else {
        unmatchedPos.push(posArray[i]);
      }
    }
    // Clean up dropped notes.

    let unmatchedEls = this.allControls().filter((u) => u.dragged && matchedEls.indexOf(u) < 0);
    while (unmatchedEls.length > unmatchedPos.length) {
      el = unmatchedEls.shift();
      el.dragged = false;
      (this.controls.indexOf(el) < 0) && el.stop();

    }
    while (unmatchedPos.length > unmatchedEls.length) {
      this.touches.push(new Control({dragged: true, grid: this, pos: unmatchedPos.shift()}));
    }
    for (i = 0; i < unmatchedEls.length; i++) {
      unmatchedEls[i].move(unmatchedPos[i]);
    }
  }

  handleTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.paused) {
      return;
    }
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
    this.touches = newTouches;
  }

  handleMouseMove(e) {
    if (this.paused) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    let pos = this.getCursorPosition(e.target, e);

    if (this.click) {
      this.click.move(pos);
    }
  }

  handleMouseDown(e) {
    if (this.paused) {
      return;
    }
    let pos = this.getCursorPosition(e.target, e);
    if (this.mouseDown) {
      return;
    }

    this.mouseDown = true;

    let objects = this.controls;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i].isClicked(pos)) {
        this.click = objects[i];
        return;
      }
    }
    this.click = new Control({pos, grid: this});
  }

  allControls() {
    return this.touches.concat(this.click).concat(this.controls).filter((p=>p));
  }

  addControls() {
    for (var i = 1; i < NUM_CONTROLS+1; i++) {
      let opts = {
        pos: [i * (1/(NUM_CONTROLS+1)) * (this.viewWidth-30) + 15,  this.viewHeight + 75 ],
        grid: this,
        control: true
      };
      this.controls.push(new Control(opts));
    }
  }

  sin(x) {
    let norm = this.allControls().length;
    return this.allControls().reduce(
      (acc, el) => {
        // if (this.paused) {
        //   return acc;
        // }
        let xMult = 4 * Math.PI * (1 + el.pos[0] * 15) / Math.pow(this.viewWidth, 2);
        let yMult = Math.max(0, 0.5 * (this.viewHeight - el.pos[1])/norm);
        return acc + yMult * Math.sin(this.scroll + xMult * x);
      },
      this.viewHeight/2
    );
  }

  drawWave(ctx) {
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(0, this.sin(0));

    for (var i = 0; i <= this.viewWidth; i += 5) {
      ctx.lineTo(i, this.sin(i));
    }

    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#11AA11";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#CCFFDD"; //#33FF33";
    ctx.globalAlpha = 1;
    ctx.stroke();
  }

  draw(ctx) {
    // TODO: THIS MUST BE BROKEN UP.
    let saveStyle = ctx.strokeStyle;
    let saveWidth = ctx.lineWidth;
    let saveAlpha = ctx.globalAlpha;
    ctx.clearRect(0, 0, this.viewWidth, DIM_Y);
    this.drawWave(ctx);

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
      ctx.lineTo(i, this.viewHeight);
      ctx.stroke();
    }
    let saveWidth = ctx.lineWidth;
    ctx.lineWidth = 5;
    for (i = 0; i <= this.viewHeight/2; i += 80) {
      ctx.beginPath();
      ctx.moveTo(0,this.viewHeight/2-i);
      ctx.lineTo(this.viewWidth, this.viewHeight/2-i);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,this.viewHeight/2+i);
      ctx.lineTo(this.viewWidth, this.viewHeight/2+i);
      ctx.stroke();
      ctx.lineWidth = saveWidth;
    }
  }

  step() {
    if (!(this.paused)) {
      this.scroll = (this.scroll + 2/(Math.PI));
    }
  }

  wrap(pos) {
    let ret = [ Math.max(0, Math.min(this.viewWidth, pos[0])),
    Math.max(0, Math.min(DIM_Y, pos[1])) ];
    return ret;
  }
}

export default Grid;

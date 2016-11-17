/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _grid = __webpack_require__(1);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Theremax = function () {
	  function Theremax(ctx, el) {
	    _classCallCheck(this, Theremax);
	
	    this.grid = new _grid2.default();
	    this.el = el;
	    this.ctx = ctx;
	  }
	
	  _createClass(Theremax, [{
	    key: "bindMouseHandlers",
	    value: function bindMouseHandlers() {
	      this.bindMouseDownHandler();
	      this.bindMouseUpHandler();
	      this.bindMouseMoveHandler();
	    }
	  }, {
	    key: "bindTouchHandlers",
	    value: function bindTouchHandlers() {
	      this.bindTouchDownHandler();
	      this.bindTouchMoveHandler();
	      this.bindTouchEndHandler();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this = this;
	
	      this.bindMouseHandlers();
	      this.bindTouchHandlers();
	      this.bindPauseHandler();
	      window.setInterval(function () {
	        _this.grid.step();
	        _this.grid.draw(_this.ctx);
	      }, 40);
	    }
	  }, {
	    key: "bindMouseDownHandler",
	    value: function bindMouseDownHandler() {
	      var _this2 = this;
	
	      this.el.addEventListener("mousedown", function (e) {
	        _this2.grid.handleMouseDown(e);
	      });
	    }
	  }, {
	    key: "bindMouseUpHandler",
	    value: function bindMouseUpHandler() {
	      var _this3 = this;
	
	      this.el.addEventListener("mouseup", function (e) {
	        _this3.grid.handleMouseUp(e);
	      });
	      // this.el.addEventListener("mouseout",
	      //   (e) => {
	      //     this.grid.handleMouseUp(e);
	      //   }
	      // );
	    }
	  }, {
	    key: "bindTouchDownHandler",
	    value: function bindTouchDownHandler() {
	      var _this4 = this;
	
	      this.el.addEventListener("touchstart", function (e) {
	        _this4.grid.handleTouchDown(e);
	      });
	    }
	  }, {
	    key: "bindPauseHandler",
	    value: function bindPauseHandler() {
	      var _this5 = this;
	
	      window.addEventListener("keyup", function (e) {
	        if (e.code !== "Space") {
	          return;
	        }
	        e.preventDefault();
	        $(".menu-overlay").toggleClass("hidden");
	        _this5.grid.togglePlay.bind(_this5.grid)();
	      });
	    }
	  }, {
	    key: "bindTouchEndHandler",
	    value: function bindTouchEndHandler() {
	      var _this6 = this;
	
	      this.el.addEventListener("touchend", function (e) {
	        _this6.grid.handleTouchEnd(e);
	      });
	      this.el.addEventListener("touchcancel", function (e) {
	        _this6.grid.handleTouchEnd(e);
	      });
	    }
	  }, {
	    key: "bindTouchMoveHandler",
	    value: function bindTouchMoveHandler() {
	      var _this7 = this;
	
	      this.el.addEventListener("touchmove", function (e) {
	        _this7.grid.handleTouchMove(e);
	      });
	    }
	  }, {
	    key: "bindMouseMoveHandler",
	    value: function bindMouseMoveHandler() {
	      var _this8 = this;
	
	      this.el.addEventListener("mousemove", function (e) {
	        _this8.grid.handleMouseMove(e);
	      });
	    }
	  }]);
	
	  return Theremax;
	}();
	
	document.addEventListener("DOMContentLoaded", function (event) {
	  var canvas = document.getElementById("game-canvas");
	  canvas.width = window.innerWidth - 4;
	  canvas.height = window.innerHeight - 4;
	  var context = canvas.getContext("2d");
	  window.el = canvas;
	  var tm = new Theremax(context, canvas);
	  tm.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(2);
	
	var _control2 = _interopRequireDefault(_control);
	
	var _ephemeral = __webpack_require__(4);
	
	var _ephemeral2 = _interopRequireDefault(_ephemeral);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NUM_CONTROLS = 3;
	
	var DIM_X = 800;
	var DIM_Y = 600;
	
	var Grid = function () {
	  function Grid() {
	    _classCallCheck(this, Grid);
	
	    DIM_X = window.innerWidth - 4;
	    DIM_Y = window.innerHeight - 4;
	    this.trayHeight = 150;
	    this.viewWidth = DIM_X;
	    this.viewHeight = DIM_Y - this.trayHeight;
	    this.controls = [];
	    this.touches = [];
	    this.addControls();
	    this.scroll = 0;
	
	    this.pause();
	  }
	
	  _createClass(Grid, [{
	    key: 'togglePlay',
	    value: function togglePlay() {
	      if (this.paused) {
	        this.play();
	      } else {
	        this.pause();
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.touches.forEach(function (touch) {
	        return touch.stop();
	      });
	      this.touches = [];
	      this.mouseDown = false;
	      this.click && this.click.stop();
	      this.click = null;
	      this.controls.forEach(function (control) {
	        return control.stop();
	      });
	      this.paused = 1;
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.controls.forEach(function (control) {
	        return control.start();
	      });
	      this.paused = 0;
	    }
	  }, {
	    key: 'getCursorPosition',
	    value: function getCursorPosition(canvas, event) {
	      var rect = canvas.getBoundingClientRect();
	      var x = event.clientX - rect.left;
	      var y = event.clientY - rect.top;
	      return [x, y];
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(e) {
	      if (this.paused) {
	        return;
	      }
	      e.preventDefault();
	      e.stopPropagation();
	      this.click && this.controls.indexOf(this.click) < 0 && this.click.stop();
	      this.click = null;
	      this.mouseDown = false;
	    }
	  }, {
	    key: 'getClicked',
	    value: function getClicked(pos) {
	      var freeNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	      var objects = this.allControls();
	      for (var i = 0; i < objects.length; i++) {
	        if ((objects[i].dragged || freeNode) && objects[i].isClicked(pos)) {
	          return objects[i];
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'touchMap',
	    value: function touchMap(e) {
	      var posArray = [];
	      for (var j = 0; j < e.targetTouches.length; j++) {
	        var et = e.targetTouches[j];
	        posArray.push(this.getCursorPosition(e.target, et));
	        // posArray.push([et.clientX, et.clientY]);
	      }
	      return posArray;
	    }
	  }, {
	    key: 'sendSpace',
	    value: function sendSpace() {
	      console.log("SENDSPACE");
	      var event = new Event("keyup");
	      event.code = "Space";
	      window.dispatchEvent(event);
	    }
	  }, {
	    key: 'checkBounds',
	    value: function checkBounds(pos) {
	      var _pos = _slicedToArray(pos, 2),
	          x = _pos[0],
	          y = _pos[1];
	
	      return x <= this.viewWidth && x >= 0 && y <= this.viewHeight && y >= 0;
	    }
	  }, {
	    key: 'handleTouchDown',
	    value: function handleTouchDown(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var posArray = this.touchMap(e);
	      if (this.paused) {
	        if (posArray.length === 1 && posArray[0][1] > this.viewHeight) {
	          this.sendSpace();
	        }
	        return;
	      }
	
	      var el, opts, selected;
	      for (var i = 0; i < posArray.length; i++) {
	        if (el = this.getClicked(posArray[i])) {
	          selected = true;
	          el.dragged = true;
	          el.move(posArray[i]);
	        } else if (this.checkBounds(posArray[i])) {
	          selected = true;
	          opts = {
	            pos: posArray[i],
	            grid: this,
	            dragged: true
	          };
	          this.touches.push(new _ephemeral2.default(opts));
	        }
	      }
	      if (!selected) {
	        this.sendSpace();
	      }
	    }
	  }, {
	    key: 'getClosestElement',
	    value: function getClosestElement(elList, pos) {
	      var cand = void 0,
	          dist = void 0,
	          el = void 0,
	          candDist = void 0;
	      for (var i = 0; i < elList.length; i++) {
	        cand = elList[i];
	        if (!el || (candDist = el.distanceTo(pos)) < dist) {
	          dist = candDist;
	          el = cand;
	        }
	      }
	      return el;
	    }
	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (this.paused) {
	        return;
	      }
	      var posArray = this.touchMap(e);
	      var unmatchedPos = [];
	      var matchedEls = [];
	      var el = void 0;
	      for (var i = 0; i < posArray.length; i++) {
	        if (el = this.getClicked(posArray[i], false)) {
	          matchedEls.push(el);
	          el.move(posArray[i]);
	        } else {
	          unmatchedPos.push(posArray[i]);
	        }
	      }
	
	      var unmatchedEls = this.allControls().filter(function (u) {
	        return u.dragged && matchedEls.indexOf(u) < 0;
	      });
	      while (unmatchedEls.length > unmatchedPos.length) {
	        el = unmatchedEls.shift();
	        el.dragged = false;
	        this.controls.indexOf(el) < 0 && el.stop();
	      }
	      while (unmatchedPos.length > unmatchedEls.length) {
	        this.touches.push(new _ephemeral2.default({ dragged: true, grid: this, pos: unmatchedPos.shift() }));
	      }
	      for (i = 0; i < unmatchedEls.length; i++) {
	        unmatchedEls[i].move(unmatchedPos[i]);
	      }
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      var _this = this;
	
	      e.preventDefault();
	      e.stopPropagation();
	      if (this.paused) {
	        return;
	      }
	      var posArray = this.touchMap(e);
	      var newTouches = [];
	
	      var _loop = function _loop() {
	        var el = _this.touches[i];
	        if (posArray.reduce(function (a, pos) {
	          return a || el.isClicked(pos);
	        }, 0)) {
	          newTouches.push(el);
	        } else {
	          el.stop();
	        }
	      };
	
	      for (var i = 0; i < this.touches.length; i++) {
	        _loop();
	      }
	
	      var _loop2 = function _loop2() {
	        var el = _this.controls[i];
	        if (posArray.reduce(function (a, pos) {
	          return a || el.isClicked(pos);
	        }, 0)) {
	          // pass
	        } else {
	          el.dragged = false;
	        }
	      };
	
	      for (i = 0; i < this.controls.length; i++) {
	        _loop2();
	      }
	      this.touches = newTouches;
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      if (this.paused) {
	        return;
	      }
	      e.preventDefault();
	      e.stopPropagation();
	      var pos = this.getCursorPosition(e.target, e);
	
	      if (this.click) {
	        this.click.move(pos);
	      }
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(e) {
	      if (this.paused) {
	        return;
	      }
	      var pos = this.getCursorPosition(e.target, e);
	      if (this.mouseDown) {
	        return;
	      }
	
	      this.mouseDown = true;
	
	      var objects = this.controls;
	      for (var i = 0; i < objects.length; i++) {
	        if (objects[i].isClicked(pos)) {
	          this.click = objects[i];
	          return;
	        }
	      }
	      if (this.checkBounds(pos)) {
	        this.click = new _ephemeral2.default({ pos: pos, grid: this });
	      }
	    }
	  }, {
	    key: 'allControls',
	    value: function allControls() {
	      return this.touches.concat(this.click).concat(this.controls).filter(function (p) {
	        return p;
	      });
	    }
	  }, {
	    key: 'addControls',
	    value: function addControls() {
	      for (var i = 1; i < NUM_CONTROLS + 1; i++) {
	        var opts = {
	          pos: [i * (1 / (NUM_CONTROLS + 1)) * (this.viewWidth - 30) + 15, this.viewHeight + 75],
	          grid: this,
	          control: true
	        };
	        this.controls.push(new _control2.default(opts));
	      }
	    }
	  }, {
	    key: 'sin',
	    value: function sin(x) {
	      var _this2 = this;
	
	      var norm = this.allControls().length;
	      return this.allControls().reduce(function (acc, el) {
	        // if (this.paused) {
	        //   return acc;
	        // }
	        var xMult = 4 * Math.PI * (1 + el.pos[0] * 15) / Math.pow(_this2.viewWidth, 2);
	        var yMult = Math.max(0, 0.5 * (_this2.viewHeight - el.pos[1]) / norm);
	        return acc + yMult * Math.sin(_this2.scroll + xMult * x);
	      }, this.viewHeight / 2);
	    }
	  }, {
	    key: 'drawWave',
	    value: function drawWave(ctx) {
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
	  }, {
	    key: 'drawGroup',
	    value: function drawGroup(ctx, group) {
	      for (var i = 0; i < group.length; i++) {
	        group[i].draw(ctx);
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      // TODO: THIS MUST BE BROKEN UP.
	      var saveStyle = ctx.strokeStyle;
	      var saveWidth = ctx.lineWidth;
	      var saveAlpha = ctx.globalAlpha;
	      ctx.clearRect(0, 0, this.viewWidth, DIM_Y);
	      this.drawWave(ctx);
	
	      ctx.globalAlpha = saveAlpha;
	      ctx.strokeStyle = saveStyle;
	      ctx.lineWidth = saveWidth;
	      this.drawGrid(ctx);
	      this.drawGroup(ctx, this.touches);
	      this.click && this.click.draw(ctx);
	      this.drawPanel(ctx);
	      this.drawGroup(ctx, this.controls);
	    }
	  }, {
	    key: 'drawPanel',
	    value: function drawPanel(ctx) {
	      var fillStyle = ctx.fillStyle,
	          globalAlpha = ctx.globalAlpha;
	
	      ctx.fillStyle = "#986445";
	      ctx.beginPath();
	      ctx.rect(0, this.viewHeight, this.viewWidth, this.trayHeight);
	      ctx.fill();
	      ctx.beginPath();
	      ctx.fillStyle = "#333";
	      ctx.globalAlpha = 0.35;
	      ctx.rect(0, this.viewHeight, this.viewWidth, 5);
	      ctx.fill();
	      ctx.fillStyle = fillStyle;
	      ctx.globalAlpha = globalAlpha;
	    }
	  }, {
	    key: 'drawGrid',
	    value: function drawGrid(ctx) {
	      var saveStyle = ctx.strokeStyle;
	      ctx.strokeStyle = "#AAAAAA";
	      for (var i = 0; i <= DIM_X; i += 80) {
	        ctx.beginPath();
	        ctx.moveTo(i, 0);
	        ctx.lineTo(i, this.viewHeight);
	        ctx.stroke();
	      }
	      var saveWidth = ctx.lineWidth;
	      ctx.lineWidth = 5;
	      for (i = 0; i <= this.viewHeight / 2; i += 80) {
	        ctx.beginPath();
	        ctx.moveTo(0, this.viewHeight / 2 - i);
	        ctx.lineTo(this.viewWidth, this.viewHeight / 2 - i);
	        ctx.stroke();
	        ctx.beginPath();
	        ctx.moveTo(0, this.viewHeight / 2 + i);
	        ctx.lineTo(this.viewWidth, this.viewHeight / 2 + i);
	        ctx.stroke();
	        ctx.lineWidth = saveWidth;
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      if (!this.paused) {
	        this.scroll = this.scroll + 2 / Math.PI;
	      }
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      var ret = [Math.max(0, Math.min(this.viewWidth, pos[0])), Math.max(0, Math.min(DIM_Y, pos[1]))];
	      return ret;
	    }
	  }]);
	
	  return Grid;
	}();
	
	exports.default = Grid;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _note = __webpack_require__(3);
	
	var _note2 = _interopRequireDefault(_note);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Control = function () {
	  function Control(options) {
	    _classCallCheck(this, Control);
	
	    this.pos = options.grid.wrap(options.pos) || [0, 0];
	    this.radius = options.radius || 40;
	    this.faceColor = options.control && "#cdae64";
	    this.ridgeColor = options.control && "#543210"; // "#895537";
	    this.grid = options.grid;
	    this.dragged = Boolean(options.dragged);
	
	    // debugger;
	    this.note = new _note2.default(this.pos[0] / this.grid.viewWidth, Math.max(0, 1 - this.pos[1] / this.grid.viewHeight));
	  }
	
	  _createClass(Control, [{
	    key: "stop",
	    value: function stop() {
	      this.note.stop();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.note.start();
	    }
	  }, {
	    key: "distanceTo",
	    value: function distanceTo(pos) {
	      return Math.pow(Math.pow(this.pos[0] - pos[0]) + Math.pow(this.pos[1] - pos[1]), .5);
	    }
	  }, {
	    key: "drawSlice",
	    value: function drawSlice(ctx, opts) {
	      var strokeStyle = ctx.strokeStyle,
	          fillStyle = ctx.fillStyle,
	          lineWidth = ctx.lineWidth,
	          globalAlpha = ctx.globalAlpha;
	
	      ctx.fillStyle = opts.fillStyle || "#FFFFFF";
	      ctx.globalAlpha = opts.globalAlpha || 1.0;
	      ctx.beginPath();
	      ctx.moveTo.apply(ctx, _toConsumableArray(this.pos));
	      ctx.arc.apply(ctx, _toConsumableArray(this.pos).concat([opts.radius || this.radius, opts.beginning, opts.end]));
	      ctx.fill();
	      ctx.globalAlpha = globalAlpha;
	      ctx.fillStyle = fillStyle;
	    }
	  }, {
	    key: "drawSpokes",
	    value: function drawSpokes(ctx) {
	      var numSpokes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 18;
	      var fromRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var toRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
	      var globalAlpha = ctx.globalAlpha,
	          strokeStyle = ctx.strokeStyle,
	          lineWidth = ctx.lineWidth;
	
	      ctx.strokeStyle = "#000";
	      ctx.globalAlpha = 0.55;
	      ctx.lineWidth = 2;
	      for (var i = 0; i < 36; i++) {
	        ctx.beginPath();
	        ctx.moveTo.apply(ctx, _toConsumableArray(this.arcPos(Math.PI / numSpokes * i, this.radius * fromRadius)));
	        ctx.lineTo.apply(ctx, _toConsumableArray(this.arcPos(Math.PI / numSpokes * i)).concat([this.radius * toRadius]));
	        ctx.stroke();
	      }
	      ctx.strokeStyle = strokeStyle;
	      ctx.lineWidth = lineWidth;
	      ctx.globalAlpha = globalAlpha;
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      var strokeStyle = ctx.strokeStyle,
	          fillStyle = ctx.fillStyle,
	          lineWidth = ctx.lineWidth,
	          globalAlpha = ctx.globalAlpha;
	
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
	  }, {
	    key: "arcPos",
	    value: function arcPos(angle, radius) {
	      if (radius === undefined) {
	        radius = this.radius;
	      } else {
	        radius = this.radius * radius;
	      }
	      return [this.pos[0] + Math.cos(angle) * radius, this.pos[1] + Math.sin(angle) * radius];
	    }
	  }, {
	    key: "move",
	    value: function move(pos) {
	      this.pos = this.grid.wrap(pos);
	      this.note.shift(this.pos[0] / this.grid.viewWidth, Math.max(1 - this.pos[1] / this.grid.viewHeight, 0));
	      return this.pos;
	    }
	  }, {
	    key: "isClicked",
	    value: function isClicked(pos) {
	      var dxp = this.pos[0] - pos[0];
	      var dyp = this.pos[1] - pos[1];
	      return dxp * dxp + dyp * dyp <= this.radius * this.radius;
	    }
	  }]);
	
	  return Control;
	}();
	
	exports.default = Control;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	var createOscillator = function createOscillator(freq) {
	  var osc = ctx.createOscillator();
	  osc.type = "sine";
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	var createGainNode = function createGainNode() {
	  var gainNode = ctx.createGain();
	  gainNode.gain.value = 0;
	  gainNode.connect(ctx.destination);
	  return gainNode;
	};
	
	var Note = function () {
	  function Note(pFreq, pAmp) {
	    _classCallCheck(this, Note);
	
	    var freq = 100 * Math.pow(16, pFreq);
	    this.volume = pAmp * .2;
	    this.oscillatorNode = createOscillator(freq);
	    this.gainNode = createGainNode();
	    this.oscillatorNode.connect(this.gainNode);
	
	    this.start();
	  }
	
	  _createClass(Note, [{
	    key: "shift",
	    value: function shift(pFreq, pVol) {
	      this.volume = pVol * .2;
	      this.oscillatorNode.frequency.value = 100 * Math.pow(16, pFreq);
	      this.start();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      this.gainNode.gain.value = this.volume;
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.gainNode.gain.value = 0;
	    }
	  }]);
	
	  return Note;
	}();
	
	exports.default = Note;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(2);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ephemeral = function (_Control) {
	  _inherits(Ephemeral, _Control);
	
	  function Ephemeral(options) {
	    _classCallCheck(this, Ephemeral);
	
	    return _possibleConstructorReturn(this, (Ephemeral.__proto__ || Object.getPrototypeOf(Ephemeral)).call(this, options));
	  }
	
	  _createClass(Ephemeral, [{
	    key: "draw",
	    value: function draw(ctx) {
	      var strokeStyle = ctx.strokeStyle,
	          lineWidth = ctx.lineWidth,
	          globalAlpha = ctx.globalAlpha;
	
	      for (var i = 0; i < 5; i++) {
	        var radius = 0.5 * this.radius * ((this.grid.scroll / 6 + i) % 5);
	        ctx.beginPath();
	        ctx.strokeStyle = "#34FF56";
	        ctx.lineWidth = 7;
	        // debugger;
	        ctx.globalAlpha = 5 / radius;
	        ctx.arc.apply(ctx, _toConsumableArray(this.pos).concat([radius, 0, 2 * Math.PI]));
	        ctx.stroke();
	      }
	
	      ctx.lineWidth = lineWidth;
	      ctx.globalAlpha = globalAlpha;
	      ctx.strokeStyle = strokeStyle;
	    }
	  }]);
	
	  return Ephemeral;
	}(_control2.default);
	
	exports.default = Ephemeral;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
	      window.setInterval(function () {
	        _this.grid.step();
	        _this.grid.draw(_this.ctx);
	      }, 40);
	      // TODO: Listener for resize
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
	    key: "bindTouchEndHandler",
	    value: function bindTouchEndHandler() {
	      var _this5 = this;
	
	      this.el.addEventListener("touchend", function (e) {
	        _this5.grid.handleTouchEnd(e);
	      });
	      this.el.addEventListener("touchcancel", function (e) {
	        _this5.grid.handleTouchEnd(e);
	      });
	    }
	  }, {
	    key: "bindTouchMoveHandler",
	    value: function bindTouchMoveHandler() {
	      var _this6 = this;
	
	      this.el.addEventListener("touchmove", function (e) {
	        _this6.grid.handleTouchMove(e);
	      });
	    }
	  }, {
	    key: "bindMouseMoveHandler",
	    value: function bindMouseMoveHandler() {
	      var _this7 = this;
	
	      this.el.addEventListener("mousemove", function (e) {
	        _this7.grid.handleMouseMove(e);
	      });
	    }
	  }]);
	
	  return Theremax;
	}();
	
	document.addEventListener("DOMContentLoaded", function (event) {
	  console.log("FOOOOOO");
	  var canvas = document.getElementById("game-canvas");
	  canvas.width = window.innerWidth - 30;
	  canvas.height = window.innerHeight - 30;
	  var context = canvas.getContext("2d");
	  window.el = canvas;
	  var tm = new Theremax(context, canvas);
	  tm.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _control = __webpack_require__(2);
	
	var _control2 = _interopRequireDefault(_control);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NUM_CONTROLS = 1;
	
	var DIM_X = 800;
	var DIM_Y = 600;
	
	var Grid = function () {
	  function Grid() {
	    _classCallCheck(this, Grid);
	
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
	
	  _createClass(Grid, [{
	    key: "getCursorPosition",
	    value: function getCursorPosition(canvas, event) {
	      var rect = canvas.getBoundingClientRect();
	      var x = event.clientX - rect.left;
	      var y = event.clientY - rect.top;
	      return [x, y];
	    }
	  }, {
	    key: "handleMouseUp",
	    value: function handleMouseUp(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      this.click && this.click.stop();
	      this.click = null;
	      this.mouseDown = false;
	      this.focusObject = null;
	    }
	  }, {
	    key: "getClicked",
	    value: function getClicked(pos) {
	      var objects = this.allControls();
	      for (var i = 0; i < objects.length; i++) {
	        if (objects[i].isClicked(pos)) {
	          return objects[i];
	        }
	      }
	      return null;
	    }
	  }, {
	    key: "touchMap",
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
	    key: "handleTouchDown",
	    value: function handleTouchDown(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var posArray = this.touchMap(e);
	
	      var el, opts;
	      for (var i = 0; i < posArray.length; i++) {
	        if (el = this.getClicked(posArray[i])) {
	          // Pass
	        } else {
	          opts = {
	            pos: posArray[i],
	            grid: this
	          };
	          this.touches.push(new _control2.default(opts));
	        }
	      }
	    }
	  }, {
	    key: "handleTouchMove",
	    value: function handleTouchMove(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var posArray = this.touchMap(e);
	      var unmatchedPos = [];
	      var matchedEls = [];
	      var el = void 0;
	      for (var i = 0; i < posArray.length; i++) {
	        if (el = this.getClicked(posArray[i])) {
	          matchedEls.push(el);
	          el.move(posArray[i]);
	        } else {
	          unmatchedPos.push(posArray[i]);
	        }
	      }
	      // Clean up dropped notes.
	
	      var unmatchedEls = this.allControls().filter(function (u) {
	        return matchedEls.indexOf(u) < 0;
	      });
	      while (unmatchedEls.length > unmatchedPos.length) {
	        el = unmatchedEls.shift();
	        this.controls.indexOf(el) < 0 && el.stop();
	      }
	      while (unmatchedPos.length > unmatchedEls.length) {
	        this.touches.push(new _control2.default({ grid: this, pos: unmatchedPos.shift() }));
	      }
	      for (i = 0; i < unmatchedEls.length; i++) {
	        console.log("Unmatched: ", unmatchedPos, unmatchedEls);
	        unmatchedEls[i].move(unmatchedPos[i]);
	      }
	    }
	  }, {
	    key: "handleTouchEnd",
	    value: function handleTouchEnd(e) {
	      var _this = this;
	
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
	      if (this.focusObject && posArray.reduce(function (a, b) {
	        return a || _this.focusObject.isClicked(b);
	      }, 0)) {
	        // pass
	      } else {
	        this.focusObject = null;
	      }
	      this.touches = newTouches;
	    }
	  }, {
	    key: "handleMouseMove",
	    value: function handleMouseMove(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var pos = this.getCursorPosition(e.target, e);
	
	      if (this.focusObject) {
	        this.focusObject.move(pos);
	      }
	    }
	  }, {
	    key: "handleMouseDown",
	    value: function handleMouseDown(e) {
	      var pos = this.getCursorPosition(e.target, e);
	      if (this.mouseDown) {
	        return;
	      }
	
	      this.mouseDown = true;
	
	      var objects = this.controls;
	      for (var i = 0; i < objects.length; i++) {
	        if (objects[i].isClicked(pos)) {
	          this.focusObject = objects[i];
	          return;
	        }
	      }
	      this.focusObject = new _control2.default({ pos: pos, grid: this });
	      this.click = this.focusObject;
	    }
	  }, {
	    key: "allControls",
	    value: function allControls() {
	      return this.controls.concat(this.touches).concat(this.click).concat(this.focusObject).filter(function (p) {
	        return p;
	      });
	    }
	  }, {
	    key: "addControls",
	    value: function addControls() {
	      for (var i = 1; i < NUM_CONTROLS + 1; i++) {
	        var opts = {
	          // pos: [ 30, i * (1/(NUM_CONTROLS+1)) * (DIM_Y-30) + 15 ],
	          pos: [30, i * (1 / (NUM_CONTROLS + 1)) * (DIM_Y - 30) + 15],
	          grid: this,
	          radius: 30
	        };
	        console.log(opts);
	        this.controls.push(new _control2.default(opts));
	      }
	    }
	  }, {
	    key: "sin",
	    value: function sin(x) {
	      var _this2 = this;
	
	      var norm = this.allControls().length;
	      return DIM_Y / 2 + this.allControls().reduce(function (acc, el) {
	        return acc + el.pos[1] * 0.5 / norm * Math.sin(_this2.scroll + x * 4 * Math.PI * (1 + el.pos[0] * 15 / DIM_X) / DIM_X);
	      }, 0);
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      // TODO: THIS MUST BE BROKEN UP.
	      var saveStyle = ctx.strokeStyle;
	      var saveWidth = ctx.lineWidth;
	      var saveAlpha = ctx.globalAlpha;
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
	      this.allControls().forEach(function (object) {
	        object && object.draw(ctx);
	      });
	      this.drawGrid(ctx);
	    }
	  }, {
	    key: "drawGrid",
	    value: function drawGrid(ctx) {
	      var saveStyle = ctx.strokeStyle;
	      ctx.strokeStyle = "#AAAAAA";
	      for (var i = 0; i <= DIM_X; i += 80) {
	        ctx.beginPath();
	        ctx.moveTo(i, 0);
	        ctx.lineTo(i, DIM_Y);
	        ctx.stroke();
	      }
	      var saveWidth = ctx.lineWidth;
	      ctx.lineWidth = 5;
	      for (i = 0; i <= DIM_Y / 2; i += 80) {
	        ctx.beginPath();
	        ctx.moveTo(0, DIM_Y / 2 - i);
	        ctx.lineTo(DIM_X, DIM_Y / 2 - i);
	        ctx.stroke();
	        ctx.beginPath();
	        ctx.moveTo(0, DIM_Y / 2 + i);
	        ctx.lineTo(DIM_X, DIM_Y / 2 + i);
	        ctx.stroke();
	        ctx.lineWidth = saveWidth;
	      }
	    }
	  }, {
	    key: "step",
	    value: function step() {
	      this.scroll = this.scroll + 2 / Math.PI;
	    }
	  }, {
	    key: "wrap",
	    value: function wrap(pos) {
	      return [Math.max(0, Math.min(DIM_X, pos[0])), Math.max(0, Math.min(DIM_Y, pos[1]))];
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
	
	    this.pos = options.pos || [0, 0];
	    this.radius = options.radius || 30;
	    this.color = options.color || "#FF0000";
	    this.grid = options.grid;
	
	    this.note = new _note2.default(this.pos[0] / this.grid.width, this.pos[1] / this.grid.height);
	  }
	
	  _createClass(Control, [{
	    key: "stop",
	    value: function stop() {
	      this.note.stop();
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      var strokeStyle = ctx.strokeStyle,
	          fillStyle = ctx.fillStyle,
	          lineWidth = ctx.lineWidth,
	          globalAlpha = ctx.globalAlpha;
	
	      ctx.beginPath();
	      ctx.fillStyle = this.color;
	      ctx.arc.apply(ctx, _toConsumableArray(this.pos).concat([this.radius, 0, 2 * Math.PI, false]));
	      ctx.fill();
	      ctx.fillStyle = fillStyle;
	    }
	  }, {
	    key: "move",
	    value: function move(pos) {
	      this.pos = this.grid.wrap(pos);
	      this.note.shift(this.pos[0] / this.grid.width, this.pos[1] / this.grid.height);
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
	      this.gainNode.gain.value = pVol * .2;
	      this.oscillatorNode.frequency.value = 100 * Math.pow(16, pFreq);
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
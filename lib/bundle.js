/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	import Grid from './grid.js';

	class Theremax {
	  constructor(ctx, el) {
	    this.grid = new Grid();
	    this.el = el;
	    this.ctx = ctx;
	  }

	  start() {
	    this.bindMouseDownHandler();
	    this.bindMouseUpHandler();
	    this.bindMouseMoveHandler();
	    this.bindTouchDownHandler();
	    this.bindTouchMoveHandler();
	    window.setInterval(
	      () => {
	        this.grid.step();
	        this.grid.draw(this.ctx);
	      },
	      40
	    );
	    // TODO: Listener for resize
	  }

	  bindMousDownHandler() {
	    this.el.addEventListener("mousedown",
	      (e) => {
	        this.game.handleMouseDown(e);
	      }
	    );
	  }

	  bindMouseUpHandler() {
	    this.el.addEventListener("mouseup",
	      (e) => {
	        this.game.handleMouseUp(e);
	      }
	    );
	  }

	  bindTouchcDownHandler() {
	    this.el.addEventListener("touchstart",
	      (e) => {
	        this.game.handleTouchDown(e);
	      }
	    );
	  }

	  bindTouchMoveHandler() {
	    this.el.addEventListener("touchmove",
	      (e) =>  {
	        this.game.handleTouchMove(e);
	      }
	    );
	  }

	  bindMouseMoveHandler() {
	    this.el.addEventListener("mousemove",
	      (e) => {
	        this.game.handleMouseMove(e);
	      }
	    );
	  }
	}

	document.addEventListener("DOMContentLoaded",
	  function(event) {
	    console.log("FOOOOOO");
	    let canvas = document.getElementById("game-canvas");
	    canvas.width = 800; //window.innerWidth;
	    canvas.height = 600; //window.innerHeight;
	    let context = canvas.getContext("2d");
	    window.el = canvas;
	    let tm = new Theremax(context, canvas);
	    tm.start();
	  }
	);


/***/ }
/******/ ]);
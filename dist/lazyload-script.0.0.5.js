(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lazyLoadScript"] = factory();
	else
		root["lazyLoadScript"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function lazyLoadScript(src) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    if (!src) {
      throw new Error('src parameter must be specified');
      return;
    }

    var defaults = {
      force: false
    },
        _Object$assign = Object.assign({}, defaults, typeof opts === 'string' ? {
      id: opts
    } : opts),
        id = _Object$assign.id,
        async = _Object$assign.async,
        integrity = _Object$assign.integrity,
        type = _Object$assign.type,
        text = _Object$assign.text,
        defer = _Object$assign.defer,
        charset = _Object$assign.charset,
        crossorigin = _Object$assign.crossorigin,
        force = _Object$assign.force,
        script = document.createElement('script');


    script.src = src;
    if (id) {
      script.setAttribute('id', id);
      if (document.getElementById(id)) {
        resolve(document.getElementById(id));
        return;
      }
    } else {
      var sc = document.querySelector('script[src="' + src + '"]');
      if (!force && sc) {
        resolve(sc);
        return;
      }
    }

    if (async) script.setAttribute('async', 'true');
    if (defer) script.setAttribute('defer', 'true');
    if (integrity) script.setAttribute('integrity', integrity);
    if (type) script.setAttribute('type', type);
    if (text) script.setAttribute('text', text);
    if (charset) script.setAttribute('charset', charset);
    if (crossorigin) script.setAttribute('crossorigin', crossorigin);

    script.onload = function (event) {
      resolve(script);
    };
    script.onerror = function (event) {
      reject(event);
    };
    document.body.appendChild(script);
  });
};

/***/ })
/******/ ]);
});
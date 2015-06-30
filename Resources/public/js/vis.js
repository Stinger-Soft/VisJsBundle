/**
 * vis.js
 * https://github.com/almende/vis
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 4.3.0
 * @date    2015-06-16
 *
 * @license
 * Copyright (C) 2011-2014 Almende B.V, http://almende.com
 *
 * Vis.js is dual licensed under both
 *
 * * The Apache 2.0 License
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * and
 *
 * * The MIT License
 *   http://opensource.org/licenses/MIT
 *
 * Vis.js may be distributed under either license.
 */

"use strict";

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["vis"] = factory();
	else
		root["vis"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

  // utils
  'use strict';

  exports.util = __webpack_require__(1);
  exports.DOMutil = __webpack_require__(7);

  // data
  exports.DataSet = __webpack_require__(8);
  exports.DataView = __webpack_require__(10);
  exports.Queue = __webpack_require__(9);

  // Graph3d
  exports.Graph3d = __webpack_require__(11);
  exports.graph3d = {
    Camera: __webpack_require__(15),
    Filter: __webpack_require__(16),
    Point2d: __webpack_require__(12),
    Point3d: __webpack_require__(14),
    Slider: __webpack_require__(17),
    StepNumber: __webpack_require__(18)
  };

  // Timeline
  exports.Timeline = __webpack_require__(19);
  exports.Graph2d = __webpack_require__(49);
  exports.timeline = {
    DateUtil: __webpack_require__(29),
    DataStep: __webpack_require__(52),
    Range: __webpack_require__(27),
    stack: __webpack_require__(33),
    TimeStep: __webpack_require__(36),

    components: {
      items: {
        Item: __webpack_require__(35),
        BackgroundItem: __webpack_require__(40),
        BoxItem: __webpack_require__(38),
        PointItem: __webpack_require__(39),
        RangeItem: __webpack_require__(34)
      },

      Component: __webpack_require__(21),
      CurrentTime: __webpack_require__(20),
      CustomTime: __webpack_require__(44),
      DataAxis: __webpack_require__(51),
      GraphGroup: __webpack_require__(53),
      Group: __webpack_require__(32),
      BackgroundGroup: __webpack_require__(37),
      ItemSet: __webpack_require__(31),
      Legend: __webpack_require__(57),
      LineGraph: __webpack_require__(50),
      TimeAxis: __webpack_require__(41)
    }
  };

  // Network
  exports.Network = __webpack_require__(59);
  exports.network = {
    Images: __webpack_require__(112),
    dotparser: __webpack_require__(110),
    gephiParser: __webpack_require__(111),
    allOptions: __webpack_require__(108)
  };
  exports.network.convertDot = function (input) {
    return exports.network.dotparser.DOTToGraph(input);
  };
  exports.network.convertGephi = function (input, options) {
    return exports.network.gephiParser.parseGephi(input, options);
  };

  // Deprecated since v3.0.0
  exports.Graph = function () {
    throw new Error('Graph is renamed to Network. Please create a graph as new vis.Network(...)');
  };

  // bundled external libraries
  exports.moment = __webpack_require__(2);
  exports.hammer = __webpack_require__(23); // TODO: deprecate exports.hammer some day
  exports.Hammer = __webpack_require__(23);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  // utility functions

  // first check if moment.js is already loaded in the browser window, if so,
  // use this instance. Else, load via commonjs.

  'use strict';

  var moment = __webpack_require__(2);
  var uuid = __webpack_require__(6);

  /**
   * Test whether given object is a number
   * @param {*} object
   * @return {Boolean} isNumber
   */
  exports.isNumber = function (object) {
    return object instanceof Number || typeof object == 'number';
  };

  /**
   * Remove everything in the DOM object
   * @param DOMobject
   */
  exports.recursiveDOMDelete = function (DOMobject) {
    if (DOMobject) {
      while (DOMobject.hasChildNodes() === true) {
        exports.recursiveDOMDelete(DOMobject.firstChild);
        DOMobject.removeChild(DOMobject.firstChild);
      }
    }
  };

  /**
   * this function gives you a range between 0 and 1 based on the min and max values in the set, the total sum of all values and the current value.
   *
   * @param min
   * @param max
   * @param total
   * @param value
   * @returns {number}
   */
  exports.giveRange = function (min, max, total, value) {
    if (max == min) {
      return 0.5;
    } else {
      var scale = 1 / (max - min);
      return Math.max(0, (value - min) * scale);
    }
  };

  /**
   * Test whether given object is a string
   * @param {*} object
   * @return {Boolean} isString
   */
  exports.isString = function (object) {
    return object instanceof String || typeof object == 'string';
  };

  /**
   * Test whether given object is a Date, or a String containing a Date
   * @param {Date | String} object
   * @return {Boolean} isDate
   */
  exports.isDate = function (object) {
    if (object instanceof Date) {
      return true;
    } else if (exports.isString(object)) {
      // test whether this string contains a date
      var match = ASPDateRegex.exec(object);
      if (match) {
        return true;
      } else if (!isNaN(Date.parse(object))) {
        return true;
      }
    }

    return false;
  };

  /**
   * Create a semi UUID
   * source: http://stackoverflow.com/a/105074/1262753
   * @return {String} uuid
   */
  exports.randomUUID = function () {
    return uuid.v4();
  };

  /**
   * assign all keys of an object that are not nested objects to a certain value (used for color objects).
   * @param obj
   * @param value
   */
  exports.assignAllKeys = function (obj, value) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] !== 'object') {
          obj[prop] = value;
        }
      }
    }
  };

  /**
   * Fill an object with a possibly partially defined other object. Only copies values if the a object has an object requiring values.
   * That means an object is not created on a property if only the b object has it.
   * @param obj
   * @param value
   */
  exports.fillIfDefined = function (a, b) {
    var allowDeletion = arguments[2] === undefined ? false : arguments[2];

    for (var prop in a) {
      if (b[prop] !== undefined) {
        if (typeof b[prop] !== 'object') {
          if ((b[prop] === undefined || b[prop] === null) && a[prop] !== undefined && allowDeletion === true) {
            delete a[prop];
          } else {
            a[prop] = b[prop];
          }
        } else {
          if (typeof a[prop] === 'object') {
            exports.fillIfDefined(a[prop], b[prop], allowDeletion);
          }
        }
      }
    }
  };

  /**
   * Extend object a with the properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.protoExtend = function (a, b) {
    for (var i = 1; i < arguments.length; i++) {
      var other = arguments[i];
      for (var prop in other) {
        a[prop] = other[prop];
      }
    }
    return a;
  };

  /**
   * Extend object a with the properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Object} a
   * @param {... Object} b
   * @return {Object} a
   */
  exports.extend = function (a, b) {
    for (var i = 1; i < arguments.length; i++) {
      var other = arguments[i];
      for (var prop in other) {
        if (other.hasOwnProperty(prop)) {
          a[prop] = other[prop];
        }
      }
    }
    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   */
  exports.selectiveExtend = function (props, a, b) {
    if (!Array.isArray(props)) {
      throw new Error('Array with property names expected as first argument');
    }

    for (var i = 2; i < arguments.length; i++) {
      var other = arguments[i];

      for (var p = 0; p < props.length; p++) {
        var prop = props[p];
        if (other.hasOwnProperty(prop)) {
          a[prop] = other[prop];
        }
      }
    }
    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   */
  exports.selectiveDeepExtend = function (props, a, b) {
    var allowDeletion = arguments[3] === undefined ? false : arguments[3];

    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
      throw new TypeError('Arrays are not supported by deepExtend');
    }
    for (var i = 2; i < arguments.length; i++) {
      var other = arguments[i];
      for (var p = 0; p < props.length; p++) {
        var prop = props[p];
        if (other.hasOwnProperty(prop)) {
          if (b[prop] && b[prop].constructor === Object) {
            if (a[prop] === undefined) {
              a[prop] = {};
            }
            if (a[prop].constructor === Object) {
              exports.deepExtend(a[prop], b[prop], false, allowDeletion);
            } else {
              if (b[prop] === null && a[prop] !== undefined && allowDeletion === true) {
                delete a[prop];
              } else {
                a[prop] = b[prop];
              }
            }
          } else if (Array.isArray(b[prop])) {
            throw new TypeError('Arrays are not supported by deepExtend');
          } else {
            a[prop] = b[prop];
          }
        }
      }
    }
    return a;
  };

  /**
   * Extend object a with selected properties of object b or a series of objects
   * Only properties with defined values are copied
   * @param {Array.<String>} props
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   */
  exports.selectiveNotDeepExtend = function (props, a, b) {
    var allowDeletion = arguments[3] === undefined ? false : arguments[3];

    // TODO: add support for Arrays to deepExtend
    if (Array.isArray(b)) {
      throw new TypeError('Arrays are not supported by deepExtend');
    }
    for (var prop in b) {
      if (b.hasOwnProperty(prop)) {
        if (props.indexOf(prop) == -1) {
          if (b[prop] && b[prop].constructor === Object) {
            if (a[prop] === undefined) {
              a[prop] = {};
            }
            if (a[prop].constructor === Object) {
              exports.deepExtend(a[prop], b[prop]);
            } else {
              if (b[prop] === null && a[prop] !== undefined && allowDeletion === true) {
                delete a[prop];
              } else {
                a[prop] = b[prop];
              }
            }
          } else if (Array.isArray(b[prop])) {
            throw new TypeError('Arrays are not supported by deepExtend');
          } else {
            a[prop] = b[prop];
          }
        }
      }
    }
    return a;
  };

  /**
   * Deep extend an object a with the properties of object b
   * @param {Object} a
   * @param {Object} b
   * @param [Boolean] protoExtend --> optional parameter. If true, the prototype values will also be extended.
   *                                  (ie. the options objects that inherit from others will also get the inherited options)
   * @param [Boolean] global      --> optional parameter. If true, the values of fields that are null will not deleted
   * @returns {Object}
   */
  exports.deepExtend = function (a, b, protoExtend, allowDeletion) {
    for (var prop in b) {
      if (b.hasOwnProperty(prop) || protoExtend === true) {
        if (b[prop] && b[prop].constructor === Object) {
          if (a[prop] === undefined) {
            a[prop] = {};
          }
          if (a[prop].constructor === Object) {
            exports.deepExtend(a[prop], b[prop], protoExtend);
          } else {
            if (b[prop] === null && a[prop] !== undefined && allowDeletion === true) {
              delete a[prop];
            } else {
              a[prop] = b[prop];
            }
          }
        } else if (Array.isArray(b[prop])) {
          a[prop] = [];
          for (var i = 0; i < b[prop].length; i++) {
            a[prop].push(b[prop][i]);
          }
        } else {
          a[prop] = b[prop];
        }
      }
    }
    return a;
  };

  /**
   * Test whether all elements in two arrays are equal.
   * @param {Array} a
   * @param {Array} b
   * @return {boolean} Returns true if both arrays have the same length and same
   *                   elements.
   */
  exports.equalArray = function (a, b) {
    if (a.length != b.length) return false;

    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] != b[i]) return false;
    }

    return true;
  };

  /**
   * Convert an object to another type
   * @param {Boolean | Number | String | Date | Moment | Null | undefined} object
   * @param {String | undefined} type   Name of the type. Available types:
   *                                    'Boolean', 'Number', 'String',
   *                                    'Date', 'Moment', ISODate', 'ASPDate'.
   * @return {*} object
   * @throws Error
   */
  exports.convert = function (object, type) {
    var match;

    if (object === undefined) {
      return undefined;
    }
    if (object === null) {
      return null;
    }

    if (!type) {
      return object;
    }
    if (!(typeof type === 'string') && !(type instanceof String)) {
      throw new Error('Type must be a string');
    }

    //noinspection FallthroughInSwitchStatementJS
    switch (type) {
      case 'boolean':
      case 'Boolean':
        return Boolean(object);

      case 'number':
      case 'Number':
        return Number(object.valueOf());

      case 'string':
      case 'String':
        return String(object);

      case 'Date':
        if (exports.isNumber(object)) {
          return new Date(object);
        }
        if (object instanceof Date) {
          return new Date(object.valueOf());
        } else if (moment.isMoment(object)) {
          return new Date(object.valueOf());
        }
        if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return new Date(Number(match[1])); // parse number
          } else {
            return moment(object).toDate(); // parse string
          }
        } else {
          throw new Error('Cannot convert object of type ' + exports.getType(object) + ' to type Date');
        }

      case 'Moment':
        if (exports.isNumber(object)) {
          return moment(object);
        }
        if (object instanceof Date) {
          return moment(object.valueOf());
        } else if (moment.isMoment(object)) {
          return moment(object);
        }
        if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return moment(Number(match[1])); // parse number
          } else {
            return moment(object); // parse string
          }
        } else {
          throw new Error('Cannot convert object of type ' + exports.getType(object) + ' to type Date');
        }

      case 'ISODate':
        if (exports.isNumber(object)) {
          return new Date(object);
        } else if (object instanceof Date) {
          return object.toISOString();
        } else if (moment.isMoment(object)) {
          return object.toDate().toISOString();
        } else if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          if (match) {
            // object is an ASP date
            return new Date(Number(match[1])).toISOString(); // parse number
          } else {
            return new Date(object).toISOString(); // parse string
          }
        } else {
          throw new Error('Cannot convert object of type ' + exports.getType(object) + ' to type ISODate');
        }

      case 'ASPDate':
        if (exports.isNumber(object)) {
          return '/Date(' + object + ')/';
        } else if (object instanceof Date) {
          return '/Date(' + object.valueOf() + ')/';
        } else if (exports.isString(object)) {
          match = ASPDateRegex.exec(object);
          var value;
          if (match) {
            // object is an ASP date
            value = new Date(Number(match[1])).valueOf(); // parse number
          } else {
            value = new Date(object).valueOf(); // parse string
          }
          return '/Date(' + value + ')/';
        } else {
          throw new Error('Cannot convert object of type ' + exports.getType(object) + ' to type ASPDate');
        }

      default:
        throw new Error('Unknown type "' + type + '"');
    }
  };

  // parse ASP.Net Date pattern,
  // for example '/Date(1198908717056)/' or '/Date(1198908717056-0700)/'
  // code from http://momentjs.com/
  var ASPDateRegex = /^\/?Date\((\-?\d+)/i;

  /**
   * Get the type of an object, for example exports.getType([]) returns 'Array'
   * @param {*} object
   * @return {String} type
   */
  exports.getType = function (object) {
    var type = typeof object;

    if (type == 'object') {
      if (object === null) {
        return 'null';
      }
      if (object instanceof Boolean) {
        return 'Boolean';
      }
      if (object instanceof Number) {
        return 'Number';
      }
      if (object instanceof String) {
        return 'String';
      }
      if (Array.isArray(object)) {
        return 'Array';
      }
      if (object instanceof Date) {
        return 'Date';
      }
      return 'Object';
    } else if (type == 'number') {
      return 'Number';
    } else if (type == 'boolean') {
      return 'Boolean';
    } else if (type == 'string') {
      return 'String';
    } else if (type === undefined) {
      return 'undefined';
    }

    return type;
  };

  /**
   * Used to extend an array and copy it. This is used to propagate paths recursively.
   *
   * @param arr
   * @param newValue
   * @returns {Array}
   */
  exports.copyAndExtendArray = function (arr, newValue) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }
    newArr.push(newValue);
    return newArr;
  };

  /**
   * Used to extend an array and copy it. This is used to propagate paths recursively.
   *
   * @param arr
   * @param newValue
   * @returns {Array}
   */
  exports.copyArray = function (arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  };

  /**
   * Retrieve the absolute left value of a DOM element
   * @param {Element} elem        A dom element, for example a div
   * @return {number} left        The absolute left position of this element
   *                              in the browser page.
   */
  exports.getAbsoluteLeft = function (elem) {
    return elem.getBoundingClientRect().left;
  };

  /**
   * Retrieve the absolute top value of a DOM element
   * @param {Element} elem        A dom element, for example a div
   * @return {number} top        The absolute top position of this element
   *                              in the browser page.
   */
  exports.getAbsoluteTop = function (elem) {
    return elem.getBoundingClientRect().top;
  };

  /**
   * add a className to the given elements style
   * @param {Element} elem
   * @param {String} className
   */
  exports.addClassName = function (elem, className) {
    var classes = elem.className.split(' ');
    if (classes.indexOf(className) == -1) {
      classes.push(className); // add the class to the array
      elem.className = classes.join(' ');
    }
  };

  /**
   * add a className to the given elements style
   * @param {Element} elem
   * @param {String} className
   */
  exports.removeClassName = function (elem, className) {
    var classes = elem.className.split(' ');
    var index = classes.indexOf(className);
    if (index != -1) {
      classes.splice(index, 1); // remove the class from the array
      elem.className = classes.join(' ');
    }
  };

  /**
   * For each method for both arrays and objects.
   * In case of an array, the built-in Array.forEach() is applied.
   * In case of an Object, the method loops over all properties of the object.
   * @param {Object | Array} object   An Object or Array
   * @param {function} callback       Callback method, called for each item in
   *                                  the object or array with three parameters:
   *                                  callback(value, index, object)
   */
  exports.forEach = function (object, callback) {
    var i, len;
    if (Array.isArray(object)) {
      // array
      for (i = 0, len = object.length; i < len; i++) {
        callback(object[i], i, object);
      }
    } else {
      // object
      for (i in object) {
        if (object.hasOwnProperty(i)) {
          callback(object[i], i, object);
        }
      }
    }
  };

  /**
   * Convert an object into an array: all objects properties are put into the
   * array. The resulting array is unordered.
   * @param {Object} object
   * @param {Array} array
   */
  exports.toArray = function (object) {
    var array = [];

    for (var prop in object) {
      if (object.hasOwnProperty(prop)) array.push(object[prop]);
    }

    return array;
  };

  /**
   * Update a property in an object
   * @param {Object} object
   * @param {String} key
   * @param {*} value
   * @return {Boolean} changed
   */
  exports.updateProperty = function (object, key, value) {
    if (object[key] !== value) {
      object[key] = value;
      return true;
    } else {
      return false;
    }
  };

  /**
   * Add and event listener. Works for all browsers
   * @param {Element}     element    An html element
   * @param {string}      action     The action, for example "click",
   *                                 without the prefix "on"
   * @param {function}    listener   The callback function to be executed
   * @param {boolean}     [useCapture]
   */
  exports.addEventListener = function (element, action, listener, useCapture) {
    if (element.addEventListener) {
      if (useCapture === undefined) useCapture = false;

      if (action === 'mousewheel' && navigator.userAgent.indexOf('Firefox') >= 0) {
        action = 'DOMMouseScroll'; // For Firefox
      }

      element.addEventListener(action, listener, useCapture);
    } else {
      element.attachEvent('on' + action, listener); // IE browsers
    }
  };

  /**
   * Remove an event listener from an element
   * @param {Element}     element         An html dom element
   * @param {string}      action          The name of the event, for example "mousedown"
   * @param {function}    listener        The listener function
   * @param {boolean}     [useCapture]
   */
  exports.removeEventListener = function (element, action, listener, useCapture) {
    if (element.removeEventListener) {
      // non-IE browsers
      if (useCapture === undefined) useCapture = false;

      if (action === 'mousewheel' && navigator.userAgent.indexOf('Firefox') >= 0) {
        action = 'DOMMouseScroll'; // For Firefox
      }

      element.removeEventListener(action, listener, useCapture);
    } else {
      // IE browsers
      element.detachEvent('on' + action, listener);
    }
  };

  /**
   * Cancels the event if it is cancelable, without stopping further propagation of the event.
   */
  exports.preventDefault = function (event) {
    if (!event) event = window.event;

    if (event.preventDefault) {
      event.preventDefault(); // non-IE browsers
    } else {
      event.returnValue = false; // IE browsers
    }
  };

  /**
   * Get HTML element which is the target of the event
   * @param {Event} event
   * @return {Element} target element
   */
  exports.getTarget = function (event) {
    // code from http://www.quirksmode.org/js/events_properties.html
    if (!event) {
      event = window.event;
    }

    var target;

    if (event.target) {
      target = event.target;
    } else if (event.srcElement) {
      target = event.srcElement;
    }

    if (target.nodeType != undefined && target.nodeType == 3) {
      // defeat Safari bug
      target = target.parentNode;
    }

    return target;
  };

  /**
   * Check if given element contains given parent somewhere in the DOM tree
   * @param {Element} element
   * @param {Element} parent
   */
  exports.hasParent = function (element, parent) {
    var e = element;

    while (e) {
      if (e === parent) {
        return true;
      }
      e = e.parentNode;
    }

    return false;
  };

  exports.option = {};

  /**
   * Convert a value into a boolean
   * @param {Boolean | function | undefined} value
   * @param {Boolean} [defaultValue]
   * @returns {Boolean} bool
   */
  exports.option.asBoolean = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return value != false;
    }

    return defaultValue || null;
  };

  /**
   * Convert a value into a number
   * @param {Boolean | function | undefined} value
   * @param {Number} [defaultValue]
   * @returns {Number} number
   */
  exports.option.asNumber = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return Number(value) || defaultValue || null;
    }

    return defaultValue || null;
  };

  /**
   * Convert a value into a string
   * @param {String | function | undefined} value
   * @param {String} [defaultValue]
   * @returns {String} str
   */
  exports.option.asString = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (value != null) {
      return String(value);
    }

    return defaultValue || null;
  };

  /**
   * Convert a size or location into a string with pixels or a percentage
   * @param {String | Number | function | undefined} value
   * @param {String} [defaultValue]
   * @returns {String} size
   */
  exports.option.asSize = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    if (exports.isString(value)) {
      return value;
    } else if (exports.isNumber(value)) {
      return value + 'px';
    } else {
      return defaultValue || null;
    }
  };

  /**
   * Convert a value into a DOM element
   * @param {HTMLElement | function | undefined} value
   * @param {HTMLElement} [defaultValue]
   * @returns {HTMLElement | null} dom
   */
  exports.option.asElement = function (value, defaultValue) {
    if (typeof value == 'function') {
      value = value();
    }

    return value || defaultValue || null;
  };

  /**
   * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
   *
   * @param {String} hex
   * @returns {{r: *, g: *, b: *}} | 255 range
   */
  exports.hexToRGB = function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  /**
   * This function takes color in hex format or rgb() or rgba() format and overrides the opacity. Returns rgba() string.
   * @param color
   * @param opacity
   * @returns {*}
   */
  exports.overrideOpacity = function (color, opacity) {
    if (color.indexOf('rgba') != -1) {
      return color;
    } else if (color.indexOf('rgb') != -1) {
      var rgb = color.substr(color.indexOf('(') + 1).replace(')', '').split(',');
      return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')';
    } else {
      var rgb = exports.hexToRGB(color);
      if (rgb == null) {
        return color;
      } else {
        return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
      }
    }
  };

  /**
   *
   * @param red     0 -- 255
   * @param green   0 -- 255
   * @param blue    0 -- 255
   * @returns {string}
   * @constructor
   */
  exports.RGBToHex = function (red, green, blue) {
    return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  };

  /**
   * Parse a color property into an object with border, background, and
   * highlight colors
   * @param {Object | String} color
   * @return {Object} colorObject
   */
  exports.parseColor = function (color) {
    var c;
    if (exports.isString(color) === true) {
      if (exports.isValidRGB(color) === true) {
        var rgb = color.substr(4).substr(0, color.length - 5).split(',').map(function (value) {
          return parseInt(value);
        });
        color = exports.RGBToHex(rgb[0], rgb[1], rgb[2]);
      }
      if (exports.isValidHex(color) === true) {
        var hsv = exports.hexToHSV(color);
        var lighterColorHSV = { h: hsv.h, s: hsv.s * 0.8, v: Math.min(1, hsv.v * 1.02) };
        var darkerColorHSV = { h: hsv.h, s: Math.min(1, hsv.s * 1.25), v: hsv.v * 0.8 };
        var darkerColorHex = exports.HSVToHex(darkerColorHSV.h, darkerColorHSV.s, darkerColorHSV.v);
        var lighterColorHex = exports.HSVToHex(lighterColorHSV.h, lighterColorHSV.s, lighterColorHSV.v);
        c = {
          background: color,
          border: darkerColorHex,
          highlight: {
            background: lighterColorHex,
            border: darkerColorHex
          },
          hover: {
            background: lighterColorHex,
            border: darkerColorHex
          }
        };
      } else {
        c = {
          background: color,
          border: color,
          highlight: {
            background: color,
            border: color
          },
          hover: {
            background: color,
            border: color
          }
        };
      }
    } else {
      c = {};
      c.background = color.background || undefined;
      c.border = color.border || undefined;

      if (exports.isString(color.highlight)) {
        c.highlight = {
          border: color.highlight,
          background: color.highlight
        };
      } else {
        c.highlight = {};
        c.highlight.background = color.highlight && color.highlight.background || undefined;
        c.highlight.border = color.highlight && color.highlight.border || undefined;
      }

      if (exports.isString(color.hover)) {
        c.hover = {
          border: color.hover,
          background: color.hover
        };
      } else {
        c.hover = {};
        c.hover.background = color.hover && color.hover.background || undefined;
        c.hover.border = color.hover && color.hover.border || undefined;
      }
    }

    return c;
  };

  /**
   * http://www.javascripter.net/faq/rgb2hsv.htm
   *
   * @param red
   * @param green
   * @param blue
   * @returns {*}
   * @constructor
   */
  exports.RGBToHSV = function (red, green, blue) {
    red = red / 255;green = green / 255;blue = blue / 255;
    var minRGB = Math.min(red, Math.min(green, blue));
    var maxRGB = Math.max(red, Math.max(green, blue));

    // Black-gray-white
    if (minRGB == maxRGB) {
      return { h: 0, s: 0, v: minRGB };
    }

    // Colors other than black-gray-white:
    var d = red == minRGB ? green - blue : blue == minRGB ? red - green : blue - red;
    var h = red == minRGB ? 3 : blue == minRGB ? 1 : 5;
    var hue = 60 * (h - d / (maxRGB - minRGB)) / 360;
    var saturation = (maxRGB - minRGB) / maxRGB;
    var value = maxRGB;
    return { h: hue, s: saturation, v: value };
  };

  var cssUtil = {
    // split a string with css styles into an object with key/values
    split: function split(cssText) {
      var styles = {};

      cssText.split(';').forEach(function (style) {
        if (style.trim() != '') {
          var parts = style.split(':');
          var key = parts[0].trim();
          var value = parts[1].trim();
          styles[key] = value;
        }
      });

      return styles;
    },

    // build a css text string from an object with key/values
    join: function join(styles) {
      return Object.keys(styles).map(function (key) {
        return key + ': ' + styles[key];
      }).join('; ');
    }
  };

  /**
   * Append a string with css styles to an element
   * @param {Element} element
   * @param {String} cssText
   */
  exports.addCssText = function (element, cssText) {
    var currentStyles = cssUtil.split(element.style.cssText);
    var newStyles = cssUtil.split(cssText);
    var styles = exports.extend(currentStyles, newStyles);

    element.style.cssText = cssUtil.join(styles);
  };

  /**
   * Remove a string with css styles from an element
   * @param {Element} element
   * @param {String} cssText
   */
  exports.removeCssText = function (element, cssText) {
    var styles = cssUtil.split(element.style.cssText);
    var removeStyles = cssUtil.split(cssText);

    for (var key in removeStyles) {
      if (removeStyles.hasOwnProperty(key)) {
        delete styles[key];
      }
    }

    element.style.cssText = cssUtil.join(styles);
  };

  /**
   * https://gist.github.com/mjijackson/5311256
   * @param h
   * @param s
   * @param v
   * @returns {{r: number, g: number, b: number}}
   * @constructor
   */
  exports.HSVToRGB = function (h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;break;
      case 1:
        r = q, g = v, b = p;break;
      case 2:
        r = p, g = v, b = t;break;
      case 3:
        r = p, g = q, b = v;break;
      case 4:
        r = t, g = p, b = v;break;
      case 5:
        r = v, g = p, b = q;break;
    }

    return { r: Math.floor(r * 255), g: Math.floor(g * 255), b: Math.floor(b * 255) };
  };

  exports.HSVToHex = function (h, s, v) {
    var rgb = exports.HSVToRGB(h, s, v);
    return exports.RGBToHex(rgb.r, rgb.g, rgb.b);
  };

  exports.hexToHSV = function (hex) {
    var rgb = exports.hexToRGB(hex);
    return exports.RGBToHSV(rgb.r, rgb.g, rgb.b);
  };

  exports.isValidHex = function (hex) {
    var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
    return isOk;
  };

  exports.isValidRGB = function (rgb) {
    rgb = rgb.replace(' ', '');
    var isOk = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(rgb);
    return isOk;
  };
  exports.isValidRGBA = function (rgba) {
    rgba = rgba.replace(' ', '');
    var isOk = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(.{1,3})\)/i.test(rgba);
    return isOk;
  };

  /**
   * This recursively redirects the prototype of JSON objects to the referenceObject
   * This is used for default options.
   *
   * @param referenceObject
   * @returns {*}
   */
  exports.selectiveBridgeObject = function (fields, referenceObject) {
    if (typeof referenceObject == 'object') {
      var objectTo = Object.create(referenceObject);
      for (var i = 0; i < fields.length; i++) {
        if (referenceObject.hasOwnProperty(fields[i])) {
          if (typeof referenceObject[fields[i]] == 'object') {
            objectTo[fields[i]] = exports.bridgeObject(referenceObject[fields[i]]);
          }
        }
      }
      return objectTo;
    } else {
      return null;
    }
  };

  /**
   * This recursively redirects the prototype of JSON objects to the referenceObject
   * This is used for default options.
   *
   * @param referenceObject
   * @returns {*}
   */
  exports.bridgeObject = function (referenceObject) {
    if (typeof referenceObject == 'object') {
      var objectTo = Object.create(referenceObject);
      for (var i in referenceObject) {
        if (referenceObject.hasOwnProperty(i)) {
          if (typeof referenceObject[i] == 'object') {
            objectTo[i] = exports.bridgeObject(referenceObject[i]);
          }
        }
      }
      return objectTo;
    } else {
      return null;
    }
  };

  /**
   * this is used to set the options of subobjects in the options object. A requirement of these subobjects
   * is that they have an 'enabled' element which is optional for the user but mandatory for the program.
   *
   * @param [object] mergeTarget | this is either this.options or the options used for the groups.
   * @param [object] options     | options
   * @param [String] option      | this is the option key in the options argument
   * @private
   */
  exports.mergeOptions = function (mergeTarget, options, option) {
    var allowDeletion = arguments[3] === undefined ? false : arguments[3];

    if (options[option] === null) {
      mergeTarget[option] = undefined;
      delete mergeTarget[option];
    } else {
      if (options[option] !== undefined) {
        if (typeof options[option] === 'boolean') {
          mergeTarget[option].enabled = options[option];
        } else {
          if (options[option].enabled === undefined) {
            mergeTarget[option].enabled = true;
          }
          for (var prop in options[option]) {
            if (options[option].hasOwnProperty(prop)) {
              mergeTarget[option][prop] = options[option][prop];
            }
          }
        }
      }
    }
  };

  /**
   * This function does a binary search for a visible item in a sorted list. If we find a visible item, the code that uses
   * this function will then iterate in both directions over this sorted list to find all visible items.
   *
   * @param {Item[]} orderedItems       | Items ordered by start
   * @param {function} searchFunction   | -1 is lower, 0 is found, 1 is higher
   * @param {String} field
   * @param {String} field2
   * @returns {number}
   * @private
   */
  exports.binarySearchCustom = function (orderedItems, searchFunction, field, field2) {
    var maxIterations = 10000;
    var iteration = 0;
    var low = 0;
    var high = orderedItems.length - 1;

    while (low <= high && iteration < maxIterations) {
      var middle = Math.floor((low + high) / 2);

      var item = orderedItems[middle];
      var value = field2 === undefined ? item[field] : item[field][field2];

      var searchResult = searchFunction(value);
      if (searchResult == 0) {
        // jihaa, found a visible item!
        return middle;
      } else if (searchResult == -1) {
        // it is too small --> increase low
        low = middle + 1;
      } else {
        // it is too big --> decrease high
        high = middle - 1;
      }

      iteration++;
    }

    return -1;
  };

  /**
   * This function does a binary search for a specific value in a sorted array. If it does not exist but is in between of
   * two values, we return either the one before or the one after, depending on user input
   * If it is found, we return the index, else -1.
   *
   * @param {Array} orderedItems
   * @param {{start: number, end: number}} target
   * @param {String} field
   * @param {String} sidePreference   'before' or 'after'
   * @returns {number}
   * @private
   */
  exports.binarySearchValue = function (orderedItems, target, field, sidePreference) {
    var maxIterations = 10000;
    var iteration = 0;
    var low = 0;
    var high = orderedItems.length - 1;
    var prevValue, value, nextValue, middle;

    while (low <= high && iteration < maxIterations) {
      // get a new guess
      middle = Math.floor(0.5 * (high + low));
      prevValue = orderedItems[Math.max(0, middle - 1)][field];
      value = orderedItems[middle][field];
      nextValue = orderedItems[Math.min(orderedItems.length - 1, middle + 1)][field];

      if (value == target) {
        // we found the target
        return middle;
      } else if (prevValue < target && value > target) {
        // target is in between of the previous and the current
        return sidePreference == 'before' ? Math.max(0, middle - 1) : middle;
      } else if (value < target && nextValue > target) {
        // target is in between of the current and the next
        return sidePreference == 'before' ? middle : Math.min(orderedItems.length - 1, middle + 1);
      } else {
        // didnt find the target, we need to change our boundaries.
        if (value < target) {
          // it is too small --> increase low
          low = middle + 1;
        } else {
          // it is too big --> decrease high
          high = middle - 1;
        }
      }
      iteration++;
    }

    // didnt find anything. Return -1.
    return -1;
  };

  /*
   * Easing Functions - inspired from http://gizma.com/easing/
   * only considering the t value for the range [0, 1] => [0, 1]
   * https://gist.github.com/gre/1650294
   */
  exports.easingFunctions = {
    // no easing, no acceleration
    linear: function linear(t) {
      return t;
    },
    // accelerating from zero velocity
    easeInQuad: function easeInQuad(t) {
      return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad: function easeOutQuad(t) {
      return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic: function easeInCubic(t) {
      return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic: function easeOutCubic(t) {
      return --t * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart: function easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint: function easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  // first check if moment.js is already loaded in the browser window, if so,
  // use this instance. Else, load via commonjs.
  'use strict';

  module.exports = typeof window !== 'undefined' && window['moment'] || __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {//! moment.js
  //! version : 2.10.3
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com

  (function (global, factory) {
      true ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
      global.moment = factory()
  }(this, function () { 'use strict';

      var hookCallback;

      function utils_hooks__hooks () {
          return hookCallback.apply(null, arguments);
      }

      // This is done to register the method called with moment()
      // without creating circular dependencies.
      function setHookCallback (callback) {
          hookCallback = callback;
      }

      function isArray(input) {
          return Object.prototype.toString.call(input) === '[object Array]';
      }

      function isDate(input) {
          return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
      }

      function map(arr, fn) {
          var res = [], i;
          for (i = 0; i < arr.length; ++i) {
              res.push(fn(arr[i], i));
          }
          return res;
      }

      function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
      }

      function extend(a, b) {
          for (var i in b) {
              if (hasOwnProp(b, i)) {
                  a[i] = b[i];
              }
          }

          if (hasOwnProp(b, 'toString')) {
              a.toString = b.toString;
          }

          if (hasOwnProp(b, 'valueOf')) {
              a.valueOf = b.valueOf;
          }

          return a;
      }

      function create_utc__createUTC (input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
      }

      function defaultParsingFlags() {
          // We need to deep clone this object.
          return {
              empty           : false,
              unusedTokens    : [],
              unusedInput     : [],
              overflow        : -2,
              charsLeftOver   : 0,
              nullInput       : false,
              invalidMonth    : null,
              invalidFormat   : false,
              userInvalidated : false,
              iso             : false
          };
      }

      function getParsingFlags(m) {
          if (m._pf == null) {
              m._pf = defaultParsingFlags();
          }
          return m._pf;
      }

      function valid__isValid(m) {
          if (m._isValid == null) {
              var flags = getParsingFlags(m);
              m._isValid = !isNaN(m._d.getTime()) &&
                  flags.overflow < 0 &&
                  !flags.empty &&
                  !flags.invalidMonth &&
                  !flags.nullInput &&
                  !flags.invalidFormat &&
                  !flags.userInvalidated;

              if (m._strict) {
                  m._isValid = m._isValid &&
                      flags.charsLeftOver === 0 &&
                      flags.unusedTokens.length === 0 &&
                      flags.bigHour === undefined;
              }
          }
          return m._isValid;
      }

      function valid__createInvalid (flags) {
          var m = create_utc__createUTC(NaN);
          if (flags != null) {
              extend(getParsingFlags(m), flags);
          }
          else {
              getParsingFlags(m).userInvalidated = true;
          }

          return m;
      }

      var momentProperties = utils_hooks__hooks.momentProperties = [];

      function copyConfig(to, from) {
          var i, prop, val;

          if (typeof from._isAMomentObject !== 'undefined') {
              to._isAMomentObject = from._isAMomentObject;
          }
          if (typeof from._i !== 'undefined') {
              to._i = from._i;
          }
          if (typeof from._f !== 'undefined') {
              to._f = from._f;
          }
          if (typeof from._l !== 'undefined') {
              to._l = from._l;
          }
          if (typeof from._strict !== 'undefined') {
              to._strict = from._strict;
          }
          if (typeof from._tzm !== 'undefined') {
              to._tzm = from._tzm;
          }
          if (typeof from._isUTC !== 'undefined') {
              to._isUTC = from._isUTC;
          }
          if (typeof from._offset !== 'undefined') {
              to._offset = from._offset;
          }
          if (typeof from._pf !== 'undefined') {
              to._pf = getParsingFlags(from);
          }
          if (typeof from._locale !== 'undefined') {
              to._locale = from._locale;
          }

          if (momentProperties.length > 0) {
              for (i in momentProperties) {
                  prop = momentProperties[i];
                  val = from[prop];
                  if (typeof val !== 'undefined') {
                      to[prop] = val;
                  }
              }
          }

          return to;
      }

      var updateInProgress = false;

      // Moment prototype object
      function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(+config._d);
          // Prevent infinite loop in case updateOffset creates new moment
          // objects.
          if (updateInProgress === false) {
              updateInProgress = true;
              utils_hooks__hooks.updateOffset(this);
              updateInProgress = false;
          }
      }

      function isMoment (obj) {
          return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
      }

      function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
              value = 0;

          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
              if (coercedNumber >= 0) {
                  value = Math.floor(coercedNumber);
              } else {
                  value = Math.ceil(coercedNumber);
              }
          }

          return value;
      }

      function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
              lengthDiff = Math.abs(array1.length - array2.length),
              diffs = 0,
              i;
          for (i = 0; i < len; i++) {
              if ((dontConvert && array1[i] !== array2[i]) ||
                  (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                  diffs++;
              }
          }
          return diffs + lengthDiff;
      }

      function Locale() {
      }

      var locales = {};
      var globalLocale;

      function normalizeLocale(key) {
          return key ? key.toLowerCase().replace('_', '-') : key;
      }

      // pick the locale from the array
      // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
      // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
      function chooseLocale(names) {
          var i = 0, j, next, locale, split;

          while (i < names.length) {
              split = normalizeLocale(names[i]).split('-');
              j = split.length;
              next = normalizeLocale(names[i + 1]);
              next = next ? next.split('-') : null;
              while (j > 0) {
                  locale = loadLocale(split.slice(0, j).join('-'));
                  if (locale) {
                      return locale;
                  }
                  if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                      //the next array item is better than a shallower substring of this one
                      break;
                  }
                  j--;
              }
              i++;
          }
          return null;
      }

      function loadLocale(name) {
          var oldLocale = null;
          // TODO: Find a better way to register and load all the locales in Node
          if (!locales[name] && typeof module !== 'undefined' &&
                  module && module.exports) {
              try {
                  oldLocale = globalLocale._abbr;
                  !(function webpackMissingModule() { var e = new Error("Cannot find module \"./locale\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
                  // because defineLocale currently also sets the global locale, we
                  // want to undo that for lazy loaded locales
                  locale_locales__getSetGlobalLocale(oldLocale);
              } catch (e) { }
          }
          return locales[name];
      }

      // This function will load locale and then set the global locale.  If
      // no arguments are passed in, it will simply return the current global
      // locale key.
      function locale_locales__getSetGlobalLocale (key, values) {
          var data;
          if (key) {
              if (typeof values === 'undefined') {
                  data = locale_locales__getLocale(key);
              }
              else {
                  data = defineLocale(key, values);
              }

              if (data) {
                  // moment.duration._locale = moment._locale = data;
                  globalLocale = data;
              }
          }

          return globalLocale._abbr;
      }

      function defineLocale (name, values) {
          if (values !== null) {
              values.abbr = name;
              if (!locales[name]) {
                  locales[name] = new Locale();
              }
              locales[name].set(values);

              // backwards compat for now: also set the locale
              locale_locales__getSetGlobalLocale(name);

              return locales[name];
          } else {
              // useful for testing
              delete locales[name];
              return null;
          }
      }

      // returns locale data
      function locale_locales__getLocale (key) {
          var locale;

          if (key && key._locale && key._locale._abbr) {
              key = key._locale._abbr;
          }

          if (!key) {
              return globalLocale;
          }

          if (!isArray(key)) {
              //short-circuit everything else
              locale = loadLocale(key);
              if (locale) {
                  return locale;
              }
              key = [key];
          }

          return chooseLocale(key);
      }

      var aliases = {};

      function addUnitAlias (unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
      }

      function normalizeUnits(units) {
          return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
      }

      function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
              normalizedProp,
              prop;

          for (prop in inputObject) {
              if (hasOwnProp(inputObject, prop)) {
                  normalizedProp = normalizeUnits(prop);
                  if (normalizedProp) {
                      normalizedInput[normalizedProp] = inputObject[prop];
                  }
              }
          }

          return normalizedInput;
      }

      function makeGetSet (unit, keepTime) {
          return function (value) {
              if (value != null) {
                  get_set__set(this, unit, value);
                  utils_hooks__hooks.updateOffset(this, keepTime);
                  return this;
              } else {
                  return get_set__get(this, unit);
              }
          };
      }

      function get_set__get (mom, unit) {
          return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
      }

      function get_set__set (mom, unit, value) {
          return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }

      // MOMENTS

      function getSet (units, value) {
          var unit;
          if (typeof units === 'object') {
              for (unit in units) {
                  this.set(unit, units[unit]);
              }
          } else {
              units = normalizeUnits(units);
              if (typeof this[units] === 'function') {
                  return this[units](value);
              }
          }
          return this;
      }

      function zeroFill(number, targetLength, forceSign) {
          var output = '' + Math.abs(number),
              sign = number >= 0;

          while (output.length < targetLength) {
              output = '0' + output;
          }
          return (sign ? (forceSign ? '+' : '') : '-') + output;
      }

      var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g;

      var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

      var formatFunctions = {};

      var formatTokenFunctions = {};

      // token:    'M'
      // padded:   ['MM', 2]
      // ordinal:  'Mo'
      // callback: function () { this.month() + 1 }
      function addFormatToken (token, padded, ordinal, callback) {
          var func = callback;
          if (typeof callback === 'string') {
              func = function () {
                  return this[callback]();
              };
          }
          if (token) {
              formatTokenFunctions[token] = func;
          }
          if (padded) {
              formatTokenFunctions[padded[0]] = function () {
                  return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
              };
          }
          if (ordinal) {
              formatTokenFunctions[ordinal] = function () {
                  return this.localeData().ordinal(func.apply(this, arguments), token);
              };
          }
      }

      function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
              return input.replace(/^\[|\]$/g, '');
          }
          return input.replace(/\\/g, '');
      }

      function makeFormatFunction(format) {
          var array = format.match(formattingTokens), i, length;

          for (i = 0, length = array.length; i < length; i++) {
              if (formatTokenFunctions[array[i]]) {
                  array[i] = formatTokenFunctions[array[i]];
              } else {
                  array[i] = removeFormattingTokens(array[i]);
              }
          }

          return function (mom) {
              var output = '';
              for (i = 0; i < length; i++) {
                  output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
              }
              return output;
          };
      }

      // format date using native date object
      function formatMoment(m, format) {
          if (!m.isValid()) {
              return m.localeData().invalidDate();
          }

          format = expandFormat(format, m.localeData());

          if (!formatFunctions[format]) {
              formatFunctions[format] = makeFormatFunction(format);
          }

          return formatFunctions[format](m);
      }

      function expandFormat(format, locale) {
          var i = 5;

          function replaceLongDateFormatTokens(input) {
              return locale.longDateFormat(input) || input;
          }

          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
              format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
              localFormattingTokens.lastIndex = 0;
              i -= 1;
          }

          return format;
      }

      var match1         = /\d/;            //       0 - 9
      var match2         = /\d\d/;          //      00 - 99
      var match3         = /\d{3}/;         //     000 - 999
      var match4         = /\d{4}/;         //    0000 - 9999
      var match6         = /[+-]?\d{6}/;    // -999999 - 999999
      var match1to2      = /\d\d?/;         //       0 - 99
      var match1to3      = /\d{1,3}/;       //       0 - 999
      var match1to4      = /\d{1,4}/;       //       0 - 9999
      var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

      var matchUnsigned  = /\d+/;           //       0 - inf
      var matchSigned    = /[+-]?\d+/;      //    -inf - inf

      var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

      var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

      // any word (or two) characters or numbers including two/three word month in arabic.
      var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

      var regexes = {};

      function addRegexToken (token, regex, strictRegex) {
          regexes[token] = typeof regex === 'function' ? regex : function (isStrict) {
              return (isStrict && strictRegex) ? strictRegex : regex;
          };
      }

      function getParseRegexForToken (token, config) {
          if (!hasOwnProp(regexes, token)) {
              return new RegExp(unescapeFormat(token));
          }

          return regexes[token](config._strict, config._locale);
      }

      // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      function unescapeFormat(s) {
          return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
          }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      var tokens = {};

      function addParseToken (token, callback) {
          var i, func = callback;
          if (typeof token === 'string') {
              token = [token];
          }
          if (typeof callback === 'number') {
              func = function (input, array) {
                  array[callback] = toInt(input);
              };
          }
          for (i = 0; i < token.length; i++) {
              tokens[token[i]] = func;
          }
      }

      function addWeekParseToken (token, callback) {
          addParseToken(token, function (input, array, config, token) {
              config._w = config._w || {};
              callback(input, config._w, config, token);
          });
      }

      function addTimeToArrayFromToken(token, input, config) {
          if (input != null && hasOwnProp(tokens, token)) {
              tokens[token](input, config._a, config, token);
          }
      }

      var YEAR = 0;
      var MONTH = 1;
      var DATE = 2;
      var HOUR = 3;
      var MINUTE = 4;
      var SECOND = 5;
      var MILLISECOND = 6;

      function daysInMonth(year, month) {
          return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      }

      // FORMATTING

      addFormatToken('M', ['MM', 2], 'Mo', function () {
          return this.month() + 1;
      });

      addFormatToken('MMM', 0, 0, function (format) {
          return this.localeData().monthsShort(this, format);
      });

      addFormatToken('MMMM', 0, 0, function (format) {
          return this.localeData().months(this, format);
      });

      // ALIASES

      addUnitAlias('month', 'M');

      // PARSING

      addRegexToken('M',    match1to2);
      addRegexToken('MM',   match1to2, match2);
      addRegexToken('MMM',  matchWord);
      addRegexToken('MMMM', matchWord);

      addParseToken(['M', 'MM'], function (input, array) {
          array[MONTH] = toInt(input) - 1;
      });

      addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
          var month = config._locale.monthsParse(input, token, config._strict);
          // if we didn't find a month name, mark the date as invalid.
          if (month != null) {
              array[MONTH] = month;
          } else {
              getParsingFlags(config).invalidMonth = input;
          }
      });

      // LOCALES

      var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
      function localeMonths (m) {
          return this._months[m.month()];
      }

      var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
      function localeMonthsShort (m) {
          return this._monthsShort[m.month()];
      }

      function localeMonthsParse (monthName, format, strict) {
          var i, mom, regex;

          if (!this._monthsParse) {
              this._monthsParse = [];
              this._longMonthsParse = [];
              this._shortMonthsParse = [];
          }

          for (i = 0; i < 12; i++) {
              // make the regex if we don't have it already
              mom = create_utc__createUTC([2000, i]);
              if (strict && !this._longMonthsParse[i]) {
                  this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                  this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
              }
              if (!strict && !this._monthsParse[i]) {
                  regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                  this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                  return i;
              } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                  return i;
              } else if (!strict && this._monthsParse[i].test(monthName)) {
                  return i;
              }
          }
      }

      // MOMENTS

      function setMonth (mom, value) {
          var dayOfMonth;

          // TODO: Move this out of here!
          if (typeof value === 'string') {
              value = mom.localeData().monthsParse(value);
              // TODO: Another silent failure?
              if (typeof value !== 'number') {
                  return mom;
              }
          }

          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
          return mom;
      }

      function getSetMonth (value) {
          if (value != null) {
              setMonth(this, value);
              utils_hooks__hooks.updateOffset(this, true);
              return this;
          } else {
              return get_set__get(this, 'Month');
          }
      }

      function getDaysInMonth () {
          return daysInMonth(this.year(), this.month());
      }

      function checkOverflow (m) {
          var overflow;
          var a = m._a;

          if (a && getParsingFlags(m).overflow === -2) {
              overflow =
                  a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                  a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                  a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                  a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                  a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                  a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                  -1;

              if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                  overflow = DATE;
              }

              getParsingFlags(m).overflow = overflow;
          }

          return m;
      }

      function warn(msg) {
          if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
              console.warn('Deprecation warning: ' + msg);
          }
      }

      function deprecate(msg, fn) {
          var firstTime = true,
              msgWithStack = msg + '\n' + (new Error()).stack;

          return extend(function () {
              if (firstTime) {
                  warn(msgWithStack);
                  firstTime = false;
              }
              return fn.apply(this, arguments);
          }, fn);
      }

      var deprecations = {};

      function deprecateSimple(name, msg) {
          if (!deprecations[name]) {
              warn(msg);
              deprecations[name] = true;
          }
      }

      utils_hooks__hooks.suppressDeprecationWarnings = false;

      var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

      var isoDates = [
          ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
          ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
          ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
          ['GGGG-[W]WW', /\d{4}-W\d{2}/],
          ['YYYY-DDD', /\d{4}-\d{3}/]
      ];

      // iso time formats and regexes
      var isoTimes = [
          ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
          ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
          ['HH:mm', /(T| )\d\d:\d\d/],
          ['HH', /(T| )\d\d/]
      ];

      var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

      // date from iso format
      function configFromISO(config) {
          var i, l,
              string = config._i,
              match = from_string__isoRegex.exec(string);

          if (match) {
              getParsingFlags(config).iso = true;
              for (i = 0, l = isoDates.length; i < l; i++) {
                  if (isoDates[i][1].exec(string)) {
                      // match[5] should be 'T' or undefined
                      config._f = isoDates[i][0] + (match[6] || ' ');
                      break;
                  }
              }
              for (i = 0, l = isoTimes.length; i < l; i++) {
                  if (isoTimes[i][1].exec(string)) {
                      config._f += isoTimes[i][0];
                      break;
                  }
              }
              if (string.match(matchOffset)) {
                  config._f += 'Z';
              }
              configFromStringAndFormat(config);
          } else {
              config._isValid = false;
          }
      }

      // date from iso format or fallback
      function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);

          if (matched !== null) {
              config._d = new Date(+matched[1]);
              return;
          }

          configFromISO(config);
          if (config._isValid === false) {
              delete config._isValid;
              utils_hooks__hooks.createFromInputFallback(config);
          }
      }

      utils_hooks__hooks.createFromInputFallback = deprecate(
          'moment construction falls back to js Date. This is ' +
          'discouraged and will be removed in upcoming major ' +
          'release. Please refer to ' +
          'https://github.com/moment/moment/issues/1407 for more info.',
          function (config) {
              config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
          }
      );

      function createDate (y, m, d, h, M, s, ms) {
          //can't just apply() to create a date:
          //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
          var date = new Date(y, m, d, h, M, s, ms);

          //the date constructor doesn't accept years < 1970
          if (y < 1970) {
              date.setFullYear(y);
          }
          return date;
      }

      function createUTCDate (y) {
          var date = new Date(Date.UTC.apply(null, arguments));
          if (y < 1970) {
              date.setUTCFullYear(y);
          }
          return date;
      }

      addFormatToken(0, ['YY', 2], 0, function () {
          return this.year() % 100;
      });

      addFormatToken(0, ['YYYY',   4],       0, 'year');
      addFormatToken(0, ['YYYYY',  5],       0, 'year');
      addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

      // ALIASES

      addUnitAlias('year', 'y');

      // PARSING

      addRegexToken('Y',      matchSigned);
      addRegexToken('YY',     match1to2, match2);
      addRegexToken('YYYY',   match1to4, match4);
      addRegexToken('YYYYY',  match1to6, match6);
      addRegexToken('YYYYYY', match1to6, match6);

      addParseToken(['YYYY', 'YYYYY', 'YYYYYY'], YEAR);
      addParseToken('YY', function (input, array) {
          array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
      });

      // HELPERS

      function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
      }

      function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      }

      // HOOKS

      utils_hooks__hooks.parseTwoDigitYear = function (input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
      };

      // MOMENTS

      var getSetYear = makeGetSet('FullYear', false);

      function getIsLeapYear () {
          return isLeapYear(this.year());
      }

      addFormatToken('w', ['ww', 2], 'wo', 'week');
      addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

      // ALIASES

      addUnitAlias('week', 'w');
      addUnitAlias('isoWeek', 'W');

      // PARSING

      addRegexToken('w',  match1to2);
      addRegexToken('ww', match1to2, match2);
      addRegexToken('W',  match1to2);
      addRegexToken('WW', match1to2, match2);

      addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
          week[token.substr(0, 1)] = toInt(input);
      });

      // HELPERS

      // firstDayOfWeek       0 = sun, 6 = sat
      //                      the day of the week that starts the week
      //                      (usually sunday or monday)
      // firstDayOfWeekOfYear 0 = sun, 6 = sat
      //                      the first week is the week that contains the first
      //                      of this day of the week
      //                      (eg. ISO weeks use thursday (4))
      function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
          var end = firstDayOfWeekOfYear - firstDayOfWeek,
              daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
              adjustedMoment;


          if (daysToDayOfWeek > end) {
              daysToDayOfWeek -= 7;
          }

          if (daysToDayOfWeek < end - 7) {
              daysToDayOfWeek += 7;
          }

          adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
          return {
              week: Math.ceil(adjustedMoment.dayOfYear() / 7),
              year: adjustedMoment.year()
          };
      }

      // LOCALES

      function localeWeek (mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
      }

      var defaultLocaleWeek = {
          dow : 0, // Sunday is the first day of the week.
          doy : 6  // The week that contains Jan 1st is the first week of the year.
      };

      function localeFirstDayOfWeek () {
          return this._week.dow;
      }

      function localeFirstDayOfYear () {
          return this._week.doy;
      }

      // MOMENTS

      function getSetWeek (input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, 'd');
      }

      function getSetISOWeek (input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, 'd');
      }

      addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

      // ALIASES

      addUnitAlias('dayOfYear', 'DDD');

      // PARSING

      addRegexToken('DDD',  match1to3);
      addRegexToken('DDDD', match3);
      addParseToken(['DDD', 'DDDD'], function (input, array, config) {
          config._dayOfYear = toInt(input);
      });

      // HELPERS

      //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
      function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
          var d = createUTCDate(year, 0, 1).getUTCDay();
          var daysToAdd;
          var dayOfYear;

          d = d === 0 ? 7 : d;
          weekday = weekday != null ? weekday : firstDayOfWeek;
          daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
          dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

          return {
              year      : dayOfYear > 0 ? year      : year - 1,
              dayOfYear : dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
          };
      }

      // MOMENTS

      function getSetDayOfYear (input) {
          var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
          return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
      }

      // Pick the first defined of two or three arguments.
      function defaults(a, b, c) {
          if (a != null) {
              return a;
          }
          if (b != null) {
              return b;
          }
          return c;
      }

      function currentDateArray(config) {
          var now = new Date();
          if (config._useUTC) {
              return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
          }
          return [now.getFullYear(), now.getMonth(), now.getDate()];
      }

      // convert an array to a date.
      // the array should mirror the parameters below
      // note: all values past the year are optional and will default to the lowest possible value.
      // [year, month, day , hour, minute, second, millisecond]
      function configFromArray (config) {
          var i, date, input = [], currentDate, yearToUse;

          if (config._d) {
              return;
          }

          currentDate = currentDateArray(config);

          //compute day of the year from weeks and weekdays
          if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
              dayOfYearFromWeekInfo(config);
          }

          //if the day of the year is set, figure out what it is
          if (config._dayOfYear) {
              yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

              if (config._dayOfYear > daysInYear(yearToUse)) {
                  getParsingFlags(config)._overflowDayOfYear = true;
              }

              date = createUTCDate(yearToUse, 0, config._dayOfYear);
              config._a[MONTH] = date.getUTCMonth();
              config._a[DATE] = date.getUTCDate();
          }

          // Default to current date.
          // * if no year, month, day of month are given, default to today
          // * if day of month is given, default month and year
          // * if month is given, default only year
          // * if year is given, don't default anything
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
              config._a[i] = input[i] = currentDate[i];
          }

          // Zero out whatever was not defaulted, including time
          for (; i < 7; i++) {
              config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
          }

          // Check for 24:00:00.000
          if (config._a[HOUR] === 24 &&
                  config._a[MINUTE] === 0 &&
                  config._a[SECOND] === 0 &&
                  config._a[MILLISECOND] === 0) {
              config._nextDay = true;
              config._a[HOUR] = 0;
          }

          config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
          // Apply timezone offset from input. The actual utcOffset can be changed
          // with parseZone.
          if (config._tzm != null) {
              config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }

          if (config._nextDay) {
              config._a[HOUR] = 24;
          }
      }

      function dayOfYearFromWeekInfo(config) {
          var w, weekYear, week, weekday, dow, doy, temp;

          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
              dow = 1;
              doy = 4;

              // TODO: We need to take the current isoWeekYear, but that depends on
              // how we interpret now (local, utc, fixed offset). So create
              // a now version of current config (take local/utc/offset flags, and
              // create now).
              weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
              week = defaults(w.W, 1);
              weekday = defaults(w.E, 1);
          } else {
              dow = config._locale._week.dow;
              doy = config._locale._week.doy;

              weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
              week = defaults(w.w, 1);

              if (w.d != null) {
                  // weekday -- low day numbers are considered next week
                  weekday = w.d;
                  if (weekday < dow) {
                      ++week;
                  }
              } else if (w.e != null) {
                  // local weekday -- counting starts from begining of week
                  weekday = w.e + dow;
              } else {
                  // default to begining of week
                  weekday = dow;
              }
          }
          temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
      }

      utils_hooks__hooks.ISO_8601 = function () {};

      // date from string and format string
      function configFromStringAndFormat(config) {
          // TODO: Move this to another part of the creation flow to prevent circular deps
          if (config._f === utils_hooks__hooks.ISO_8601) {
              configFromISO(config);
              return;
          }

          config._a = [];
          getParsingFlags(config).empty = true;

          // This array is used to make a Date, either with `new Date` or `Date.UTC`
          var string = '' + config._i,
              i, parsedInput, tokens, token, skipped,
              stringLength = string.length,
              totalParsedInputLength = 0;

          tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

          for (i = 0; i < tokens.length; i++) {
              token = tokens[i];
              parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
              if (parsedInput) {
                  skipped = string.substr(0, string.indexOf(parsedInput));
                  if (skipped.length > 0) {
                      getParsingFlags(config).unusedInput.push(skipped);
                  }
                  string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                  totalParsedInputLength += parsedInput.length;
              }
              // don't parse if it's not a known token
              if (formatTokenFunctions[token]) {
                  if (parsedInput) {
                      getParsingFlags(config).empty = false;
                  }
                  else {
                      getParsingFlags(config).unusedTokens.push(token);
                  }
                  addTimeToArrayFromToken(token, parsedInput, config);
              }
              else if (config._strict && !parsedInput) {
                  getParsingFlags(config).unusedTokens.push(token);
              }
          }

          // add remaining unparsed input length to the string
          getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
          if (string.length > 0) {
              getParsingFlags(config).unusedInput.push(string);
          }

          // clear _12h flag if hour is <= 12
          if (getParsingFlags(config).bigHour === true &&
                  config._a[HOUR] <= 12 &&
                  config._a[HOUR] > 0) {
              getParsingFlags(config).bigHour = undefined;
          }
          // handle meridiem
          config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

          configFromArray(config);
          checkOverflow(config);
      }


      function meridiemFixWrap (locale, hour, meridiem) {
          var isPm;

          if (meridiem == null) {
              // nothing to do
              return hour;
          }
          if (locale.meridiemHour != null) {
              return locale.meridiemHour(hour, meridiem);
          } else if (locale.isPM != null) {
              // Fallback
              isPm = locale.isPM(meridiem);
              if (isPm && hour < 12) {
                  hour += 12;
              }
              if (!isPm && hour === 12) {
                  hour = 0;
              }
              return hour;
          } else {
              // this is not supposed to happen
              return hour;
          }
      }

      function configFromStringAndArray(config) {
          var tempConfig,
              bestMoment,

              scoreToBeat,
              i,
              currentScore;

          if (config._f.length === 0) {
              getParsingFlags(config).invalidFormat = true;
              config._d = new Date(NaN);
              return;
          }

          for (i = 0; i < config._f.length; i++) {
              currentScore = 0;
              tempConfig = copyConfig({}, config);
              if (config._useUTC != null) {
                  tempConfig._useUTC = config._useUTC;
              }
              tempConfig._f = config._f[i];
              configFromStringAndFormat(tempConfig);

              if (!valid__isValid(tempConfig)) {
                  continue;
              }

              // if there is any input that was not parsed add a penalty for that format
              currentScore += getParsingFlags(tempConfig).charsLeftOver;

              //or tokens
              currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

              getParsingFlags(tempConfig).score = currentScore;

              if (scoreToBeat == null || currentScore < scoreToBeat) {
                  scoreToBeat = currentScore;
                  bestMoment = tempConfig;
              }
          }

          extend(config, bestMoment || tempConfig);
      }

      function configFromObject(config) {
          if (config._d) {
              return;
          }

          var i = normalizeObjectUnits(config._i);
          config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

          configFromArray(config);
      }

      function createFromConfig (config) {
          var input = config._i,
              format = config._f,
              res;

          config._locale = config._locale || locale_locales__getLocale(config._l);

          if (input === null || (format === undefined && input === '')) {
              return valid__createInvalid({nullInput: true});
          }

          if (typeof input === 'string') {
              config._i = input = config._locale.preparse(input);
          }

          if (isMoment(input)) {
              return new Moment(checkOverflow(input));
          } else if (isArray(format)) {
              configFromStringAndArray(config);
          } else if (format) {
              configFromStringAndFormat(config);
          } else if (isDate(input)) {
              config._d = input;
          } else {
              configFromInput(config);
          }

          res = new Moment(checkOverflow(config));
          if (res._nextDay) {
              // Adding is smart enough around DST
              res.add(1, 'd');
              res._nextDay = undefined;
          }

          return res;
      }

      function configFromInput(config) {
          var input = config._i;
          if (input === undefined) {
              config._d = new Date();
          } else if (isDate(input)) {
              config._d = new Date(+input);
          } else if (typeof input === 'string') {
              configFromString(config);
          } else if (isArray(input)) {
              config._a = map(input.slice(0), function (obj) {
                  return parseInt(obj, 10);
              });
              configFromArray(config);
          } else if (typeof(input) === 'object') {
              configFromObject(config);
          } else if (typeof(input) === 'number') {
              // from milliseconds
              config._d = new Date(input);
          } else {
              utils_hooks__hooks.createFromInputFallback(config);
          }
      }

      function createLocalOrUTC (input, format, locale, strict, isUTC) {
          var c = {};

          if (typeof(locale) === 'boolean') {
              strict = locale;
              locale = undefined;
          }
          // object construction must be done this way.
          // https://github.com/moment/moment/issues/1423
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;

          return createFromConfig(c);
      }

      function local__createLocal (input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, false);
      }

      var prototypeMin = deprecate(
           'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
           function () {
               var other = local__createLocal.apply(null, arguments);
               return other < this ? this : other;
           }
       );

      var prototypeMax = deprecate(
          'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
          function () {
              var other = local__createLocal.apply(null, arguments);
              return other > this ? this : other;
          }
      );

      // Pick a moment m from moments so that m[fn](other) is true for all
      // other. This relies on the function fn to be transitive.
      //
      // moments should either be an array of moment objects or an array, whose
      // first element is an array of moment objects.
      function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
              moments = moments[0];
          }
          if (!moments.length) {
              return local__createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
              if (moments[i][fn](res)) {
                  res = moments[i];
              }
          }
          return res;
      }

      // TODO: Use [].sort instead?
      function min () {
          var args = [].slice.call(arguments, 0);

          return pickBy('isBefore', args);
      }

      function max () {
          var args = [].slice.call(arguments, 0);

          return pickBy('isAfter', args);
      }

      function Duration (duration) {
          var normalizedInput = normalizeObjectUnits(duration),
              years = normalizedInput.year || 0,
              quarters = normalizedInput.quarter || 0,
              months = normalizedInput.month || 0,
              weeks = normalizedInput.week || 0,
              days = normalizedInput.day || 0,
              hours = normalizedInput.hour || 0,
              minutes = normalizedInput.minute || 0,
              seconds = normalizedInput.second || 0,
              milliseconds = normalizedInput.millisecond || 0;

          // representation for dateAddRemove
          this._milliseconds = +milliseconds +
              seconds * 1e3 + // 1000
              minutes * 6e4 + // 1000 * 60
              hours * 36e5; // 1000 * 60 * 60
          // Because of dateAddRemove treats 24 hours as different from a
          // day when working around DST, we need to store them separately
          this._days = +days +
              weeks * 7;
          // It is impossible translate months into days without knowing
          // which months you are are talking about, so we have to store
          // it separately.
          this._months = +months +
              quarters * 3 +
              years * 12;

          this._data = {};

          this._locale = locale_locales__getLocale();

          this._bubble();
      }

      function isDuration (obj) {
          return obj instanceof Duration;
      }

      function offset (token, separator) {
          addFormatToken(token, 0, 0, function () {
              var offset = this.utcOffset();
              var sign = '+';
              if (offset < 0) {
                  offset = -offset;
                  sign = '-';
              }
              return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
          });
      }

      offset('Z', ':');
      offset('ZZ', '');

      // PARSING

      addRegexToken('Z',  matchOffset);
      addRegexToken('ZZ', matchOffset);
      addParseToken(['Z', 'ZZ'], function (input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(input);
      });

      // HELPERS

      // timezone chunker
      // '+10:00' > ['10',  '00']
      // '-1530'  > ['-15', '30']
      var chunkOffset = /([\+\-]|\d\d)/gi;

      function offsetFromString(string) {
          var matches = ((string || '').match(matchOffset) || []);
          var chunk   = matches[matches.length - 1] || [];
          var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
          var minutes = +(parts[1] * 60) + toInt(parts[2]);

          return parts[0] === '+' ? minutes : -minutes;
      }

      // Return a moment from input, that is local/utc/zone equivalent to model.
      function cloneWithOffset(input, model) {
          var res, diff;
          if (model._isUTC) {
              res = model.clone();
              diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
              // Use low-level api, because this fn is low-level api.
              res._d.setTime(+res._d + diff);
              utils_hooks__hooks.updateOffset(res, false);
              return res;
          } else {
              return local__createLocal(input).local();
          }
          return model._isUTC ? local__createLocal(input).zone(model._offset || 0) : local__createLocal(input).local();
      }

      function getDateOffset (m) {
          // On Firefox.24 Date#getTimezoneOffset returns a floating point.
          // https://github.com/moment/moment/pull/1871
          return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
      }

      // HOOKS

      // This function will be called whenever a moment is mutated.
      // It is intended to keep the offset in sync with the timezone.
      utils_hooks__hooks.updateOffset = function () {};

      // MOMENTS

      // keepLocalTime = true means only change the timezone, without
      // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
      // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
      // +0200, so we adjust the time as needed, to be valid.
      //
      // Keeping the time actually adds/subtracts (one hour)
      // from the actual represented time. That is why we call updateOffset
      // a second time. In case it wants us to change the offset again
      // _changeInProgress == true case, then we have to adjust, because
      // there is no such time in the given timezone.
      function getSetOffset (input, keepLocalTime) {
          var offset = this._offset || 0,
              localAdjust;
          if (input != null) {
              if (typeof input === 'string') {
                  input = offsetFromString(input);
              }
              if (Math.abs(input) < 16) {
                  input = input * 60;
              }
              if (!this._isUTC && keepLocalTime) {
                  localAdjust = getDateOffset(this);
              }
              this._offset = input;
              this._isUTC = true;
              if (localAdjust != null) {
                  this.add(localAdjust, 'm');
              }
              if (offset !== input) {
                  if (!keepLocalTime || this._changeInProgress) {
                      add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                  } else if (!this._changeInProgress) {
                      this._changeInProgress = true;
                      utils_hooks__hooks.updateOffset(this, true);
                      this._changeInProgress = null;
                  }
              }
              return this;
          } else {
              return this._isUTC ? offset : getDateOffset(this);
          }
      }

      function getSetZone (input, keepLocalTime) {
          if (input != null) {
              if (typeof input !== 'string') {
                  input = -input;
              }

              this.utcOffset(input, keepLocalTime);

              return this;
          } else {
              return -this.utcOffset();
          }
      }

      function setOffsetToUTC (keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
      }

      function setOffsetToLocal (keepLocalTime) {
          if (this._isUTC) {
              this.utcOffset(0, keepLocalTime);
              this._isUTC = false;

              if (keepLocalTime) {
                  this.subtract(getDateOffset(this), 'm');
              }
          }
          return this;
      }

      function setOffsetToParsedOffset () {
          if (this._tzm) {
              this.utcOffset(this._tzm);
          } else if (typeof this._i === 'string') {
              this.utcOffset(offsetFromString(this._i));
          }
          return this;
      }

      function hasAlignedHourOffset (input) {
          if (!input) {
              input = 0;
          }
          else {
              input = local__createLocal(input).utcOffset();
          }

          return (this.utcOffset() - input) % 60 === 0;
      }

      function isDaylightSavingTime () {
          return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
          );
      }

      function isDaylightSavingTimeShifted () {
          if (this._a) {
              var other = this._isUTC ? create_utc__createUTC(this._a) : local__createLocal(this._a);
              return this.isValid() && compareArrays(this._a, other.toArray()) > 0;
          }

          return false;
      }

      function isLocal () {
          return !this._isUTC;
      }

      function isUtcOffset () {
          return this._isUTC;
      }

      function isUtc () {
          return this._isUTC && this._offset === 0;
      }

      var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

      // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
      // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
      var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

      function create__createDuration (input, key) {
          var duration = input,
              // matching against regexp is expensive, do it on demand
              match = null,
              sign,
              ret,
              diffRes;

          if (isDuration(input)) {
              duration = {
                  ms : input._milliseconds,
                  d  : input._days,
                  M  : input._months
              };
          } else if (typeof input === 'number') {
              duration = {};
              if (key) {
                  duration[key] = input;
              } else {
                  duration.milliseconds = input;
              }
          } else if (!!(match = aspNetRegex.exec(input))) {
              sign = (match[1] === '-') ? -1 : 1;
              duration = {
                  y  : 0,
                  d  : toInt(match[DATE])        * sign,
                  h  : toInt(match[HOUR])        * sign,
                  m  : toInt(match[MINUTE])      * sign,
                  s  : toInt(match[SECOND])      * sign,
                  ms : toInt(match[MILLISECOND]) * sign
              };
          } else if (!!(match = create__isoRegex.exec(input))) {
              sign = (match[1] === '-') ? -1 : 1;
              duration = {
                  y : parseIso(match[2], sign),
                  M : parseIso(match[3], sign),
                  d : parseIso(match[4], sign),
                  h : parseIso(match[5], sign),
                  m : parseIso(match[6], sign),
                  s : parseIso(match[7], sign),
                  w : parseIso(match[8], sign)
              };
          } else if (duration == null) {// checks for null or undefined
              duration = {};
          } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
              diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

              duration = {};
              duration.ms = diffRes.milliseconds;
              duration.M = diffRes.months;
          }

          ret = new Duration(duration);

          if (isDuration(input) && hasOwnProp(input, '_locale')) {
              ret._locale = input._locale;
          }

          return ret;
      }

      create__createDuration.fn = Duration.prototype;

      function parseIso (inp, sign) {
          // We'd normally use ~~inp for this, but unfortunately it also
          // converts floats to ints.
          // inp may be undefined, so careful calling replace on it.
          var res = inp && parseFloat(inp.replace(',', '.'));
          // apply sign while we're at it
          return (isNaN(res) ? 0 : res) * sign;
      }

      function positiveMomentsDifference(base, other) {
          var res = {milliseconds: 0, months: 0};

          res.months = other.month() - base.month() +
              (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, 'M').isAfter(other)) {
              --res.months;
          }

          res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

          return res;
      }

      function momentsDifference(base, other) {
          var res;
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
              res = positiveMomentsDifference(base, other);
          } else {
              res = positiveMomentsDifference(other, base);
              res.milliseconds = -res.milliseconds;
              res.months = -res.months;
          }

          return res;
      }

      function createAdder(direction, name) {
          return function (val, period) {
              var dur, tmp;
              //invert the arguments, but complain about it
              if (period !== null && !isNaN(+period)) {
                  deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                  tmp = val; val = period; period = tmp;
              }

              val = typeof val === 'string' ? +val : val;
              dur = create__createDuration(val, period);
              add_subtract__addSubtract(this, dur, direction);
              return this;
          };
      }

      function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
              days = duration._days,
              months = duration._months;
          updateOffset = updateOffset == null ? true : updateOffset;

          if (milliseconds) {
              mom._d.setTime(+mom._d + milliseconds * isAdding);
          }
          if (days) {
              get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
          }
          if (months) {
              setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
          }
          if (updateOffset) {
              utils_hooks__hooks.updateOffset(mom, days || months);
          }
      }

      var add_subtract__add      = createAdder(1, 'add');
      var add_subtract__subtract = createAdder(-1, 'subtract');

      function moment_calendar__calendar (time) {
          // We want to compare the start of today, vs this.
          // Getting start-of-today depends on whether we're local/utc/offset or not.
          var now = time || local__createLocal(),
              sod = cloneWithOffset(now, this).startOf('day'),
              diff = this.diff(sod, 'days', true),
              format = diff < -6 ? 'sameElse' :
                  diff < -1 ? 'lastWeek' :
                  diff < 0 ? 'lastDay' :
                  diff < 1 ? 'sameDay' :
                  diff < 2 ? 'nextDay' :
                  diff < 7 ? 'nextWeek' : 'sameElse';
          return this.format(this.localeData().calendar(format, this, local__createLocal(now)));
      }

      function clone () {
          return new Moment(this);
      }

      function isAfter (input, units) {
          var inputMs;
          units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
          if (units === 'millisecond') {
              input = isMoment(input) ? input : local__createLocal(input);
              return +this > +input;
          } else {
              inputMs = isMoment(input) ? +input : +local__createLocal(input);
              return inputMs < +this.clone().startOf(units);
          }
      }

      function isBefore (input, units) {
          var inputMs;
          units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
          if (units === 'millisecond') {
              input = isMoment(input) ? input : local__createLocal(input);
              return +this < +input;
          } else {
              inputMs = isMoment(input) ? +input : +local__createLocal(input);
              return +this.clone().endOf(units) < inputMs;
          }
      }

      function isBetween (from, to, units) {
          return this.isAfter(from, units) && this.isBefore(to, units);
      }

      function isSame (input, units) {
          var inputMs;
          units = normalizeUnits(units || 'millisecond');
          if (units === 'millisecond') {
              input = isMoment(input) ? input : local__createLocal(input);
              return +this === +input;
          } else {
              inputMs = +local__createLocal(input);
              return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
          }
      }

      function absFloor (number) {
          if (number < 0) {
              return Math.ceil(number);
          } else {
              return Math.floor(number);
          }
      }

      function diff (input, units, asFloat) {
          var that = cloneWithOffset(input, this),
              zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
              delta, output;

          units = normalizeUnits(units);

          if (units === 'year' || units === 'month' || units === 'quarter') {
              output = monthDiff(this, that);
              if (units === 'quarter') {
                  output = output / 3;
              } else if (units === 'year') {
                  output = output / 12;
              }
          } else {
              delta = this - that;
              output = units === 'second' ? delta / 1e3 : // 1000
                  units === 'minute' ? delta / 6e4 : // 1000 * 60
                  units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                  units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                  units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                  delta;
          }
          return asFloat ? output : absFloor(output);
      }

      function monthDiff (a, b) {
          // difference in months
          var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
              // b is in (anchor - 1 month, anchor + 1 month)
              anchor = a.clone().add(wholeMonthDiff, 'months'),
              anchor2, adjust;

          if (b - anchor < 0) {
              anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor - anchor2);
          } else {
              anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
              // linear across the month
              adjust = (b - anchor) / (anchor2 - anchor);
          }

          return -(wholeMonthDiff + adjust);
      }

      utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

      function toString () {
          return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      }

      function moment_format__toISOString () {
          var m = this.clone().utc();
          if (0 < m.year() && m.year() <= 9999) {
              if ('function' === typeof Date.prototype.toISOString) {
                  // native implementation is ~50x faster, use it when we can
                  return this.toDate().toISOString();
              } else {
                  return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
              }
          } else {
              return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
          }
      }

      function format (inputString) {
          var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
          return this.localeData().postformat(output);
      }

      function from (time, withoutSuffix) {
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }
          return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
      }

      function fromNow (withoutSuffix) {
          return this.from(local__createLocal(), withoutSuffix);
      }

      function to (time, withoutSuffix) {
          if (!this.isValid()) {
              return this.localeData().invalidDate();
          }
          return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
      }

      function toNow (withoutSuffix) {
          return this.to(local__createLocal(), withoutSuffix);
      }

      function locale (key) {
          var newLocaleData;

          if (key === undefined) {
              return this._locale._abbr;
          } else {
              newLocaleData = locale_locales__getLocale(key);
              if (newLocaleData != null) {
                  this._locale = newLocaleData;
              }
              return this;
          }
      }

      var lang = deprecate(
          'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
          function (key) {
              if (key === undefined) {
                  return this.localeData();
              } else {
                  return this.locale(key);
              }
          }
      );

      function localeData () {
          return this._locale;
      }

      function startOf (units) {
          units = normalizeUnits(units);
          // the following switch intentionally omits break keywords
          // to utilize falling through the cases.
          switch (units) {
          case 'year':
              this.month(0);
              /* falls through */
          case 'quarter':
          case 'month':
              this.date(1);
              /* falls through */
          case 'week':
          case 'isoWeek':
          case 'day':
              this.hours(0);
              /* falls through */
          case 'hour':
              this.minutes(0);
              /* falls through */
          case 'minute':
              this.seconds(0);
              /* falls through */
          case 'second':
              this.milliseconds(0);
          }

          // weeks are a special case
          if (units === 'week') {
              this.weekday(0);
          }
          if (units === 'isoWeek') {
              this.isoWeekday(1);
          }

          // quarters are also special
          if (units === 'quarter') {
              this.month(Math.floor(this.month() / 3) * 3);
          }

          return this;
      }

      function endOf (units) {
          units = normalizeUnits(units);
          if (units === undefined || units === 'millisecond') {
              return this;
          }
          return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
      }

      function to_type__valueOf () {
          return +this._d - ((this._offset || 0) * 60000);
      }

      function unix () {
          return Math.floor(+this / 1000);
      }

      function toDate () {
          return this._offset ? new Date(+this) : this._d;
      }

      function toArray () {
          var m = this;
          return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
      }

      function moment_valid__isValid () {
          return valid__isValid(this);
      }

      function parsingFlags () {
          return extend({}, getParsingFlags(this));
      }

      function invalidAt () {
          return getParsingFlags(this).overflow;
      }

      addFormatToken(0, ['gg', 2], 0, function () {
          return this.weekYear() % 100;
      });

      addFormatToken(0, ['GG', 2], 0, function () {
          return this.isoWeekYear() % 100;
      });

      function addWeekYearFormatToken (token, getter) {
          addFormatToken(0, [token, token.length], 0, getter);
      }

      addWeekYearFormatToken('gggg',     'weekYear');
      addWeekYearFormatToken('ggggg',    'weekYear');
      addWeekYearFormatToken('GGGG',  'isoWeekYear');
      addWeekYearFormatToken('GGGGG', 'isoWeekYear');

      // ALIASES

      addUnitAlias('weekYear', 'gg');
      addUnitAlias('isoWeekYear', 'GG');

      // PARSING

      addRegexToken('G',      matchSigned);
      addRegexToken('g',      matchSigned);
      addRegexToken('GG',     match1to2, match2);
      addRegexToken('gg',     match1to2, match2);
      addRegexToken('GGGG',   match1to4, match4);
      addRegexToken('gggg',   match1to4, match4);
      addRegexToken('GGGGG',  match1to6, match6);
      addRegexToken('ggggg',  match1to6, match6);

      addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
          week[token.substr(0, 2)] = toInt(input);
      });

      addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
          week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
      });

      // HELPERS

      function weeksInYear(year, dow, doy) {
          return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
      }

      // MOMENTS

      function getSetWeekYear (input) {
          var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
          return input == null ? year : this.add((input - year), 'y');
      }

      function getSetISOWeekYear (input) {
          var year = weekOfYear(this, 1, 4).year;
          return input == null ? year : this.add((input - year), 'y');
      }

      function getISOWeeksInYear () {
          return weeksInYear(this.year(), 1, 4);
      }

      function getWeeksInYear () {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
      }

      addFormatToken('Q', 0, 0, 'quarter');

      // ALIASES

      addUnitAlias('quarter', 'Q');

      // PARSING

      addRegexToken('Q', match1);
      addParseToken('Q', function (input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
      });

      // MOMENTS

      function getSetQuarter (input) {
          return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
      }

      addFormatToken('D', ['DD', 2], 'Do', 'date');

      // ALIASES

      addUnitAlias('date', 'D');

      // PARSING

      addRegexToken('D',  match1to2);
      addRegexToken('DD', match1to2, match2);
      addRegexToken('Do', function (isStrict, locale) {
          return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
      });

      addParseToken(['D', 'DD'], DATE);
      addParseToken('Do', function (input, array) {
          array[DATE] = toInt(input.match(match1to2)[0], 10);
      });

      // MOMENTS

      var getSetDayOfMonth = makeGetSet('Date', true);

      addFormatToken('d', 0, 'do', 'day');

      addFormatToken('dd', 0, 0, function (format) {
          return this.localeData().weekdaysMin(this, format);
      });

      addFormatToken('ddd', 0, 0, function (format) {
          return this.localeData().weekdaysShort(this, format);
      });

      addFormatToken('dddd', 0, 0, function (format) {
          return this.localeData().weekdays(this, format);
      });

      addFormatToken('e', 0, 0, 'weekday');
      addFormatToken('E', 0, 0, 'isoWeekday');

      // ALIASES

      addUnitAlias('day', 'd');
      addUnitAlias('weekday', 'e');
      addUnitAlias('isoWeekday', 'E');

      // PARSING

      addRegexToken('d',    match1to2);
      addRegexToken('e',    match1to2);
      addRegexToken('E',    match1to2);
      addRegexToken('dd',   matchWord);
      addRegexToken('ddd',  matchWord);
      addRegexToken('dddd', matchWord);

      addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
          var weekday = config._locale.weekdaysParse(input);
          // if we didn't get a weekday name, mark the date as invalid
          if (weekday != null) {
              week.d = weekday;
          } else {
              getParsingFlags(config).invalidWeekday = input;
          }
      });

      addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
          week[token] = toInt(input);
      });

      // HELPERS

      function parseWeekday(input, locale) {
          if (typeof input === 'string') {
              if (!isNaN(input)) {
                  input = parseInt(input, 10);
              }
              else {
                  input = locale.weekdaysParse(input);
                  if (typeof input !== 'number') {
                      return null;
                  }
              }
          }
          return input;
      }

      // LOCALES

      var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
      function localeWeekdays (m) {
          return this._weekdays[m.day()];
      }

      var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
      function localeWeekdaysShort (m) {
          return this._weekdaysShort[m.day()];
      }

      var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
      function localeWeekdaysMin (m) {
          return this._weekdaysMin[m.day()];
      }

      function localeWeekdaysParse (weekdayName) {
          var i, mom, regex;

          if (!this._weekdaysParse) {
              this._weekdaysParse = [];
          }

          for (i = 0; i < 7; i++) {
              // make the regex if we don't have it already
              if (!this._weekdaysParse[i]) {
                  mom = local__createLocal([2000, 1]).day(i);
                  regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                  this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
              }
              // test the regex
              if (this._weekdaysParse[i].test(weekdayName)) {
                  return i;
              }
          }
      }

      // MOMENTS

      function getSetDayOfWeek (input) {
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
              input = parseWeekday(input, this.localeData());
              return this.add(input - day, 'd');
          } else {
              return day;
          }
      }

      function getSetLocaleDayOfWeek (input) {
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, 'd');
      }

      function getSetISODayOfWeek (input) {
          // behaves the same as moment#day except
          // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
          // as a setter, sunday should belong to the previous week.
          return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
      }

      addFormatToken('H', ['HH', 2], 0, 'hour');
      addFormatToken('h', ['hh', 2], 0, function () {
          return this.hours() % 12 || 12;
      });

      function meridiem (token, lowercase) {
          addFormatToken(token, 0, 0, function () {
              return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
          });
      }

      meridiem('a', true);
      meridiem('A', false);

      // ALIASES

      addUnitAlias('hour', 'h');

      // PARSING

      function matchMeridiem (isStrict, locale) {
          return locale._meridiemParse;
      }

      addRegexToken('a',  matchMeridiem);
      addRegexToken('A',  matchMeridiem);
      addRegexToken('H',  match1to2);
      addRegexToken('h',  match1to2);
      addRegexToken('HH', match1to2, match2);
      addRegexToken('hh', match1to2, match2);

      addParseToken(['H', 'HH'], HOUR);
      addParseToken(['a', 'A'], function (input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
      });
      addParseToken(['h', 'hh'], function (input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
      });

      // LOCALES

      function localeIsPM (input) {
          // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
          // Using charAt should be more compatible.
          return ((input + '').toLowerCase().charAt(0) === 'p');
      }

      var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
      function localeMeridiem (hours, minutes, isLower) {
          if (hours > 11) {
              return isLower ? 'pm' : 'PM';
          } else {
              return isLower ? 'am' : 'AM';
          }
      }


      // MOMENTS

      // Setting the hour should keep the time, because the user explicitly
      // specified which hour he wants. So trying to maintain the same hour (in
      // a new timezone) makes sense. Adding/subtracting hours does not follow
      // this rule.
      var getSetHour = makeGetSet('Hours', true);

      addFormatToken('m', ['mm', 2], 0, 'minute');

      // ALIASES

      addUnitAlias('minute', 'm');

      // PARSING

      addRegexToken('m',  match1to2);
      addRegexToken('mm', match1to2, match2);
      addParseToken(['m', 'mm'], MINUTE);

      // MOMENTS

      var getSetMinute = makeGetSet('Minutes', false);

      addFormatToken('s', ['ss', 2], 0, 'second');

      // ALIASES

      addUnitAlias('second', 's');

      // PARSING

      addRegexToken('s',  match1to2);
      addRegexToken('ss', match1to2, match2);
      addParseToken(['s', 'ss'], SECOND);

      // MOMENTS

      var getSetSecond = makeGetSet('Seconds', false);

      addFormatToken('S', 0, 0, function () {
          return ~~(this.millisecond() / 100);
      });

      addFormatToken(0, ['SS', 2], 0, function () {
          return ~~(this.millisecond() / 10);
      });

      function millisecond__milliseconds (token) {
          addFormatToken(0, [token, 3], 0, 'millisecond');
      }

      millisecond__milliseconds('SSS');
      millisecond__milliseconds('SSSS');

      // ALIASES

      addUnitAlias('millisecond', 'ms');

      // PARSING

      addRegexToken('S',    match1to3, match1);
      addRegexToken('SS',   match1to3, match2);
      addRegexToken('SSS',  match1to3, match3);
      addRegexToken('SSSS', matchUnsigned);
      addParseToken(['S', 'SS', 'SSS', 'SSSS'], function (input, array) {
          array[MILLISECOND] = toInt(('0.' + input) * 1000);
      });

      // MOMENTS

      var getSetMillisecond = makeGetSet('Milliseconds', false);

      addFormatToken('z',  0, 0, 'zoneAbbr');
      addFormatToken('zz', 0, 0, 'zoneName');

      // MOMENTS

      function getZoneAbbr () {
          return this._isUTC ? 'UTC' : '';
      }

      function getZoneName () {
          return this._isUTC ? 'Coordinated Universal Time' : '';
      }

      var momentPrototype__proto = Moment.prototype;

      momentPrototype__proto.add          = add_subtract__add;
      momentPrototype__proto.calendar     = moment_calendar__calendar;
      momentPrototype__proto.clone        = clone;
      momentPrototype__proto.diff         = diff;
      momentPrototype__proto.endOf        = endOf;
      momentPrototype__proto.format       = format;
      momentPrototype__proto.from         = from;
      momentPrototype__proto.fromNow      = fromNow;
      momentPrototype__proto.to           = to;
      momentPrototype__proto.toNow        = toNow;
      momentPrototype__proto.get          = getSet;
      momentPrototype__proto.invalidAt    = invalidAt;
      momentPrototype__proto.isAfter      = isAfter;
      momentPrototype__proto.isBefore     = isBefore;
      momentPrototype__proto.isBetween    = isBetween;
      momentPrototype__proto.isSame       = isSame;
      momentPrototype__proto.isValid      = moment_valid__isValid;
      momentPrototype__proto.lang         = lang;
      momentPrototype__proto.locale       = locale;
      momentPrototype__proto.localeData   = localeData;
      momentPrototype__proto.max          = prototypeMax;
      momentPrototype__proto.min          = prototypeMin;
      momentPrototype__proto.parsingFlags = parsingFlags;
      momentPrototype__proto.set          = getSet;
      momentPrototype__proto.startOf      = startOf;
      momentPrototype__proto.subtract     = add_subtract__subtract;
      momentPrototype__proto.toArray      = toArray;
      momentPrototype__proto.toDate       = toDate;
      momentPrototype__proto.toISOString  = moment_format__toISOString;
      momentPrototype__proto.toJSON       = moment_format__toISOString;
      momentPrototype__proto.toString     = toString;
      momentPrototype__proto.unix         = unix;
      momentPrototype__proto.valueOf      = to_type__valueOf;

      // Year
      momentPrototype__proto.year       = getSetYear;
      momentPrototype__proto.isLeapYear = getIsLeapYear;

      // Week Year
      momentPrototype__proto.weekYear    = getSetWeekYear;
      momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

      // Quarter
      momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

      // Month
      momentPrototype__proto.month       = getSetMonth;
      momentPrototype__proto.daysInMonth = getDaysInMonth;

      // Week
      momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
      momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
      momentPrototype__proto.weeksInYear    = getWeeksInYear;
      momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

      // Day
      momentPrototype__proto.date       = getSetDayOfMonth;
      momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
      momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
      momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
      momentPrototype__proto.dayOfYear  = getSetDayOfYear;

      // Hour
      momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

      // Minute
      momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

      // Second
      momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

      // Millisecond
      momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

      // Offset
      momentPrototype__proto.utcOffset            = getSetOffset;
      momentPrototype__proto.utc                  = setOffsetToUTC;
      momentPrototype__proto.local                = setOffsetToLocal;
      momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
      momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
      momentPrototype__proto.isDST                = isDaylightSavingTime;
      momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
      momentPrototype__proto.isLocal              = isLocal;
      momentPrototype__proto.isUtcOffset          = isUtcOffset;
      momentPrototype__proto.isUtc                = isUtc;
      momentPrototype__proto.isUTC                = isUtc;

      // Timezone
      momentPrototype__proto.zoneAbbr = getZoneAbbr;
      momentPrototype__proto.zoneName = getZoneName;

      // Deprecations
      momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
      momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
      momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
      momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

      var momentPrototype = momentPrototype__proto;

      function moment__createUnix (input) {
          return local__createLocal(input * 1000);
      }

      function moment__createInZone () {
          return local__createLocal.apply(null, arguments).parseZone();
      }

      var defaultCalendar = {
          sameDay : '[Today at] LT',
          nextDay : '[Tomorrow at] LT',
          nextWeek : 'dddd [at] LT',
          lastDay : '[Yesterday at] LT',
          lastWeek : '[Last] dddd [at] LT',
          sameElse : 'L'
      };

      function locale_calendar__calendar (key, mom, now) {
          var output = this._calendar[key];
          return typeof output === 'function' ? output.call(mom, now) : output;
      }

      var defaultLongDateFormat = {
          LTS  : 'h:mm:ss A',
          LT   : 'h:mm A',
          L    : 'MM/DD/YYYY',
          LL   : 'MMMM D, YYYY',
          LLL  : 'MMMM D, YYYY LT',
          LLLL : 'dddd, MMMM D, YYYY LT'
      };

      function longDateFormat (key) {
          var output = this._longDateFormat[key];
          if (!output && this._longDateFormat[key.toUpperCase()]) {
              output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                  return val.slice(1);
              });
              this._longDateFormat[key] = output;
          }
          return output;
      }

      var defaultInvalidDate = 'Invalid date';

      function invalidDate () {
          return this._invalidDate;
      }

      var defaultOrdinal = '%d';
      var defaultOrdinalParse = /\d{1,2}/;

      function ordinal (number) {
          return this._ordinal.replace('%d', number);
      }

      function preParsePostFormat (string) {
          return string;
      }

      var defaultRelativeTime = {
          future : 'in %s',
          past   : '%s ago',
          s  : 'a few seconds',
          m  : 'a minute',
          mm : '%d minutes',
          h  : 'an hour',
          hh : '%d hours',
          d  : 'a day',
          dd : '%d days',
          M  : 'a month',
          MM : '%d months',
          y  : 'a year',
          yy : '%d years'
      };

      function relative__relativeTime (number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return (typeof output === 'function') ?
              output(number, withoutSuffix, string, isFuture) :
              output.replace(/%d/i, number);
      }

      function pastFuture (diff, output) {
          var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
          return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
      }

      function locale_set__set (config) {
          var prop, i;
          for (i in config) {
              prop = config[i];
              if (typeof prop === 'function') {
                  this[i] = prop;
              } else {
                  this['_' + i] = prop;
              }
          }
          // Lenient ordinal parsing accepts just a number in addition to
          // number + (possibly) stuff coming from _ordinalParseLenient.
          this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
      }

      var prototype__proto = Locale.prototype;

      prototype__proto._calendar       = defaultCalendar;
      prototype__proto.calendar        = locale_calendar__calendar;
      prototype__proto._longDateFormat = defaultLongDateFormat;
      prototype__proto.longDateFormat  = longDateFormat;
      prototype__proto._invalidDate    = defaultInvalidDate;
      prototype__proto.invalidDate     = invalidDate;
      prototype__proto._ordinal        = defaultOrdinal;
      prototype__proto.ordinal         = ordinal;
      prototype__proto._ordinalParse   = defaultOrdinalParse;
      prototype__proto.preparse        = preParsePostFormat;
      prototype__proto.postformat      = preParsePostFormat;
      prototype__proto._relativeTime   = defaultRelativeTime;
      prototype__proto.relativeTime    = relative__relativeTime;
      prototype__proto.pastFuture      = pastFuture;
      prototype__proto.set             = locale_set__set;

      // Month
      prototype__proto.months       =        localeMonths;
      prototype__proto._months      = defaultLocaleMonths;
      prototype__proto.monthsShort  =        localeMonthsShort;
      prototype__proto._monthsShort = defaultLocaleMonthsShort;
      prototype__proto.monthsParse  =        localeMonthsParse;

      // Week
      prototype__proto.week = localeWeek;
      prototype__proto._week = defaultLocaleWeek;
      prototype__proto.firstDayOfYear = localeFirstDayOfYear;
      prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

      // Day of Week
      prototype__proto.weekdays       =        localeWeekdays;
      prototype__proto._weekdays      = defaultLocaleWeekdays;
      prototype__proto.weekdaysMin    =        localeWeekdaysMin;
      prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
      prototype__proto.weekdaysShort  =        localeWeekdaysShort;
      prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
      prototype__proto.weekdaysParse  =        localeWeekdaysParse;

      // Hours
      prototype__proto.isPM = localeIsPM;
      prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
      prototype__proto.meridiem = localeMeridiem;

      function lists__get (format, index, field, setter) {
          var locale = locale_locales__getLocale();
          var utc = create_utc__createUTC().set(setter, index);
          return locale[field](utc, format);
      }

      function list (format, index, field, count, setter) {
          if (typeof format === 'number') {
              index = format;
              format = undefined;
          }

          format = format || '';

          if (index != null) {
              return lists__get(format, index, field, setter);
          }

          var i;
          var out = [];
          for (i = 0; i < count; i++) {
              out[i] = lists__get(format, i, field, setter);
          }
          return out;
      }

      function lists__listMonths (format, index) {
          return list(format, index, 'months', 12, 'month');
      }

      function lists__listMonthsShort (format, index) {
          return list(format, index, 'monthsShort', 12, 'month');
      }

      function lists__listWeekdays (format, index) {
          return list(format, index, 'weekdays', 7, 'day');
      }

      function lists__listWeekdaysShort (format, index) {
          return list(format, index, 'weekdaysShort', 7, 'day');
      }

      function lists__listWeekdaysMin (format, index) {
          return list(format, index, 'weekdaysMin', 7, 'day');
      }

      locale_locales__getSetGlobalLocale('en', {
          ordinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal : function (number) {
              var b = number % 10,
                  output = (toInt(number % 100 / 10) === 1) ? 'th' :
                  (b === 1) ? 'st' :
                  (b === 2) ? 'nd' :
                  (b === 3) ? 'rd' : 'th';
              return number + output;
          }
      });

      // Side effect imports
      utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
      utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

      var mathAbs = Math.abs;

      function duration_abs__abs () {
          var data           = this._data;

          this._milliseconds = mathAbs(this._milliseconds);
          this._days         = mathAbs(this._days);
          this._months       = mathAbs(this._months);

          data.milliseconds  = mathAbs(data.milliseconds);
          data.seconds       = mathAbs(data.seconds);
          data.minutes       = mathAbs(data.minutes);
          data.hours         = mathAbs(data.hours);
          data.months        = mathAbs(data.months);
          data.years         = mathAbs(data.years);

          return this;
      }

      function duration_add_subtract__addSubtract (duration, input, value, direction) {
          var other = create__createDuration(input, value);

          duration._milliseconds += direction * other._milliseconds;
          duration._days         += direction * other._days;
          duration._months       += direction * other._months;

          return duration._bubble();
      }

      // supports only 2.0-style add(1, 's') or add(duration)
      function duration_add_subtract__add (input, value) {
          return duration_add_subtract__addSubtract(this, input, value, 1);
      }

      // supports only 2.0-style subtract(1, 's') or subtract(duration)
      function duration_add_subtract__subtract (input, value) {
          return duration_add_subtract__addSubtract(this, input, value, -1);
      }

      function bubble () {
          var milliseconds = this._milliseconds;
          var days         = this._days;
          var months       = this._months;
          var data         = this._data;
          var seconds, minutes, hours, years = 0;

          // The following code bubbles up values, see the tests for
          // examples of what that means.
          data.milliseconds = milliseconds % 1000;

          seconds           = absFloor(milliseconds / 1000);
          data.seconds      = seconds % 60;

          minutes           = absFloor(seconds / 60);
          data.minutes      = minutes % 60;

          hours             = absFloor(minutes / 60);
          data.hours        = hours % 24;

          days += absFloor(hours / 24);

          // Accurately convert days to years, assume start from year 0.
          years = absFloor(daysToYears(days));
          days -= absFloor(yearsToDays(years));

          // 30 days to a month
          // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
          months += absFloor(days / 30);
          days   %= 30;

          // 12 months -> 1 year
          years  += absFloor(months / 12);
          months %= 12;

          data.days   = days;
          data.months = months;
          data.years  = years;

          return this;
      }

      function daysToYears (days) {
          // 400 years have 146097 days (taking into account leap year rules)
          return days * 400 / 146097;
      }

      function yearsToDays (years) {
          // years * 365 + absFloor(years / 4) -
          //     absFloor(years / 100) + absFloor(years / 400);
          return years * 146097 / 400;
      }

      function as (units) {
          var days;
          var months;
          var milliseconds = this._milliseconds;

          units = normalizeUnits(units);

          if (units === 'month' || units === 'year') {
              days   = this._days   + milliseconds / 864e5;
              months = this._months + daysToYears(days) * 12;
              return units === 'month' ? months : months / 12;
          } else {
              // handle milliseconds separately because of floating point math errors (issue #1867)
              days = this._days + Math.round(yearsToDays(this._months / 12));
              switch (units) {
                  case 'week'   : return days / 7     + milliseconds / 6048e5;
                  case 'day'    : return days         + milliseconds / 864e5;
                  case 'hour'   : return days * 24    + milliseconds / 36e5;
                  case 'minute' : return days * 1440  + milliseconds / 6e4;
                  case 'second' : return days * 86400 + milliseconds / 1000;
                  // Math.floor prevents floating point math errors here
                  case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                  default: throw new Error('Unknown unit ' + units);
              }
          }
      }

      // TODO: Use this.as('ms')?
      function duration_as__valueOf () {
          return (
              this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6
          );
      }

      function makeAs (alias) {
          return function () {
              return this.as(alias);
          };
      }

      var asMilliseconds = makeAs('ms');
      var asSeconds      = makeAs('s');
      var asMinutes      = makeAs('m');
      var asHours        = makeAs('h');
      var asDays         = makeAs('d');
      var asWeeks        = makeAs('w');
      var asMonths       = makeAs('M');
      var asYears        = makeAs('y');

      function duration_get__get (units) {
          units = normalizeUnits(units);
          return this[units + 's']();
      }

      function makeGetter(name) {
          return function () {
              return this._data[name];
          };
      }

      var duration_get__milliseconds = makeGetter('milliseconds');
      var seconds      = makeGetter('seconds');
      var minutes      = makeGetter('minutes');
      var hours        = makeGetter('hours');
      var days         = makeGetter('days');
      var months       = makeGetter('months');
      var years        = makeGetter('years');

      function weeks () {
          return absFloor(this.days() / 7);
      }

      var round = Math.round;
      var thresholds = {
          s: 45,  // seconds to minute
          m: 45,  // minutes to hour
          h: 22,  // hours to day
          d: 26,  // days to month
          M: 11   // months to year
      };

      // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
      function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
          return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
      }

      function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
          var duration = create__createDuration(posNegDuration).abs();
          var seconds  = round(duration.as('s'));
          var minutes  = round(duration.as('m'));
          var hours    = round(duration.as('h'));
          var days     = round(duration.as('d'));
          var months   = round(duration.as('M'));
          var years    = round(duration.as('y'));

          var a = seconds < thresholds.s && ['s', seconds]  ||
                  minutes === 1          && ['m']           ||
                  minutes < thresholds.m && ['mm', minutes] ||
                  hours   === 1          && ['h']           ||
                  hours   < thresholds.h && ['hh', hours]   ||
                  days    === 1          && ['d']           ||
                  days    < thresholds.d && ['dd', days]    ||
                  months  === 1          && ['M']           ||
                  months  < thresholds.M && ['MM', months]  ||
                  years   === 1          && ['y']           || ['yy', years];

          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale;
          return substituteTimeAgo.apply(null, a);
      }

      // This function allows you to set a threshold for relative time strings
      function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
          if (thresholds[threshold] === undefined) {
              return false;
          }
          if (limit === undefined) {
              return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          return true;
      }

      function humanize (withSuffix) {
          var locale = this.localeData();
          var output = duration_humanize__relativeTime(this, !withSuffix, locale);

          if (withSuffix) {
              output = locale.pastFuture(+this, output);
          }

          return locale.postformat(output);
      }

      var iso_string__abs = Math.abs;

      function iso_string__toISOString() {
          // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
          var Y = iso_string__abs(this.years());
          var M = iso_string__abs(this.months());
          var D = iso_string__abs(this.days());
          var h = iso_string__abs(this.hours());
          var m = iso_string__abs(this.minutes());
          var s = iso_string__abs(this.seconds() + this.milliseconds() / 1000);
          var total = this.asSeconds();

          if (!total) {
              // this is the same as C#'s (Noda) and python (isodate)...
              // but not other JS (goog.date)
              return 'P0D';
          }

          return (total < 0 ? '-' : '') +
              'P' +
              (Y ? Y + 'Y' : '') +
              (M ? M + 'M' : '') +
              (D ? D + 'D' : '') +
              ((h || m || s) ? 'T' : '') +
              (h ? h + 'H' : '') +
              (m ? m + 'M' : '') +
              (s ? s + 'S' : '');
      }

      var duration_prototype__proto = Duration.prototype;

      duration_prototype__proto.abs            = duration_abs__abs;
      duration_prototype__proto.add            = duration_add_subtract__add;
      duration_prototype__proto.subtract       = duration_add_subtract__subtract;
      duration_prototype__proto.as             = as;
      duration_prototype__proto.asMilliseconds = asMilliseconds;
      duration_prototype__proto.asSeconds      = asSeconds;
      duration_prototype__proto.asMinutes      = asMinutes;
      duration_prototype__proto.asHours        = asHours;
      duration_prototype__proto.asDays         = asDays;
      duration_prototype__proto.asWeeks        = asWeeks;
      duration_prototype__proto.asMonths       = asMonths;
      duration_prototype__proto.asYears        = asYears;
      duration_prototype__proto.valueOf        = duration_as__valueOf;
      duration_prototype__proto._bubble        = bubble;
      duration_prototype__proto.get            = duration_get__get;
      duration_prototype__proto.milliseconds   = duration_get__milliseconds;
      duration_prototype__proto.seconds        = seconds;
      duration_prototype__proto.minutes        = minutes;
      duration_prototype__proto.hours          = hours;
      duration_prototype__proto.days           = days;
      duration_prototype__proto.weeks          = weeks;
      duration_prototype__proto.months         = months;
      duration_prototype__proto.years          = years;
      duration_prototype__proto.humanize       = humanize;
      duration_prototype__proto.toISOString    = iso_string__toISOString;
      duration_prototype__proto.toString       = iso_string__toISOString;
      duration_prototype__proto.toJSON         = iso_string__toISOString;
      duration_prototype__proto.locale         = locale;
      duration_prototype__proto.localeData     = localeData;

      // Deprecations
      duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
      duration_prototype__proto.lang = lang;

      // Side effect imports

      addFormatToken('X', 0, 0, 'unix');
      addFormatToken('x', 0, 0, 'valueOf');

      // PARSING

      addRegexToken('x', matchSigned);
      addRegexToken('X', matchTimestamp);
      addParseToken('X', function (input, array, config) {
          config._d = new Date(parseFloat(input, 10) * 1000);
      });
      addParseToken('x', function (input, array, config) {
          config._d = new Date(toInt(input));
      });

      // Side effect imports


      utils_hooks__hooks.version = '2.10.3';

      setHookCallback(local__createLocal);

      utils_hooks__hooks.fn                    = momentPrototype;
      utils_hooks__hooks.min                   = min;
      utils_hooks__hooks.max                   = max;
      utils_hooks__hooks.utc                   = create_utc__createUTC;
      utils_hooks__hooks.unix                  = moment__createUnix;
      utils_hooks__hooks.months                = lists__listMonths;
      utils_hooks__hooks.isDate                = isDate;
      utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
      utils_hooks__hooks.invalid               = valid__createInvalid;
      utils_hooks__hooks.duration              = create__createDuration;
      utils_hooks__hooks.isMoment              = isMoment;
      utils_hooks__hooks.weekdays              = lists__listWeekdays;
      utils_hooks__hooks.parseZone             = moment__createInZone;
      utils_hooks__hooks.localeData            = locale_locales__getLocale;
      utils_hooks__hooks.isDuration            = isDuration;
      utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
      utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
      utils_hooks__hooks.defineLocale          = defineLocale;
      utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
      utils_hooks__hooks.normalizeUnits        = normalizeUnits;
      utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

      var _moment = utils_hooks__hooks;

      return _moment;

  }));
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },
/* 5 */
/***/ function(module, exports) {

  function webpackContext(req) {
  	throw new Error("Cannot find module '" + req + "'.");
  }
  webpackContext.keys = function() { return []; };
  webpackContext.resolve = webpackContext;
  module.exports = webpackContext;
  webpackContext.id = 5;


/***/ },
/* 6 */
/***/ function(module, exports) {

  /* WEBPACK VAR INJECTION */(function(global) {'use strict';

  var _rng;

  var globalVar = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : null;

  if (globalVar && globalVar.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var _rnds = new Array(16);
    _rng = function () {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 3) === 0) r = Math.random() * 4294967296;
        _rnds[i] = r >>> ((i & 3) << 3) & 255;
      }

      return _rnds;
    };
  }

  //     uuid.js
  //
  //     Copyright (c) 2010-2012 Robert Kieffer
  //     MIT License - http://opensource.org/licenses/mit-license.php

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required

  //var _rng = require('./rng');

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 256).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = buf && offset || 0,
        ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
      if (ii < 16) {
        // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0,
        bth = _byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [_seedBytes[0] | 1, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 16383;

  // Previous uuid creation time
  var _lastMSecs = 0,
      _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
      clockseq = clockseq + 1 & 16383;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 268435455) * 10000 + nsecs) % 4294967296;
    b[i++] = tl >>> 24 & 255;
    b[i++] = tl >>> 16 & 255;
    b[i++] = tl >>> 8 & 255;
    b[i++] = tl & 255;

    // `time_mid`
    var tmh = msecs / 4294967296 * 10000 & 268435455;
    b[i++] = tmh >>> 8 & 255;
    b[i++] = tmh & 255;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 15 | 16; // include version
    b[i++] = tmh >>> 16 & 255;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 128;

    // `clock_seq_low`
    b[i++] = clockseq & 255;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof options == 'string') {
      buf = options == 'binary' ? new Array(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;

  module.exports = uuid;
  /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

  // DOM utility methods

  /**
   * this prepares the JSON container for allocating SVG elements
   * @param JSONcontainer
   * @private
   */
  'use strict';

  exports.prepareElements = function (JSONcontainer) {
    // cleanup the redundant svgElements;
    for (var elementType in JSONcontainer) {
      if (JSONcontainer.hasOwnProperty(elementType)) {
        JSONcontainer[elementType].redundant = JSONcontainer[elementType].used;
        JSONcontainer[elementType].used = [];
      }
    }
  };

  /**
   * this cleans up all the unused SVG elements. By asking for the parentNode, we only need to supply the JSON container from
   * which to remove the redundant elements.
   *
   * @param JSONcontainer
   * @private
   */
  exports.cleanupElements = function (JSONcontainer) {
    // cleanup the redundant svgElements;
    for (var elementType in JSONcontainer) {
      if (JSONcontainer.hasOwnProperty(elementType)) {
        if (JSONcontainer[elementType].redundant) {
          for (var i = 0; i < JSONcontainer[elementType].redundant.length; i++) {
            JSONcontainer[elementType].redundant[i].parentNode.removeChild(JSONcontainer[elementType].redundant[i]);
          }
          JSONcontainer[elementType].redundant = [];
        }
      }
    }
  };

  /**
   * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
   * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
   *
   * @param elementType
   * @param JSONcontainer
   * @param svgContainer
   * @returns {*}
   * @private
   */
  exports.getSVGElement = function (elementType, JSONcontainer, svgContainer) {
    var element;
    // allocate SVG element, if it doesnt yet exist, create one.
    if (JSONcontainer.hasOwnProperty(elementType)) {
      // this element has been created before
      // check if there is an redundant element
      if (JSONcontainer[elementType].redundant.length > 0) {
        element = JSONcontainer[elementType].redundant[0];
        JSONcontainer[elementType].redundant.shift();
      } else {
        // create a new element and add it to the SVG
        element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
        svgContainer.appendChild(element);
      }
    } else {
      // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
      element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
      JSONcontainer[elementType] = { used: [], redundant: [] };
      svgContainer.appendChild(element);
    }
    JSONcontainer[elementType].used.push(element);
    return element;
  };

  /**
   * Allocate or generate an SVG element if needed. Store a reference to it in the JSON container and draw it in the svgContainer
   * the JSON container and the SVG container have to be supplied so other svg containers (like the legend) can use this.
   *
   * @param elementType
   * @param JSONcontainer
   * @param DOMContainer
   * @returns {*}
   * @private
   */
  exports.getDOMElement = function (elementType, JSONcontainer, DOMContainer, insertBefore) {
    var element;
    // allocate DOM element, if it doesnt yet exist, create one.
    if (JSONcontainer.hasOwnProperty(elementType)) {
      // this element has been created before
      // check if there is an redundant element
      if (JSONcontainer[elementType].redundant.length > 0) {
        element = JSONcontainer[elementType].redundant[0];
        JSONcontainer[elementType].redundant.shift();
      } else {
        // create a new element and add it to the SVG
        element = document.createElement(elementType);
        if (insertBefore !== undefined) {
          DOMContainer.insertBefore(element, insertBefore);
        } else {
          DOMContainer.appendChild(element);
        }
      }
    } else {
      // create a new element and add it to the SVG, also create a new object in the svgElements to keep track of it.
      element = document.createElement(elementType);
      JSONcontainer[elementType] = { used: [], redundant: [] };
      if (insertBefore !== undefined) {
        DOMContainer.insertBefore(element, insertBefore);
      } else {
        DOMContainer.appendChild(element);
      }
    }
    JSONcontainer[elementType].used.push(element);
    return element;
  };

  /**
   * draw a point object. this is a seperate function because it can also be called by the legend.
   * The reason the JSONcontainer and the target SVG svgContainer have to be supplied is so the legend can use these functions
   * as well.
   *
   * @param x
   * @param y
   * @param group
   * @param JSONcontainer
   * @param svgContainer
   * @param labelObj
   * @returns {*}
   */
  exports.drawPoint = function (x, y, group, JSONcontainer, svgContainer, labelObj) {
    var point;
    if (group.options.drawPoints.style == 'circle') {
      point = exports.getSVGElement('circle', JSONcontainer, svgContainer);
      point.setAttributeNS(null, 'cx', x);
      point.setAttributeNS(null, 'cy', y);
      point.setAttributeNS(null, 'r', 0.5 * group.options.drawPoints.size);
    } else {
      point = exports.getSVGElement('rect', JSONcontainer, svgContainer);
      point.setAttributeNS(null, 'x', x - 0.5 * group.options.drawPoints.size);
      point.setAttributeNS(null, 'y', y - 0.5 * group.options.drawPoints.size);
      point.setAttributeNS(null, 'width', group.options.drawPoints.size);
      point.setAttributeNS(null, 'height', group.options.drawPoints.size);
    }

    if (group.options.drawPoints.styles !== undefined) {
      point.setAttributeNS(null, 'style', group.group.options.drawPoints.styles);
    }
    point.setAttributeNS(null, 'class', group.className + ' vis-point');
    //handle label

    if (labelObj) {
      var label = exports.getSVGElement('text', JSONcontainer, svgContainer);
      if (labelObj.xOffset) {
        x = x + labelObj.xOffset;
      }

      if (labelObj.yOffset) {
        y = y + labelObj.yOffset;
      }
      if (labelObj.content) {
        label.textContent = labelObj.content;
      }

      if (labelObj.className) {
        label.setAttributeNS(null, 'class', labelObj.className + ' vis-label');
      }
      label.setAttributeNS(null, 'x', x);
      label.setAttributeNS(null, 'y', y);
    }

    return point;
  };

  /**
   * draw a bar SVG element centered on the X coordinate
   *
   * @param x
   * @param y
   * @param className
   */
  exports.drawBar = function (x, y, width, height, className, JSONcontainer, svgContainer, style) {
    if (height != 0) {
      if (height < 0) {
        height *= -1;
        y -= height;
      }
      var rect = exports.getSVGElement('rect', JSONcontainer, svgContainer);
      rect.setAttributeNS(null, 'x', x - 0.5 * width);
      rect.setAttributeNS(null, 'y', y);
      rect.setAttributeNS(null, 'width', width);
      rect.setAttributeNS(null, 'height', height);
      rect.setAttributeNS(null, 'class', className);
      if (style) {
        rect.setAttributeNS(null, 'style', style);
      }
    }
  };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var util = __webpack_require__(1);
  var Queue = __webpack_require__(9);

  /**
   * DataSet
   *
   * Usage:
   *     var dataSet = new DataSet({
   *         fieldId: '_id',
   *         type: {
   *             // ...
   *         }
   *     });
   *
   *     dataSet.add(item);
   *     dataSet.add(data);
   *     dataSet.update(item);
   *     dataSet.update(data);
   *     dataSet.remove(id);
   *     dataSet.remove(ids);
   *     var data = dataSet.get();
   *     var data = dataSet.get(id);
   *     var data = dataSet.get(ids);
   *     var data = dataSet.get(ids, options, data);
   *     dataSet.clear();
   *
   * A data set can:
   * - add/remove/update data
   * - gives triggers upon changes in the data
   * - can  import/export data in various data formats
   *
   * @param {Array} [data]    Optional array with initial data
   * @param {Object} [options]   Available options:
   *                             {String} fieldId Field name of the id in the
   *                                              items, 'id' by default.
   *                             {Object.<String, String} type
   *                                              A map with field names as key,
   *                                              and the field type as value.
   *                             {Object} queue   Queue changes to the DataSet,
   *                                              flush them all at once.
   *                                              Queue options:
   *                                              - {number} delay  Delay in ms, null by default
   *                                              - {number} max    Maximum number of entries in the queue, Infinity by default
   * @constructor DataSet
   */
  // TODO: add a DataSet constructor DataSet(data, options)
  function DataSet(data, options) {
    // correctly read optional arguments
    if (data && !Array.isArray(data)) {
      options = data;
      data = null;
    }

    this._options = options || {};
    this._data = {}; // map with data indexed by id
    this.length = 0; // number of items in the DataSet
    this._fieldId = this._options.fieldId || 'id'; // name of the field containing id
    this._type = {}; // internal field types (NOTE: this can differ from this._options.type)

    // all variants of a Date are internally stored as Date, so we can convert
    // from everything to everything (also from ISODate to Number for example)
    if (this._options.type) {
      for (var field in this._options.type) {
        if (this._options.type.hasOwnProperty(field)) {
          var value = this._options.type[field];
          if (value == 'Date' || value == 'ISODate' || value == 'ASPDate') {
            this._type[field] = 'Date';
          } else {
            this._type[field] = value;
          }
        }
      }
    }

    // TODO: deprecated since version 1.1.1 (or 2.0.0?)
    if (this._options.convert) {
      throw new Error('Option "convert" is deprecated. Use "type" instead.');
    }

    this._subscribers = {}; // event subscribers

    // add initial data when provided
    if (data) {
      this.add(data);
    }

    this.setOptions(options);
  }

  /**
   * @param {Object} [options]   Available options:
   *                             {Object} queue   Queue changes to the DataSet,
   *                                              flush them all at once.
   *                                              Queue options:
   *                                              - {number} delay  Delay in ms, null by default
   *                                              - {number} max    Maximum number of entries in the queue, Infinity by default
   * @param options
   */
  DataSet.prototype.setOptions = function (options) {
    if (options && options.queue !== undefined) {
      if (options.queue === false) {
        // delete queue if loaded
        if (this._queue) {
          this._queue.destroy();
          delete this._queue;
        }
      } else {
        // create queue and update its options
        if (!this._queue) {
          this._queue = Queue.extend(this, {
            replace: ['add', 'update', 'remove']
          });
        }

        if (typeof options.queue === 'object') {
          this._queue.setOptions(options.queue);
        }
      }
    }
  };

  /**
   * Subscribe to an event, add an event listener
   * @param {String} event        Event name. Available events: 'put', 'update',
   *                              'remove'
   * @param {function} callback   Callback method. Called with three parameters:
   *                                  {String} event
   *                                  {Object | null} params
   *                                  {String | Number} senderId
   */
  DataSet.prototype.on = function (event, callback) {
    var subscribers = this._subscribers[event];
    if (!subscribers) {
      subscribers = [];
      this._subscribers[event] = subscribers;
    }

    subscribers.push({
      callback: callback
    });
  };

  // TODO: remove this deprecated function some day (replaced with `on` since version 0.5, deprecated since v4.0)
  DataSet.prototype.subscribe = function () {
    throw new Error('DataSet.subscribe is deprecated. Use DataSet.on instead.');
  };

  /**
   * Unsubscribe from an event, remove an event listener
   * @param {String} event
   * @param {function} callback
   */
  DataSet.prototype.off = function (event, callback) {
    var subscribers = this._subscribers[event];
    if (subscribers) {
      this._subscribers[event] = subscribers.filter(function (listener) {
        return listener.callback != callback;
      });
    }
  };

  // TODO: remove this deprecated function some day (replaced with `on` since version 0.5, deprecated since v4.0)
  DataSet.prototype.unsubscribe = function () {
    throw new Error('DataSet.unsubscribe is deprecated. Use DataSet.off instead.');
  };

  /**
   * Trigger an event
   * @param {String} event
   * @param {Object | null} params
   * @param {String} [senderId]       Optional id of the sender.
   * @private
   */
  DataSet.prototype._trigger = function (event, params, senderId) {
    if (event == '*') {
      throw new Error('Cannot trigger event *');
    }

    var subscribers = [];
    if (event in this._subscribers) {
      subscribers = subscribers.concat(this._subscribers[event]);
    }
    if ('*' in this._subscribers) {
      subscribers = subscribers.concat(this._subscribers['*']);
    }

    for (var i = 0; i < subscribers.length; i++) {
      var subscriber = subscribers[i];
      if (subscriber.callback) {
        subscriber.callback(event, params, senderId || null);
      }
    }
  };

  /**
   * Add data.
   * Adding an item will fail when there already is an item with the same id.
   * @param {Object | Array} data
   * @param {String} [senderId] Optional sender id
   * @return {Array} addedIds      Array with the ids of the added items
   */
  DataSet.prototype.add = function (data, senderId) {
    var addedIds = [],
        id,
        me = this;

    if (Array.isArray(data)) {
      // Array
      for (var i = 0, len = data.length; i < len; i++) {
        id = me._addItem(data[i]);
        addedIds.push(id);
      }
    } else if (data instanceof Object) {
      // Single item
      id = me._addItem(data);
      addedIds.push(id);
    } else {
      throw new Error('Unknown dataType');
    }

    if (addedIds.length) {
      this._trigger('add', { items: addedIds }, senderId);
    }

    return addedIds;
  };

  /**
   * Update existing items. When an item does not exist, it will be created
   * @param {Object | Array} data
   * @param {String} [senderId] Optional sender id
   * @return {Array} updatedIds     The ids of the added or updated items
   */
  DataSet.prototype.update = function (data, senderId) {
    var addedIds = [];
    var updatedIds = [];
    var updatedData = [];
    var me = this;
    var fieldId = me._fieldId;

    var addOrUpdate = function addOrUpdate(item) {
      var id = item[fieldId];
      if (me._data[id]) {
        // update item
        id = me._updateItem(item);
        updatedIds.push(id);
        updatedData.push(item);
      } else {
        // add new item
        id = me._addItem(item);
        addedIds.push(id);
      }
    };

    if (Array.isArray(data)) {
      // Array
      for (var i = 0, len = data.length; i < len; i++) {
        addOrUpdate(data[i]);
      }
    } else if (data instanceof Object) {
      // Single item
      addOrUpdate(data);
    } else {
      throw new Error('Unknown dataType');
    }

    if (addedIds.length) {
      this._trigger('add', { items: addedIds }, senderId);
    }
    if (updatedIds.length) {
      this._trigger('update', { items: updatedIds, data: updatedData }, senderId);
    }

    return addedIds.concat(updatedIds);
  };

  /**
   * Get a data item or multiple items.
   *
   * Usage:
   *
   *     get()
   *     get(options: Object)
   *
   *     get(id: Number | String)
   *     get(id: Number | String, options: Object)
   *
   *     get(ids: Number[] | String[])
   *     get(ids: Number[] | String[], options: Object)
   *
   * Where:
   *
   * {Number | String} id         The id of an item
   * {Number[] | String{}} ids    An array with ids of items
   * {Object} options             An Object with options. Available options:
   * {String} [returnType]        Type of data to be returned.
   *                              Can be 'Array' (default) or 'Object'.
   * {Object.<String, String>} [type]
   * {String[]} [fields]          field names to be returned
   * {function} [filter]          filter items
   * {String | function} [order]  Order the items by a field name or custom sort function.
   * @throws Error
   */
  DataSet.prototype.get = function (args) {
    var me = this;

    // parse the arguments
    var id, ids, options;
    var firstType = util.getType(arguments[0]);
    if (firstType == 'String' || firstType == 'Number') {
      // get(id [, options])
      id = arguments[0];
      options = arguments[1];
    } else if (firstType == 'Array') {
      // get(ids [, options])
      ids = arguments[0];
      options = arguments[1];
    } else {
      // get([, options])
      options = arguments[0];
    }

    // determine the return type
    var returnType;
    if (options && options.returnType) {
      var allowedValues = ['Array', 'Object'];
      returnType = allowedValues.indexOf(options.returnType) == -1 ? 'Array' : options.returnType;
    } else {
      returnType = 'Array';
    }

    // build options
    var type = options && options.type || this._options.type;
    var filter = options && options.filter;
    var items = [],
        item,
        itemId,
        i,
        len;

    // convert items
    if (id != undefined) {
      // return a single item
      item = me._getItem(id, type);
      if (filter && !filter(item)) {
        item = null;
      }
    } else if (ids != undefined) {
      // return a subset of items
      for (i = 0, len = ids.length; i < len; i++) {
        item = me._getItem(ids[i], type);
        if (!filter || filter(item)) {
          items.push(item);
        }
      }
    } else {
      // return all items
      for (itemId in this._data) {
        if (this._data.hasOwnProperty(itemId)) {
          item = me._getItem(itemId, type);
          if (!filter || filter(item)) {
            items.push(item);
          }
        }
      }
    }

    // order the results
    if (options && options.order && id == undefined) {
      this._sort(items, options.order);
    }

    // filter fields of the items
    if (options && options.fields) {
      var fields = options.fields;
      if (id != undefined) {
        item = this._filterFields(item, fields);
      } else {
        for (i = 0, len = items.length; i < len; i++) {
          items[i] = this._filterFields(items[i], fields);
        }
      }
    }

    // return the results
    if (returnType == 'Object') {
      var result = {};
      for (i = 0; i < items.length; i++) {
        result[items[i].id] = items[i];
      }
      return result;
    } else {
      if (id != undefined) {
        // a single item
        return item;
      } else {
        // just return our array
        return items;
      }
    }
  };

  /**
   * Get ids of all items or from a filtered set of items.
   * @param {Object} [options]    An Object with options. Available options:
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Array} ids
   */
  DataSet.prototype.getIds = function (options) {
    var data = this._data,
        filter = options && options.filter,
        order = options && options.order,
        type = options && options.type || this._options.type,
        i,
        len,
        id,
        item,
        items,
        ids = [];

    if (filter) {
      // get filtered items
      if (order) {
        // create ordered list
        items = [];
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = this._getItem(id, type);
            if (filter(item)) {
              items.push(item);
            }
          }
        }

        this._sort(items, order);

        for (i = 0, len = items.length; i < len; i++) {
          ids[i] = items[i][this._fieldId];
        }
      } else {
        // create unordered list
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = this._getItem(id, type);
            if (filter(item)) {
              ids.push(item[this._fieldId]);
            }
          }
        }
      }
    } else {
      // get all items
      if (order) {
        // create an ordered list
        items = [];
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            items.push(data[id]);
          }
        }

        this._sort(items, order);

        for (i = 0, len = items.length; i < len; i++) {
          ids[i] = items[i][this._fieldId];
        }
      } else {
        // create unordered list
        for (id in data) {
          if (data.hasOwnProperty(id)) {
            item = data[id];
            ids.push(item[this._fieldId]);
          }
        }
      }
    }

    return ids;
  };

  /**
   * Returns the DataSet itself. Is overwritten for example by the DataView,
   * which returns the DataSet it is connected to instead.
   */
  DataSet.prototype.getDataSet = function () {
    return this;
  };

  /**
   * Execute a callback function for every item in the dataset.
   * @param {function} callback
   * @param {Object} [options]    Available options:
   *                              {Object.<String, String>} [type]
   *                              {String[]} [fields] filter fields
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   */
  DataSet.prototype.forEach = function (callback, options) {
    var filter = options && options.filter,
        type = options && options.type || this._options.type,
        data = this._data,
        item,
        id;

    if (options && options.order) {
      // execute forEach on ordered list
      var items = this.get(options);

      for (var i = 0, len = items.length; i < len; i++) {
        item = items[i];
        id = item[this._fieldId];
        callback(item, id);
      }
    } else {
      // unordered
      for (id in data) {
        if (data.hasOwnProperty(id)) {
          item = this._getItem(id, type);
          if (!filter || filter(item)) {
            callback(item, id);
          }
        }
      }
    }
  };

  /**
   * Map every item in the dataset.
   * @param {function} callback
   * @param {Object} [options]    Available options:
   *                              {Object.<String, String>} [type]
   *                              {String[]} [fields] filter fields
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Object[]} mappedItems
   */
  DataSet.prototype.map = function (callback, options) {
    var filter = options && options.filter,
        type = options && options.type || this._options.type,
        mappedItems = [],
        data = this._data,
        item;

    // convert and filter items
    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        item = this._getItem(id, type);
        if (!filter || filter(item)) {
          mappedItems.push(callback(item, id));
        }
      }
    }

    // order items
    if (options && options.order) {
      this._sort(mappedItems, options.order);
    }

    return mappedItems;
  };

  /**
   * Filter the fields of an item
   * @param {Object | null} item
   * @param {String[]} fields     Field names
   * @return {Object | null} filteredItem or null if no item is provided
   * @private
   */
  DataSet.prototype._filterFields = function (item, fields) {
    if (!item) {
      // item is null
      return item;
    }

    var filteredItem = {};

    if (Array.isArray(fields)) {
      for (var field in item) {
        if (item.hasOwnProperty(field) && fields.indexOf(field) != -1) {
          filteredItem[field] = item[field];
        }
      }
    } else {
      for (var field in item) {
        if (item.hasOwnProperty(field) && fields.hasOwnProperty(field)) {
          filteredItem[fields[field]] = item[field];
        }
      }
    }

    return filteredItem;
  };

  /**
   * Sort the provided array with items
   * @param {Object[]} items
   * @param {String | function} order      A field name or custom sort function.
   * @private
   */
  DataSet.prototype._sort = function (items, order) {
    if (util.isString(order)) {
      // order by provided field name
      var name = order; // field name
      items.sort(function (a, b) {
        var av = a[name];
        var bv = b[name];
        return av > bv ? 1 : av < bv ? -1 : 0;
      });
    } else if (typeof order === 'function') {
      // order by sort function
      items.sort(order);
    }
    // TODO: extend order by an Object {field:String, direction:String}
    //       where direction can be 'asc' or 'desc'
    else {
      throw new TypeError('Order must be a function or a string');
    }
  };

  /**
   * Remove an object by pointer or by id
   * @param {String | Number | Object | Array} id Object or id, or an array with
   *                                              objects or ids to be removed
   * @param {String} [senderId] Optional sender id
   * @return {Array} removedIds
   */
  DataSet.prototype.remove = function (id, senderId) {
    var removedIds = [],
        i,
        len,
        removedId;

    if (Array.isArray(id)) {
      for (i = 0, len = id.length; i < len; i++) {
        removedId = this._remove(id[i]);
        if (removedId != null) {
          removedIds.push(removedId);
        }
      }
    } else {
      removedId = this._remove(id);
      if (removedId != null) {
        removedIds.push(removedId);
      }
    }

    if (removedIds.length) {
      this._trigger('remove', { items: removedIds }, senderId);
    }

    return removedIds;
  };

  /**
   * Remove an item by its id
   * @param {Number | String | Object} id   id or item
   * @returns {Number | String | null} id
   * @private
   */
  DataSet.prototype._remove = function (id) {
    if (util.isNumber(id) || util.isString(id)) {
      if (this._data[id]) {
        delete this._data[id];
        this.length--;
        return id;
      }
    } else if (id instanceof Object) {
      var itemId = id[this._fieldId];
      if (itemId && this._data[itemId]) {
        delete this._data[itemId];
        this.length--;
        return itemId;
      }
    }
    return null;
  };

  /**
   * Clear the data
   * @param {String} [senderId] Optional sender id
   * @return {Array} removedIds    The ids of all removed items
   */
  DataSet.prototype.clear = function (senderId) {
    var ids = Object.keys(this._data);

    this._data = {};
    this.length = 0;

    this._trigger('remove', { items: ids }, senderId);

    return ids;
  };

  /**
   * Find the item with maximum value of a specified field
   * @param {String} field
   * @return {Object | null} item  Item containing max value, or null if no items
   */
  DataSet.prototype.max = function (field) {
    var data = this._data,
        max = null,
        maxField = null;

    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        var item = data[id];
        var itemField = item[field];
        if (itemField != null && (!max || itemField > maxField)) {
          max = item;
          maxField = itemField;
        }
      }
    }

    return max;
  };

  /**
   * Find the item with minimum value of a specified field
   * @param {String} field
   * @return {Object | null} item  Item containing max value, or null if no items
   */
  DataSet.prototype.min = function (field) {
    var data = this._data,
        min = null,
        minField = null;

    for (var id in data) {
      if (data.hasOwnProperty(id)) {
        var item = data[id];
        var itemField = item[field];
        if (itemField != null && (!min || itemField < minField)) {
          min = item;
          minField = itemField;
        }
      }
    }

    return min;
  };

  /**
   * Find all distinct values of a specified field
   * @param {String} field
   * @return {Array} values  Array containing all distinct values. If data items
   *                         do not contain the specified field are ignored.
   *                         The returned array is unordered.
   */
  DataSet.prototype.distinct = function (field) {
    var data = this._data;
    var values = [];
    var fieldType = this._options.type && this._options.type[field] || null;
    var count = 0;
    var i;

    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        var item = data[prop];
        var value = item[field];
        var exists = false;
        for (i = 0; i < count; i++) {
          if (values[i] == value) {
            exists = true;
            break;
          }
        }
        if (!exists && value !== undefined) {
          values[count] = value;
          count++;
        }
      }
    }

    if (fieldType) {
      for (i = 0; i < values.length; i++) {
        values[i] = util.convert(values[i], fieldType);
      }
    }

    return values;
  };

  /**
   * Add a single item. Will fail when an item with the same id already exists.
   * @param {Object} item
   * @return {String} id
   * @private
   */
  DataSet.prototype._addItem = function (item) {
    var id = item[this._fieldId];

    if (id != undefined) {
      // check whether this id is already taken
      if (this._data[id]) {
        // item already exists
        throw new Error('Cannot add item: item with id ' + id + ' already exists');
      }
    } else {
      // generate an id
      id = util.randomUUID();
      item[this._fieldId] = id;
    }

    var d = {};
    for (var field in item) {
      if (item.hasOwnProperty(field)) {
        var fieldType = this._type[field]; // type may be undefined
        d[field] = util.convert(item[field], fieldType);
      }
    }
    this._data[id] = d;
    this.length++;

    return id;
  };

  /**
   * Get an item. Fields can be converted to a specific type
   * @param {String} id
   * @param {Object.<String, String>} [types]  field types to convert
   * @return {Object | null} item
   * @private
   */
  DataSet.prototype._getItem = function (id, types) {
    var field, value;

    // get the item from the dataset
    var raw = this._data[id];
    if (!raw) {
      return null;
    }

    // convert the items field types
    var converted = {};
    if (types) {
      for (field in raw) {
        if (raw.hasOwnProperty(field)) {
          value = raw[field];
          converted[field] = util.convert(value, types[field]);
        }
      }
    } else {
      // no field types specified, no converting needed
      for (field in raw) {
        if (raw.hasOwnProperty(field)) {
          value = raw[field];
          converted[field] = value;
        }
      }
    }
    return converted;
  };

  /**
   * Update a single item: merge with existing item.
   * Will fail when the item has no id, or when there does not exist an item
   * with the same id.
   * @param {Object} item
   * @return {String} id
   * @private
   */
  DataSet.prototype._updateItem = function (item) {
    var id = item[this._fieldId];
    if (id == undefined) {
      throw new Error('Cannot update item: item has no id (item: ' + JSON.stringify(item) + ')');
    }
    var d = this._data[id];
    if (!d) {
      // item doesn't exist
      throw new Error('Cannot update item: no item with id ' + id + ' found');
    }

    // merge with current item
    for (var field in item) {
      if (item.hasOwnProperty(field)) {
        var fieldType = this._type[field]; // type may be undefined
        d[field] = util.convert(item[field], fieldType);
      }
    }

    return id;
  };

  module.exports = DataSet;

/***/ },
/* 9 */
/***/ function(module, exports) {

  /**
   * A queue
   * @param {Object} options
   *            Available options:
   *            - delay: number    When provided, the queue will be flushed
   *                               automatically after an inactivity of this delay
   *                               in milliseconds.
   *                               Default value is null.
   *            - max: number      When the queue exceeds the given maximum number
   *                               of entries, the queue is flushed automatically.
   *                               Default value of max is Infinity.
   * @constructor
   */
  'use strict';

  function Queue(options) {
    // options
    this.delay = null;
    this.max = Infinity;

    // properties
    this._queue = [];
    this._timeout = null;
    this._extended = null;

    this.setOptions(options);
  }

  /**
   * Update the configuration of the queue
   * @param {Object} options
   *            Available options:
   *            - delay: number    When provided, the queue will be flushed
   *                               automatically after an inactivity of this delay
   *                               in milliseconds.
   *                               Default value is null.
   *            - max: number      When the queue exceeds the given maximum number
   *                               of entries, the queue is flushed automatically.
   *                               Default value of max is Infinity.
   * @param options
   */
  Queue.prototype.setOptions = function (options) {
    if (options && typeof options.delay !== 'undefined') {
      this.delay = options.delay;
    }
    if (options && typeof options.max !== 'undefined') {
      this.max = options.max;
    }

    this._flushIfNeeded();
  };

  /**
   * Extend an object with queuing functionality.
   * The object will be extended with a function flush, and the methods provided
   * in options.replace will be replaced with queued ones.
   * @param {Object} object
   * @param {Object} options
   *            Available options:
   *            - replace: Array.<string>
   *                               A list with method names of the methods
   *                               on the object to be replaced with queued ones.
   *            - delay: number    When provided, the queue will be flushed
   *                               automatically after an inactivity of this delay
   *                               in milliseconds.
   *                               Default value is null.
   *            - max: number      When the queue exceeds the given maximum number
   *                               of entries, the queue is flushed automatically.
   *                               Default value of max is Infinity.
   * @return {Queue} Returns the created queue
   */
  Queue.extend = function (object, options) {
    var queue = new Queue(options);

    if (object.flush !== undefined) {
      throw new Error('Target object already has a property flush');
    }
    object.flush = function () {
      queue.flush();
    };

    var methods = [{
      name: 'flush',
      original: undefined
    }];

    if (options && options.replace) {
      for (var i = 0; i < options.replace.length; i++) {
        var name = options.replace[i];
        methods.push({
          name: name,
          original: object[name]
        });
        queue.replace(object, name);
      }
    }

    queue._extended = {
      object: object,
      methods: methods
    };

    return queue;
  };

  /**
   * Destroy the queue. The queue will first flush all queued actions, and in
   * case it has extended an object, will restore the original object.
   */
  Queue.prototype.destroy = function () {
    this.flush();

    if (this._extended) {
      var object = this._extended.object;
      var methods = this._extended.methods;
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (method.original) {
          object[method.name] = method.original;
        } else {
          delete object[method.name];
        }
      }
      this._extended = null;
    }
  };

  /**
   * Replace a method on an object with a queued version
   * @param {Object} object   Object having the method
   * @param {string} method   The method name
   */
  Queue.prototype.replace = function (object, method) {
    var me = this;
    var original = object[method];
    if (!original) {
      throw new Error('Method ' + method + ' undefined');
    }

    object[method] = function () {
      // create an Array with the arguments
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      // add this call to the queue
      me.queue({
        args: args,
        fn: original,
        context: this
      });
    };
  };

  /**
   * Queue a call
   * @param {function | {fn: function, args: Array} | {fn: function, args: Array, context: Object}} entry
   */
  Queue.prototype.queue = function (entry) {
    if (typeof entry === 'function') {
      this._queue.push({ fn: entry });
    } else {
      this._queue.push(entry);
    }

    this._flushIfNeeded();
  };

  /**
   * Check whether the queue needs to be flushed
   * @private
   */
  Queue.prototype._flushIfNeeded = function () {
    // flush when the maximum is exceeded.
    if (this._queue.length > this.max) {
      this.flush();
    }

    // flush after a period of inactivity when a delay is configured
    clearTimeout(this._timeout);
    if (this.queue.length > 0 && typeof this.delay === 'number') {
      var me = this;
      this._timeout = setTimeout(function () {
        me.flush();
      }, this.delay);
    }
  };

  /**
   * Flush all queued calls
   */
  Queue.prototype.flush = function () {
    while (this._queue.length > 0) {
      var entry = this._queue.shift();
      entry.fn.apply(entry.context || entry.fn, entry.args || []);
    }
  };

  module.exports = Queue;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(8);

  /**
   * DataView
   *
   * a dataview offers a filtered view on a dataset or an other dataview.
   *
   * @param {DataSet | DataView} data
   * @param {Object} [options]   Available options: see method get
   *
   * @constructor DataView
   */
  function DataView(data, options) {
    this._data = null;
    this._ids = {}; // ids of the items currently in memory (just contains a boolean true)
    this.length = 0; // number of items in the DataView
    this._options = options || {};
    this._fieldId = 'id'; // name of the field containing id
    this._subscribers = {}; // event subscribers

    var me = this;
    this.listener = function () {
      me._onEvent.apply(me, arguments);
    };

    this.setData(data);
  }

  // TODO: implement a function .config() to dynamically update things like configured filter
  // and trigger changes accordingly

  /**
   * Set a data source for the view
   * @param {DataSet | DataView} data
   */
  DataView.prototype.setData = function (data) {
    var ids, i, len;

    if (this._data) {
      // unsubscribe from current dataset
      if (this._data.off) {
        this._data.off('*', this.listener);
      }

      // trigger a remove of all items in memory
      ids = [];
      for (var id in this._ids) {
        if (this._ids.hasOwnProperty(id)) {
          ids.push(id);
        }
      }
      this._ids = {};
      this.length = 0;
      this._trigger('remove', { items: ids });
    }

    this._data = data;

    if (this._data) {
      // update fieldId
      this._fieldId = this._options.fieldId || this._data && this._data.options && this._data.options.fieldId || 'id';

      // trigger an add of all added items
      ids = this._data.getIds({ filter: this._options && this._options.filter });
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        this._ids[id] = true;
      }
      this.length = ids.length;
      this._trigger('add', { items: ids });

      // subscribe to new dataset
      if (this._data.on) {
        this._data.on('*', this.listener);
      }
    }
  };

  /**
   * Refresh the DataView. Useful when the DataView has a filter function
   * containing a variable parameter.
   */
  DataView.prototype.refresh = function () {
    var id;
    var ids = this._data.getIds({ filter: this._options && this._options.filter });
    var newIds = {};
    var added = [];
    var removed = [];

    // check for additions
    for (var i = 0; i < ids.length; i++) {
      id = ids[i];
      newIds[id] = true;
      if (!this._ids[id]) {
        added.push(id);
        this._ids[id] = true;
        this.length++;
      }
    }

    // check for removals
    for (id in this._ids) {
      if (this._ids.hasOwnProperty(id)) {
        if (!newIds[id]) {
          removed.push(id);
          delete this._ids[id];
          this.length--;
        }
      }
    }

    // trigger events
    if (added.length) {
      this._trigger('add', { items: added });
    }
    if (removed.length) {
      this._trigger('remove', { items: removed });
    }
  };

  /**
   * Get data from the data view
   *
   * Usage:
   *
   *     get()
   *     get(options: Object)
   *     get(options: Object, data: Array | DataTable)
   *
   *     get(id: Number)
   *     get(id: Number, options: Object)
   *     get(id: Number, options: Object, data: Array | DataTable)
   *
   *     get(ids: Number[])
   *     get(ids: Number[], options: Object)
   *     get(ids: Number[], options: Object, data: Array | DataTable)
   *
   * Where:
   *
   * {Number | String} id         The id of an item
   * {Number[] | String{}} ids    An array with ids of items
   * {Object} options             An Object with options. Available options:
   *                              {String} [type] Type of data to be returned. Can
   *                                              be 'DataTable' or 'Array' (default)
   *                              {Object.<String, String>} [convert]
   *                              {String[]} [fields] field names to be returned
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * {Array | DataTable} [data]   If provided, items will be appended to this
   *                              array or table. Required in case of Google
   *                              DataTable.
   * @param args
   */
  DataView.prototype.get = function (args) {
    var me = this;

    // parse the arguments
    var ids, options, data;
    var firstType = util.getType(arguments[0]);
    if (firstType == 'String' || firstType == 'Number' || firstType == 'Array') {
      // get(id(s) [, options] [, data])
      ids = arguments[0]; // can be a single id or an array with ids
      options = arguments[1];
      data = arguments[2];
    } else {
      // get([, options] [, data])
      options = arguments[0];
      data = arguments[1];
    }

    // extend the options with the default options and provided options
    var viewOptions = util.extend({}, this._options, options);

    // create a combined filter method when needed
    if (this._options.filter && options && options.filter) {
      viewOptions.filter = function (item) {
        return me._options.filter(item) && options.filter(item);
      };
    }

    // build up the call to the linked data set
    var getArguments = [];
    if (ids != undefined) {
      getArguments.push(ids);
    }
    getArguments.push(viewOptions);
    getArguments.push(data);

    return this._data && this._data.get.apply(this._data, getArguments);
  };

  /**
   * Get ids of all items or from a filtered set of items.
   * @param {Object} [options]    An Object with options. Available options:
   *                              {function} [filter] filter items
   *                              {String | function} [order] Order the items by
   *                                  a field name or custom sort function.
   * @return {Array} ids
   */
  DataView.prototype.getIds = function (options) {
    var ids;

    if (this._data) {
      var defaultFilter = this._options.filter;
      var filter;

      if (options && options.filter) {
        if (defaultFilter) {
          filter = function (item) {
            return defaultFilter(item) && options.filter(item);
          };
        } else {
          filter = options.filter;
        }
      } else {
        filter = defaultFilter;
      }

      ids = this._data.getIds({
        filter: filter,
        order: options && options.order
      });
    } else {
      ids = [];
    }

    return ids;
  };

  /**
   * Get the DataSet to which this DataView is connected. In case there is a chain
   * of multiple DataViews, the root DataSet of this chain is returned.
   * @return {DataSet} dataSet
   */
  DataView.prototype.getDataSet = function () {
    var dataSet = this;
    while (dataSet instanceof DataView) {
      dataSet = dataSet._data;
    }
    return dataSet || null;
  };

  /**
   * Event listener. Will propagate all events from the connected data set to
   * the subscribers of the DataView, but will filter the items and only trigger
   * when there are changes in the filtered data set.
   * @param {String} event
   * @param {Object | null} params
   * @param {String} senderId
   * @private
   */
  DataView.prototype._onEvent = function (event, params, senderId) {
    var i, len, id, item;
    var ids = params && params.items;
    var data = this._data;
    var updatedData = [];
    var added = [];
    var updated = [];
    var removed = [];

    if (ids && data) {
      switch (event) {
        case 'add':
          // filter the ids of the added items
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            item = this.get(id);
            if (item) {
              this._ids[id] = true;
              added.push(id);
            }
          }

          break;

        case 'update':
          // determine the event from the views viewpoint: an updated
          // item can be added, updated, or removed from this view.
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            item = this.get(id);

            if (item) {
              if (this._ids[id]) {
                updated.push(id);
                updatedData.push(params.data[i]);
              } else {
                this._ids[id] = true;
                added.push(id);
              }
            } else {
              if (this._ids[id]) {
                delete this._ids[id];
                removed.push(id);
              } else {}
            }
          }

          break;

        case 'remove':
          // filter the ids of the removed items
          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            if (this._ids[id]) {
              delete this._ids[id];
              removed.push(id);
            }
          }

          break;
      }

      this.length += added.length - removed.length;

      if (added.length) {
        this._trigger('add', { items: added }, senderId);
      }
      if (updated.length) {
        this._trigger('update', { items: updated, data: updatedData }, senderId);
      }
      if (removed.length) {
        this._trigger('remove', { items: removed }, senderId);
      }
    }
  };

  // copy subscription functionality from DataSet
  DataView.prototype.on = DataSet.prototype.on;
  DataView.prototype.off = DataSet.prototype.off;
  DataView.prototype._trigger = DataSet.prototype._trigger;

  // TODO: make these functions deprecated (replaced with `on` and `off` since version 0.5)
  DataView.prototype.subscribe = DataView.prototype.on;
  DataView.prototype.unsubscribe = DataView.prototype.off;

  module.exports = DataView;

  // nothing interesting for me :-(

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var Emitter = __webpack_require__(13);
  var DataSet = __webpack_require__(8);
  var DataView = __webpack_require__(10);
  var util = __webpack_require__(1);
  var Point3d = __webpack_require__(14);
  var Point2d = __webpack_require__(12);
  var Camera = __webpack_require__(15);
  var Filter = __webpack_require__(16);
  var Slider = __webpack_require__(17);
  var StepNumber = __webpack_require__(18);

  /**
   * @constructor Graph3d
   * Graph3d displays data in 3d.
   *
   * Graph3d is developed in javascript as a Google Visualization Chart.
   *
   * @param {Element} container   The DOM element in which the Graph3d will
   *                              be created. Normally a div element.
   * @param {DataSet | DataView | Array} [data]
   * @param {Object} [options]
   */
  function Graph3d(container, data, options) {
    if (!(this instanceof Graph3d)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // create variables and set default values
    this.containerElement = container;
    this.width = '400px';
    this.height = '400px';
    this.margin = 10; // px
    this.defaultXCenter = '55%';
    this.defaultYCenter = '50%';

    this.xLabel = 'x';
    this.yLabel = 'y';
    this.zLabel = 'z';

    var passValueFn = function passValueFn(v) {
      return v;
    };
    this.xValueLabel = passValueFn;
    this.yValueLabel = passValueFn;
    this.zValueLabel = passValueFn;

    this.filterLabel = 'time';
    this.legendLabel = 'value';

    this.style = Graph3d.STYLE.DOT;
    this.showPerspective = true;
    this.showGrid = true;
    this.keepAspectRatio = true;
    this.showShadow = false;
    this.showGrayBottom = false; // TODO: this does not work correctly
    this.showTooltip = false;
    this.verticalRatio = 0.5; // 0.1 to 1.0, where 1.0 results in a 'cube'

    this.animationInterval = 1000; // milliseconds
    this.animationPreload = false;

    this.camera = new Camera();
    this.eye = new Point3d(0, 0, -1); // TODO: set eye.z about 3/4 of the width of the window?

    this.dataTable = null; // The original data table
    this.dataPoints = null; // The table with point objects

    // the column indexes
    this.colX = undefined;
    this.colY = undefined;
    this.colZ = undefined;
    this.colValue = undefined;
    this.colFilter = undefined;

    this.xMin = 0;
    this.xStep = undefined; // auto by default
    this.xMax = 1;
    this.yMin = 0;
    this.yStep = undefined; // auto by default
    this.yMax = 1;
    this.zMin = 0;
    this.zStep = undefined; // auto by default
    this.zMax = 1;
    this.valueMin = 0;
    this.valueMax = 1;
    this.xBarWidth = 1;
    this.yBarWidth = 1;
    // TODO: customize axis range

    // constants
    this.colorAxis = '#4D4D4D';
    this.colorGrid = '#D3D3D3';
    this.colorDot = '#7DC1FF';
    this.colorDotBorder = '#3267D2';

    // create a frame and canvas
    this.create();

    // apply options (also when undefined)
    this.setOptions(options);

    // apply data
    if (data) {
      this.setData(data);
    }
  }

  // Extend Graph3d with an Emitter mixin
  Emitter(Graph3d.prototype);

  /**
   * Calculate the scaling values, dependent on the range in x, y, and z direction
   */
  Graph3d.prototype._setScale = function () {
    this.scale = new Point3d(1 / (this.xMax - this.xMin), 1 / (this.yMax - this.yMin), 1 / (this.zMax - this.zMin));

    // keep aspect ration between x and y scale if desired
    if (this.keepAspectRatio) {
      if (this.scale.x < this.scale.y) {
        //noinspection JSSuspiciousNameCombination
        this.scale.y = this.scale.x;
      } else {
        //noinspection JSSuspiciousNameCombination
        this.scale.x = this.scale.y;
      }
    }

    // scale the vertical axis
    this.scale.z *= this.verticalRatio;
    // TODO: can this be automated? verticalRatio?

    // determine scale for (optional) value
    this.scale.value = 1 / (this.valueMax - this.valueMin);

    // position the camera arm
    var xCenter = (this.xMax + this.xMin) / 2 * this.scale.x;
    var yCenter = (this.yMax + this.yMin) / 2 * this.scale.y;
    var zCenter = (this.zMax + this.zMin) / 2 * this.scale.z;
    this.camera.setArmLocation(xCenter, yCenter, zCenter);
  };

  /**
   * Convert a 3D location to a 2D location on screen
   * http://en.wikipedia.org/wiki/3D_projection
   * @param {Point3d} point3d   A 3D point with parameters x, y, z
   * @return {Point2d} point2d  A 2D point with parameters x, y
   */
  Graph3d.prototype._convert3Dto2D = function (point3d) {
    var translation = this._convertPointToTranslation(point3d);
    return this._convertTranslationToScreen(translation);
  };

  /**
   * Convert a 3D location its translation seen from the camera
   * http://en.wikipedia.org/wiki/3D_projection
   * @param {Point3d} point3d    A 3D point with parameters x, y, z
   * @return {Point3d} translation A 3D point with parameters x, y, z This is
   *                   the translation of the point, seen from the
   *                   camera
   */
  Graph3d.prototype._convertPointToTranslation = function (point3d) {
    var ax = point3d.x * this.scale.x,
        ay = point3d.y * this.scale.y,
        az = point3d.z * this.scale.z,
        cx = this.camera.getCameraLocation().x,
        cy = this.camera.getCameraLocation().y,
        cz = this.camera.getCameraLocation().z,

    // calculate angles
    sinTx = Math.sin(this.camera.getCameraRotation().x),
        cosTx = Math.cos(this.camera.getCameraRotation().x),
        sinTy = Math.sin(this.camera.getCameraRotation().y),
        cosTy = Math.cos(this.camera.getCameraRotation().y),
        sinTz = Math.sin(this.camera.getCameraRotation().z),
        cosTz = Math.cos(this.camera.getCameraRotation().z),

    // calculate translation
    dx = cosTy * (sinTz * (ay - cy) + cosTz * (ax - cx)) - sinTy * (az - cz),
        dy = sinTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) + cosTx * (cosTz * (ay - cy) - sinTz * (ax - cx)),
        dz = cosTx * (cosTy * (az - cz) + sinTy * (sinTz * (ay - cy) + cosTz * (ax - cx))) - sinTx * (cosTz * (ay - cy) - sinTz * (ax - cx));

    return new Point3d(dx, dy, dz);
  };

  /**
   * Convert a translation point to a point on the screen
   * @param {Point3d} translation   A 3D point with parameters x, y, z This is
   *                    the translation of the point, seen from the
   *                    camera
   * @return {Point2d} point2d    A 2D point with parameters x, y
   */
  Graph3d.prototype._convertTranslationToScreen = function (translation) {
    var ex = this.eye.x,
        ey = this.eye.y,
        ez = this.eye.z,
        dx = translation.x,
        dy = translation.y,
        dz = translation.z;

    // calculate position on screen from translation
    var bx;
    var by;
    if (this.showPerspective) {
      bx = (dx - ex) * (ez / dz);
      by = (dy - ey) * (ez / dz);
    } else {
      bx = dx * -(ez / this.camera.getArmLength());
      by = dy * -(ez / this.camera.getArmLength());
    }

    // shift and scale the point to the center of the screen
    // use the width of the graph to scale both horizontally and vertically.
    return new Point2d(this.xcenter + bx * this.frame.canvas.clientWidth, this.ycenter - by * this.frame.canvas.clientWidth);
  };

  /**
   * Set the background styling for the graph
   * @param {string | {fill: string, stroke: string, strokeWidth: string}} backgroundColor
   */
  Graph3d.prototype._setBackgroundColor = function (backgroundColor) {
    var fill = 'white';
    var stroke = 'gray';
    var strokeWidth = 1;

    if (typeof backgroundColor === 'string') {
      fill = backgroundColor;
      stroke = 'none';
      strokeWidth = 0;
    } else if (typeof backgroundColor === 'object') {
      if (backgroundColor.fill !== undefined) fill = backgroundColor.fill;
      if (backgroundColor.stroke !== undefined) stroke = backgroundColor.stroke;
      if (backgroundColor.strokeWidth !== undefined) strokeWidth = backgroundColor.strokeWidth;
    } else if (backgroundColor === undefined) {} else {
      throw 'Unsupported type of backgroundColor';
    }

    this.frame.style.backgroundColor = fill;
    this.frame.style.borderColor = stroke;
    this.frame.style.borderWidth = strokeWidth + 'px';
    this.frame.style.borderStyle = 'solid';
  };

  /// enumerate the available styles
  Graph3d.STYLE = {
    BAR: 0,
    BARCOLOR: 1,
    BARSIZE: 2,
    DOT: 3,
    DOTLINE: 4,
    DOTCOLOR: 5,
    DOTSIZE: 6,
    GRID: 7,
    LINE: 8,
    SURFACE: 9
  };

  /**
   * Retrieve the style index from given styleName
   * @param {string} styleName  Style name such as 'dot', 'grid', 'dot-line'
   * @return {Number} styleNumber Enumeration value representing the style, or -1
   *                when not found
   */
  Graph3d.prototype._getStyleNumber = function (styleName) {
    switch (styleName) {
      case 'dot':
        return Graph3d.STYLE.DOT;
      case 'dot-line':
        return Graph3d.STYLE.DOTLINE;
      case 'dot-color':
        return Graph3d.STYLE.DOTCOLOR;
      case 'dot-size':
        return Graph3d.STYLE.DOTSIZE;
      case 'line':
        return Graph3d.STYLE.LINE;
      case 'grid':
        return Graph3d.STYLE.GRID;
      case 'surface':
        return Graph3d.STYLE.SURFACE;
      case 'bar':
        return Graph3d.STYLE.BAR;
      case 'bar-color':
        return Graph3d.STYLE.BARCOLOR;
      case 'bar-size':
        return Graph3d.STYLE.BARSIZE;
    }

    return -1;
  };

  /**
   * Determine the indexes of the data columns, based on the given style and data
   * @param {DataSet} data
   * @param {Number}  style
   */
  Graph3d.prototype._determineColumnIndexes = function (data, style) {
    if (this.style === Graph3d.STYLE.DOT || this.style === Graph3d.STYLE.DOTLINE || this.style === Graph3d.STYLE.LINE || this.style === Graph3d.STYLE.GRID || this.style === Graph3d.STYLE.SURFACE || this.style === Graph3d.STYLE.BAR) {
      // 3 columns expected, and optionally a 4th with filter values
      this.colX = 0;
      this.colY = 1;
      this.colZ = 2;
      this.colValue = undefined;

      if (data.getNumberOfColumns() > 3) {
        this.colFilter = 3;
      }
    } else if (this.style === Graph3d.STYLE.DOTCOLOR || this.style === Graph3d.STYLE.DOTSIZE || this.style === Graph3d.STYLE.BARCOLOR || this.style === Graph3d.STYLE.BARSIZE) {
      // 4 columns expected, and optionally a 5th with filter values
      this.colX = 0;
      this.colY = 1;
      this.colZ = 2;
      this.colValue = 3;

      if (data.getNumberOfColumns() > 4) {
        this.colFilter = 4;
      }
    } else {
      throw 'Unknown style "' + this.style + '"';
    }
  };

  Graph3d.prototype.getNumberOfRows = function (data) {
    return data.length;
  };

  Graph3d.prototype.getNumberOfColumns = function (data) {
    var counter = 0;
    for (var column in data[0]) {
      if (data[0].hasOwnProperty(column)) {
        counter++;
      }
    }
    return counter;
  };

  Graph3d.prototype.getDistinctValues = function (data, column) {
    var distinctValues = [];
    for (var i = 0; i < data.length; i++) {
      if (distinctValues.indexOf(data[i][column]) == -1) {
        distinctValues.push(data[i][column]);
      }
    }
    return distinctValues;
  };

  Graph3d.prototype.getColumnRange = function (data, column) {
    var minMax = { min: data[0][column], max: data[0][column] };
    for (var i = 0; i < data.length; i++) {
      if (minMax.min > data[i][column]) {
        minMax.min = data[i][column];
      }
      if (minMax.max < data[i][column]) {
        minMax.max = data[i][column];
      }
    }
    return minMax;
  };

  /**
   * Initialize the data from the data table. Calculate minimum and maximum values
   * and column index values
   * @param {Array | DataSet | DataView} rawData   The data containing the items for the Graph.
   * @param {Number}     style   Style Number
   */
  Graph3d.prototype._dataInitialize = function (rawData, style) {
    var me = this;

    // unsubscribe from the dataTable
    if (this.dataSet) {
      this.dataSet.off('*', this._onChange);
    }

    if (rawData === undefined) return;

    if (Array.isArray(rawData)) {
      rawData = new DataSet(rawData);
    }

    var data;
    if (rawData instanceof DataSet || rawData instanceof DataView) {
      data = rawData.get();
    } else {
      throw new Error('Array, DataSet, or DataView expected');
    }

    if (data.length == 0) return;

    this.dataSet = rawData;
    this.dataTable = data;

    // subscribe to changes in the dataset
    this._onChange = function () {
      me.setData(me.dataSet);
    };
    this.dataSet.on('*', this._onChange);

    // _determineColumnIndexes
    // getNumberOfRows (points)
    // getNumberOfColumns (x,y,z,v,t,t1,t2...)
    // getDistinctValues (unique values?)
    // getColumnRange

    // determine the location of x,y,z,value,filter columns
    this.colX = 'x';
    this.colY = 'y';
    this.colZ = 'z';
    this.colValue = 'style';
    this.colFilter = 'filter';

    // check if a filter column is provided
    if (data[0].hasOwnProperty('filter')) {
      if (this.dataFilter === undefined) {
        this.dataFilter = new Filter(rawData, this.colFilter, this);
        this.dataFilter.setOnLoadCallback(function () {
          me.redraw();
        });
      }
    }

    var withBars = this.style == Graph3d.STYLE.BAR || this.style == Graph3d.STYLE.BARCOLOR || this.style == Graph3d.STYLE.BARSIZE;

    // determine barWidth from data
    if (withBars) {
      if (this.defaultXBarWidth !== undefined) {
        this.xBarWidth = this.defaultXBarWidth;
      } else {
        var dataX = this.getDistinctValues(data, this.colX);
        this.xBarWidth = dataX[1] - dataX[0] || 1;
      }

      if (this.defaultYBarWidth !== undefined) {
        this.yBarWidth = this.defaultYBarWidth;
      } else {
        var dataY = this.getDistinctValues(data, this.colY);
        this.yBarWidth = dataY[1] - dataY[0] || 1;
      }
    }

    // calculate minimums and maximums
    var xRange = this.getColumnRange(data, this.colX);
    if (withBars) {
      xRange.min -= this.xBarWidth / 2;
      xRange.max += this.xBarWidth / 2;
    }
    this.xMin = this.defaultXMin !== undefined ? this.defaultXMin : xRange.min;
    this.xMax = this.defaultXMax !== undefined ? this.defaultXMax : xRange.max;
    if (this.xMax <= this.xMin) this.xMax = this.xMin + 1;
    this.xStep = this.defaultXStep !== undefined ? this.defaultXStep : (this.xMax - this.xMin) / 5;

    var yRange = this.getColumnRange(data, this.colY);
    if (withBars) {
      yRange.min -= this.yBarWidth / 2;
      yRange.max += this.yBarWidth / 2;
    }
    this.yMin = this.defaultYMin !== undefined ? this.defaultYMin : yRange.min;
    this.yMax = this.defaultYMax !== undefined ? this.defaultYMax : yRange.max;
    if (this.yMax <= this.yMin) this.yMax = this.yMin + 1;
    this.yStep = this.defaultYStep !== undefined ? this.defaultYStep : (this.yMax - this.yMin) / 5;

    var zRange = this.getColumnRange(data, this.colZ);
    this.zMin = this.defaultZMin !== undefined ? this.defaultZMin : zRange.min;
    this.zMax = this.defaultZMax !== undefined ? this.defaultZMax : zRange.max;
    if (this.zMax <= this.zMin) this.zMax = this.zMin + 1;
    this.zStep = this.defaultZStep !== undefined ? this.defaultZStep : (this.zMax - this.zMin) / 5;

    if (this.colValue !== undefined) {
      var valueRange = this.getColumnRange(data, this.colValue);
      this.valueMin = this.defaultValueMin !== undefined ? this.defaultValueMin : valueRange.min;
      this.valueMax = this.defaultValueMax !== undefined ? this.defaultValueMax : valueRange.max;
      if (this.valueMax <= this.valueMin) this.valueMax = this.valueMin + 1;
    }

    // set the scale dependent on the ranges.
    this._setScale();
  };

  /**
   * Filter the data based on the current filter
   * @param {Array} data
   * @return {Array} dataPoints   Array with point objects which can be drawn on screen
   */
  Graph3d.prototype._getDataPoints = function (data) {
    // TODO: store the created matrix dataPoints in the filters instead of reloading each time
    var x, y, i, z, obj, point;

    var dataPoints = [];

    if (this.style === Graph3d.STYLE.GRID || this.style === Graph3d.STYLE.SURFACE) {
      // copy all values from the google data table to a matrix
      // the provided values are supposed to form a grid of (x,y) positions

      // create two lists with all present x and y values
      var dataX = [];
      var dataY = [];
      for (i = 0; i < this.getNumberOfRows(data); i++) {
        x = data[i][this.colX] || 0;
        y = data[i][this.colY] || 0;

        if (dataX.indexOf(x) === -1) {
          dataX.push(x);
        }
        if (dataY.indexOf(y) === -1) {
          dataY.push(y);
        }
      }

      var sortNumber = function sortNumber(a, b) {
        return a - b;
      };
      dataX.sort(sortNumber);
      dataY.sort(sortNumber);

      // create a grid, a 2d matrix, with all values.
      var dataMatrix = []; // temporary data matrix
      for (i = 0; i < data.length; i++) {
        x = data[i][this.colX] || 0;
        y = data[i][this.colY] || 0;
        z = data[i][this.colZ] || 0;

        var xIndex = dataX.indexOf(x); // TODO: implement Array().indexOf() for Internet Explorer
        var yIndex = dataY.indexOf(y);

        if (dataMatrix[xIndex] === undefined) {
          dataMatrix[xIndex] = [];
        }

        var point3d = new Point3d();
        point3d.x = x;
        point3d.y = y;
        point3d.z = z;

        obj = {};
        obj.point = point3d;
        obj.trans = undefined;
        obj.screen = undefined;
        obj.bottom = new Point3d(x, y, this.zMin);

        dataMatrix[xIndex][yIndex] = obj;

        dataPoints.push(obj);
      }

      // fill in the pointers to the neighbors.
      for (x = 0; x < dataMatrix.length; x++) {
        for (y = 0; y < dataMatrix[x].length; y++) {
          if (dataMatrix[x][y]) {
            dataMatrix[x][y].pointRight = x < dataMatrix.length - 1 ? dataMatrix[x + 1][y] : undefined;
            dataMatrix[x][y].pointTop = y < dataMatrix[x].length - 1 ? dataMatrix[x][y + 1] : undefined;
            dataMatrix[x][y].pointCross = x < dataMatrix.length - 1 && y < dataMatrix[x].length - 1 ? dataMatrix[x + 1][y + 1] : undefined;
          }
        }
      }
    } else {
      // 'dot', 'dot-line', etc.
      // copy all values from the google data table to a list with Point3d objects
      for (i = 0; i < data.length; i++) {
        point = new Point3d();
        point.x = data[i][this.colX] || 0;
        point.y = data[i][this.colY] || 0;
        point.z = data[i][this.colZ] || 0;

        if (this.colValue !== undefined) {
          point.value = data[i][this.colValue] || 0;
        }

        obj = {};
        obj.point = point;
        obj.bottom = new Point3d(point.x, point.y, this.zMin);
        obj.trans = undefined;
        obj.screen = undefined;

        dataPoints.push(obj);
      }
    }

    return dataPoints;
  };

  /**
   * Create the main frame for the Graph3d.
   * This function is executed once when a Graph3d object is created. The frame
   * contains a canvas, and this canvas contains all objects like the axis and
   * nodes.
   */
  Graph3d.prototype.create = function () {
    // remove all elements from the container element.
    while (this.containerElement.hasChildNodes()) {
      this.containerElement.removeChild(this.containerElement.firstChild);
    }

    this.frame = document.createElement('div');
    this.frame.style.position = 'relative';
    this.frame.style.overflow = 'hidden';

    // create the graph canvas (HTML canvas element)
    this.frame.canvas = document.createElement('canvas');
    this.frame.canvas.style.position = 'relative';
    this.frame.appendChild(this.frame.canvas);
    //if (!this.frame.canvas.getContext) {
    {
      var noCanvas = document.createElement('DIV');
      noCanvas.style.color = 'red';
      noCanvas.style.fontWeight = 'bold';
      noCanvas.style.padding = '10px';
      noCanvas.innerHTML = 'Error: your browser does not support HTML canvas';
      this.frame.canvas.appendChild(noCanvas);
    }

    this.frame.filter = document.createElement('div');
    this.frame.filter.style.position = 'absolute';
    this.frame.filter.style.bottom = '0px';
    this.frame.filter.style.left = '0px';
    this.frame.filter.style.width = '100%';
    this.frame.appendChild(this.frame.filter);

    // add event listeners to handle moving and zooming the contents
    var me = this;
    var onmousedown = function onmousedown(event) {
      me._onMouseDown(event);
    };
    var ontouchstart = function ontouchstart(event) {
      me._onTouchStart(event);
    };
    var onmousewheel = function onmousewheel(event) {
      me._onWheel(event);
    };
    var ontooltip = function ontooltip(event) {
      me._onTooltip(event);
    };
    // TODO: these events are never cleaned up... can give a 'memory leakage'

    util.addEventListener(this.frame.canvas, 'keydown', onkeydown);
    util.addEventListener(this.frame.canvas, 'mousedown', onmousedown);
    util.addEventListener(this.frame.canvas, 'touchstart', ontouchstart);
    util.addEventListener(this.frame.canvas, 'mousewheel', onmousewheel);
    util.addEventListener(this.frame.canvas, 'mousemove', ontooltip);

    // add the new graph to the container element
    this.containerElement.appendChild(this.frame);
  };

  /**
   * Set a new size for the graph
   * @param {string} width   Width in pixels or percentage (for example '800px'
   *             or '50%')
   * @param {string} height  Height in pixels or percentage  (for example '400px'
   *             or '30%')
   */
  Graph3d.prototype.setSize = function (width, height) {
    this.frame.style.width = width;
    this.frame.style.height = height;

    this._resizeCanvas();
  };

  /**
   * Resize the canvas to the current size of the frame
   */
  Graph3d.prototype._resizeCanvas = function () {
    this.frame.canvas.style.width = '100%';
    this.frame.canvas.style.height = '100%';

    this.frame.canvas.width = this.frame.canvas.clientWidth;
    this.frame.canvas.height = this.frame.canvas.clientHeight;

    // adjust with for margin
    this.frame.filter.style.width = this.frame.canvas.clientWidth - 2 * 10 + 'px';
  };

  /**
   * Start animation
   */
  Graph3d.prototype.animationStart = function () {
    if (!this.frame.filter || !this.frame.filter.slider) throw 'No animation available';

    this.frame.filter.slider.play();
  };

  /**
   * Stop animation
   */
  Graph3d.prototype.animationStop = function () {
    if (!this.frame.filter || !this.frame.filter.slider) return;

    this.frame.filter.slider.stop();
  };

  /**
   * Resize the center position based on the current values in this.defaultXCenter
   * and this.defaultYCenter (which are strings with a percentage or a value
   * in pixels). The center positions are the variables this.xCenter
   * and this.yCenter
   */
  Graph3d.prototype._resizeCenter = function () {
    // calculate the horizontal center position
    if (this.defaultXCenter.charAt(this.defaultXCenter.length - 1) === '%') {
      this.xcenter = parseFloat(this.defaultXCenter) / 100 * this.frame.canvas.clientWidth;
    } else {
      this.xcenter = parseFloat(this.defaultXCenter); // supposed to be in px
    }

    // calculate the vertical center position
    if (this.defaultYCenter.charAt(this.defaultYCenter.length - 1) === '%') {
      this.ycenter = parseFloat(this.defaultYCenter) / 100 * (this.frame.canvas.clientHeight - this.frame.filter.clientHeight);
    } else {
      this.ycenter = parseFloat(this.defaultYCenter); // supposed to be in px
    }
  };

  /**
   * Set the rotation and distance of the camera
   * @param {Object} pos   An object with the camera position. The object
   *             contains three parameters:
   *             - horizontal {Number}
   *             The horizontal rotation, between 0 and 2*PI.
   *             Optional, can be left undefined.
   *             - vertical {Number}
   *             The vertical rotation, between 0 and 0.5*PI
   *             if vertical=0.5*PI, the graph is shown from the
   *             top. Optional, can be left undefined.
   *             - distance {Number}
   *             The (normalized) distance of the camera to the
   *             center of the graph, a value between 0.71 and 5.0.
   *             Optional, can be left undefined.
   */
  Graph3d.prototype.setCameraPosition = function (pos) {
    if (pos === undefined) {
      return;
    }

    if (pos.horizontal !== undefined && pos.vertical !== undefined) {
      this.camera.setArmRotation(pos.horizontal, pos.vertical);
    }

    if (pos.distance !== undefined) {
      this.camera.setArmLength(pos.distance);
    }

    this.redraw();
  };

  /**
   * Retrieve the current camera rotation
   * @return {object}   An object with parameters horizontal, vertical, and
   *          distance
   */
  Graph3d.prototype.getCameraPosition = function () {
    var pos = this.camera.getArmRotation();
    pos.distance = this.camera.getArmLength();
    return pos;
  };

  /**
   * Load data into the 3D Graph
   */
  Graph3d.prototype._readData = function (data) {
    // read the data
    this._dataInitialize(data, this.style);

    if (this.dataFilter) {
      // apply filtering
      this.dataPoints = this.dataFilter._getDataPoints();
    } else {
      // no filtering. load all data
      this.dataPoints = this._getDataPoints(this.dataTable);
    }

    // draw the filter
    this._redrawFilter();
  };

  /**
   * Replace the dataset of the Graph3d
   * @param {Array | DataSet | DataView} data
   */
  Graph3d.prototype.setData = function (data) {
    this._readData(data);
    this.redraw();

    // start animation when option is true
    if (this.animationAutoStart && this.dataFilter) {
      this.animationStart();
    }
  };

  /**
   * Update the options. Options will be merged with current options
   * @param {Object} options
   */
  Graph3d.prototype.setOptions = function (options) {
    var cameraPosition = undefined;

    this.animationStop();

    if (options !== undefined) {
      // retrieve parameter values
      if (options.width !== undefined) this.width = options.width;
      if (options.height !== undefined) this.height = options.height;

      if (options.xCenter !== undefined) this.defaultXCenter = options.xCenter;
      if (options.yCenter !== undefined) this.defaultYCenter = options.yCenter;

      if (options.filterLabel !== undefined) this.filterLabel = options.filterLabel;
      if (options.legendLabel !== undefined) this.legendLabel = options.legendLabel;
      if (options.xLabel !== undefined) this.xLabel = options.xLabel;
      if (options.yLabel !== undefined) this.yLabel = options.yLabel;
      if (options.zLabel !== undefined) this.zLabel = options.zLabel;

      if (options.xValueLabel !== undefined) this.xValueLabel = options.xValueLabel;
      if (options.yValueLabel !== undefined) this.yValueLabel = options.yValueLabel;
      if (options.zValueLabel !== undefined) this.zValueLabel = options.zValueLabel;

      if (options.style !== undefined) {
        var styleNumber = this._getStyleNumber(options.style);
        if (styleNumber !== -1) {
          this.style = styleNumber;
        }
      }
      if (options.showGrid !== undefined) this.showGrid = options.showGrid;
      if (options.showPerspective !== undefined) this.showPerspective = options.showPerspective;
      if (options.showShadow !== undefined) this.showShadow = options.showShadow;
      if (options.tooltip !== undefined) this.showTooltip = options.tooltip;
      if (options.showAnimationControls !== undefined) this.showAnimationControls = options.showAnimationControls;
      if (options.keepAspectRatio !== undefined) this.keepAspectRatio = options.keepAspectRatio;
      if (options.verticalRatio !== undefined) this.verticalRatio = options.verticalRatio;

      if (options.animationInterval !== undefined) this.animationInterval = options.animationInterval;
      if (options.animationPreload !== undefined) this.animationPreload = options.animationPreload;
      if (options.animationAutoStart !== undefined) this.animationAutoStart = options.animationAutoStart;

      if (options.xBarWidth !== undefined) this.defaultXBarWidth = options.xBarWidth;
      if (options.yBarWidth !== undefined) this.defaultYBarWidth = options.yBarWidth;

      if (options.xMin !== undefined) this.defaultXMin = options.xMin;
      if (options.xStep !== undefined) this.defaultXStep = options.xStep;
      if (options.xMax !== undefined) this.defaultXMax = options.xMax;
      if (options.yMin !== undefined) this.defaultYMin = options.yMin;
      if (options.yStep !== undefined) this.defaultYStep = options.yStep;
      if (options.yMax !== undefined) this.defaultYMax = options.yMax;
      if (options.zMin !== undefined) this.defaultZMin = options.zMin;
      if (options.zStep !== undefined) this.defaultZStep = options.zStep;
      if (options.zMax !== undefined) this.defaultZMax = options.zMax;
      if (options.valueMin !== undefined) this.defaultValueMin = options.valueMin;
      if (options.valueMax !== undefined) this.defaultValueMax = options.valueMax;

      if (options.cameraPosition !== undefined) cameraPosition = options.cameraPosition;

      if (cameraPosition !== undefined) {
        this.camera.setArmRotation(cameraPosition.horizontal, cameraPosition.vertical);
        this.camera.setArmLength(cameraPosition.distance);
      } else {
        this.camera.setArmRotation(1, 0.5);
        this.camera.setArmLength(1.7);
      }
    }

    this._setBackgroundColor(options && options.backgroundColor);

    this.setSize(this.width, this.height);

    // re-load the data
    if (this.dataTable) {
      this.setData(this.dataTable);
    }

    // start animation when option is true
    if (this.animationAutoStart && this.dataFilter) {
      this.animationStart();
    }
  };

  /**
   * Redraw the Graph.
   */
  Graph3d.prototype.redraw = function () {
    if (this.dataPoints === undefined) {
      throw 'Error: graph data not initialized';
    }

    this._resizeCanvas();
    this._resizeCenter();
    this._redrawSlider();
    this._redrawClear();
    this._redrawAxis();

    if (this.style === Graph3d.STYLE.GRID || this.style === Graph3d.STYLE.SURFACE) {
      this._redrawDataGrid();
    } else if (this.style === Graph3d.STYLE.LINE) {
      this._redrawDataLine();
    } else if (this.style === Graph3d.STYLE.BAR || this.style === Graph3d.STYLE.BARCOLOR || this.style === Graph3d.STYLE.BARSIZE) {
      this._redrawDataBar();
    } else {
      // style is DOT, DOTLINE, DOTCOLOR, DOTSIZE
      this._redrawDataDot();
    }

    this._redrawInfo();
    this._redrawLegend();
  };

  /**
   * Clear the canvas before redrawing
   */
  Graph3d.prototype._redrawClear = function () {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /**
   * Redraw the legend showing the colors
   */
  Graph3d.prototype._redrawLegend = function () {
    var y;

    if (this.style === Graph3d.STYLE.DOTCOLOR || this.style === Graph3d.STYLE.DOTSIZE) {

      var dotSize = this.frame.clientWidth * 0.02;

      var widthMin, widthMax;
      if (this.style === Graph3d.STYLE.DOTSIZE) {
        widthMin = dotSize / 2; // px
        widthMax = dotSize / 2 + dotSize * 2; // Todo: put this in one function
      } else {
        widthMin = 20; // px
        widthMax = 20; // px
      }

      var height = Math.max(this.frame.clientHeight * 0.25, 100);
      var top = this.margin;
      var right = this.frame.clientWidth - this.margin;
      var left = right - widthMax;
      var bottom = top + height;
    }

    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.font = '14px arial'; // TODO: put in options

    if (this.style === Graph3d.STYLE.DOTCOLOR) {
      // draw the color bar
      var ymin = 0;
      var ymax = height; // Todo: make height customizable
      for (y = ymin; y < ymax; y++) {
        var f = (y - ymin) / (ymax - ymin);

        //var width = (dotSize / 2 + (1-f) * dotSize * 2); // Todo: put this in one function
        var hue = f * 240;
        var color = this._hsv2rgb(hue, 1, 1);

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(left, top + y);
        ctx.lineTo(right, top + y);
        ctx.stroke();
      }

      ctx.strokeStyle = this.colorAxis;
      ctx.strokeRect(left, top, widthMax, height);
    }

    if (this.style === Graph3d.STYLE.DOTSIZE) {
      // draw border around color bar
      ctx.strokeStyle = this.colorAxis;
      ctx.fillStyle = this.colorDot;
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right - widthMax + widthMin, bottom);
      ctx.lineTo(left, bottom);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    if (this.style === Graph3d.STYLE.DOTCOLOR || this.style === Graph3d.STYLE.DOTSIZE) {
      // print values along the color bar
      var gridLineLen = 5; // px
      var step = new StepNumber(this.valueMin, this.valueMax, (this.valueMax - this.valueMin) / 5, true);
      step.start();
      if (step.getCurrent() < this.valueMin) {
        step.next();
      }
      while (!step.end()) {
        y = bottom - (step.getCurrent() - this.valueMin) / (this.valueMax - this.valueMin) * height;

        ctx.beginPath();
        ctx.moveTo(left - gridLineLen, y);
        ctx.lineTo(left, y);
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.colorAxis;
        ctx.fillText(step.getCurrent(), left - 2 * gridLineLen, y);

        step.next();
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      var label = this.legendLabel;
      ctx.fillText(label, right, bottom + this.margin);
    }
  };

  /**
   * Redraw the filter
   */
  Graph3d.prototype._redrawFilter = function () {
    this.frame.filter.innerHTML = '';

    if (this.dataFilter) {
      var options = {
        'visible': this.showAnimationControls
      };
      var slider = new Slider(this.frame.filter, options);
      this.frame.filter.slider = slider;

      // TODO: css here is not nice here...
      this.frame.filter.style.padding = '10px';
      //this.frame.filter.style.backgroundColor = '#EFEFEF';

      slider.setValues(this.dataFilter.values);
      slider.setPlayInterval(this.animationInterval);

      // create an event handler
      var me = this;
      var onchange = function onchange() {
        var index = slider.getIndex();

        me.dataFilter.selectValue(index);
        me.dataPoints = me.dataFilter._getDataPoints();

        me.redraw();
      };
      slider.setOnChangeCallback(onchange);
    } else {
      this.frame.filter.slider = undefined;
    }
  };

  /**
   * Redraw the slider
   */
  Graph3d.prototype._redrawSlider = function () {
    if (this.frame.filter.slider !== undefined) {
      this.frame.filter.slider.redraw();
    }
  };

  /**
   * Redraw common information
   */
  Graph3d.prototype._redrawInfo = function () {
    if (this.dataFilter) {
      var canvas = this.frame.canvas;
      var ctx = canvas.getContext('2d');

      ctx.font = '14px arial'; // TODO: put in options
      ctx.lineStyle = 'gray';
      ctx.fillStyle = 'gray';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      var x = this.margin;
      var y = this.margin;
      ctx.fillText(this.dataFilter.getLabel() + ': ' + this.dataFilter.getSelectedValue(), x, y);
    }
  };

  /**
   * Redraw the axis
   */
  Graph3d.prototype._redrawAxis = function () {
    var canvas = this.frame.canvas,
        ctx = canvas.getContext('2d'),
        from,
        to,
        step,
        prettyStep,
        text,
        xText,
        yText,
        zText,
        offset,
        xOffset,
        yOffset,
        xMin2d,
        xMax2d;

    // TODO: get the actual rendered style of the containerElement
    //ctx.font = this.containerElement.style.font;
    ctx.font = 24 / this.camera.getArmLength() + 'px arial';

    // calculate the length for the short grid lines
    var gridLenX = 0.025 / this.scale.x;
    var gridLenY = 0.025 / this.scale.y;
    var textMargin = 5 / this.camera.getArmLength(); // px
    var armAngle = this.camera.getArmRotation().horizontal;

    // draw x-grid lines
    ctx.lineWidth = 1;
    prettyStep = this.defaultXStep === undefined;
    step = new StepNumber(this.xMin, this.xMax, this.xStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.xMin) {
      step.next();
    }
    while (!step.end()) {
      var x = step.getCurrent();

      if (this.showGrid) {
        from = this._convert3Dto2D(new Point3d(x, this.yMin, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMax, this.zMin));
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      } else {
        from = this._convert3Dto2D(new Point3d(x, this.yMin, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMin + gridLenX, this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        from = this._convert3Dto2D(new Point3d(x, this.yMax, this.zMin));
        to = this._convert3Dto2D(new Point3d(x, this.yMax - gridLenX, this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      yText = Math.cos(armAngle) > 0 ? this.yMin : this.yMax;
      text = this._convert3Dto2D(new Point3d(x, yText, this.zMin));
      if (Math.cos(armAngle * 2) > 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        text.y += textMargin;
      } else if (Math.sin(armAngle * 2) < 0) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      } else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText('  ' + this.xValueLabel(step.getCurrent()) + '  ', text.x, text.y);

      step.next();
    }

    // draw y-grid lines
    ctx.lineWidth = 1;
    prettyStep = this.defaultYStep === undefined;
    step = new StepNumber(this.yMin, this.yMax, this.yStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.yMin) {
      step.next();
    }
    while (!step.end()) {
      if (this.showGrid) {
        from = this._convert3Dto2D(new Point3d(this.xMin, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMax, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      } else {
        from = this._convert3Dto2D(new Point3d(this.xMin, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMin + gridLenY, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        from = this._convert3Dto2D(new Point3d(this.xMax, step.getCurrent(), this.zMin));
        to = this._convert3Dto2D(new Point3d(this.xMax - gridLenY, step.getCurrent(), this.zMin));
        ctx.strokeStyle = this.colorAxis;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      xText = Math.sin(armAngle) > 0 ? this.xMin : this.xMax;
      text = this._convert3Dto2D(new Point3d(xText, step.getCurrent(), this.zMin));
      if (Math.cos(armAngle * 2) < 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        text.y += textMargin;
      } else if (Math.sin(armAngle * 2) > 0) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      } else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText('  ' + this.yValueLabel(step.getCurrent()) + '  ', text.x, text.y);

      step.next();
    }

    // draw z-grid lines and axis
    ctx.lineWidth = 1;
    prettyStep = this.defaultZStep === undefined;
    step = new StepNumber(this.zMin, this.zMax, this.zStep, prettyStep);
    step.start();
    if (step.getCurrent() < this.zMin) {
      step.next();
    }
    xText = Math.cos(armAngle) > 0 ? this.xMin : this.xMax;
    yText = Math.sin(armAngle) < 0 ? this.yMin : this.yMax;
    while (!step.end()) {
      // TODO: make z-grid lines really 3d?
      from = this._convert3Dto2D(new Point3d(xText, yText, step.getCurrent()));
      ctx.strokeStyle = this.colorAxis;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(from.x - textMargin, from.y);
      ctx.stroke();

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(this.zValueLabel(step.getCurrent()) + ' ', from.x - 5, from.y);

      step.next();
    }
    ctx.lineWidth = 1;
    from = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
    to = this._convert3Dto2D(new Point3d(xText, yText, this.zMax));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // draw x-axis
    ctx.lineWidth = 1;
    // line at yMin
    xMin2d = this._convert3Dto2D(new Point3d(this.xMin, this.yMin, this.zMin));
    xMax2d = this._convert3Dto2D(new Point3d(this.xMax, this.yMin, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(xMin2d.x, xMin2d.y);
    ctx.lineTo(xMax2d.x, xMax2d.y);
    ctx.stroke();
    // line at ymax
    xMin2d = this._convert3Dto2D(new Point3d(this.xMin, this.yMax, this.zMin));
    xMax2d = this._convert3Dto2D(new Point3d(this.xMax, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(xMin2d.x, xMin2d.y);
    ctx.lineTo(xMax2d.x, xMax2d.y);
    ctx.stroke();

    // draw y-axis
    ctx.lineWidth = 1;
    // line at xMin
    from = this._convert3Dto2D(new Point3d(this.xMin, this.yMin, this.zMin));
    to = this._convert3Dto2D(new Point3d(this.xMin, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    // line at xMax
    from = this._convert3Dto2D(new Point3d(this.xMax, this.yMin, this.zMin));
    to = this._convert3Dto2D(new Point3d(this.xMax, this.yMax, this.zMin));
    ctx.strokeStyle = this.colorAxis;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    // draw x-label
    var xLabel = this.xLabel;
    if (xLabel.length > 0) {
      yOffset = 0.1 / this.scale.y;
      xText = (this.xMin + this.xMax) / 2;
      yText = Math.cos(armAngle) > 0 ? this.yMin - yOffset : this.yMax + yOffset;
      text = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
      if (Math.cos(armAngle * 2) > 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
      } else if (Math.sin(armAngle * 2) < 0) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      } else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(xLabel, text.x, text.y);
    }

    // draw y-label
    var yLabel = this.yLabel;
    if (yLabel.length > 0) {
      xOffset = 0.1 / this.scale.x;
      xText = Math.sin(armAngle) > 0 ? this.xMin - xOffset : this.xMax + xOffset;
      yText = (this.yMin + this.yMax) / 2;
      text = this._convert3Dto2D(new Point3d(xText, yText, this.zMin));
      if (Math.cos(armAngle * 2) < 0) {
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
      } else if (Math.sin(armAngle * 2) > 0) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
      } else {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
      }
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(yLabel, text.x, text.y);
    }

    // draw z-label
    var zLabel = this.zLabel;
    if (zLabel.length > 0) {
      offset = 30; // pixels.  // TODO: relate to the max width of the values on the z axis?
      xText = Math.cos(armAngle) > 0 ? this.xMin : this.xMax;
      yText = Math.sin(armAngle) < 0 ? this.yMin : this.yMax;
      zText = (this.zMin + this.zMax) / 2;
      text = this._convert3Dto2D(new Point3d(xText, yText, zText));
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.colorAxis;
      ctx.fillText(zLabel, text.x - offset, text.y);
    }
  };

  /**
   * Calculate the color based on the given value.
   * @param {Number} H   Hue, a value be between 0 and 360
   * @param {Number} S   Saturation, a value between 0 and 1
   * @param {Number} V   Value, a value between 0 and 1
   */
  Graph3d.prototype._hsv2rgb = function (H, S, V) {
    var R, G, B, C, Hi, X;

    C = V * S;
    Hi = Math.floor(H / 60); // hi = 0,1,2,3,4,5
    X = C * (1 - Math.abs(H / 60 % 2 - 1));

    switch (Hi) {
      case 0:
        R = C;G = X;B = 0;break;
      case 1:
        R = X;G = C;B = 0;break;
      case 2:
        R = 0;G = C;B = X;break;
      case 3:
        R = 0;G = X;B = C;break;
      case 4:
        R = X;G = 0;B = C;break;
      case 5:
        R = C;G = 0;B = X;break;

      default:
        R = 0;G = 0;B = 0;break;
    }

    return 'RGB(' + parseInt(R * 255) + ',' + parseInt(G * 255) + ',' + parseInt(B * 255) + ')';
  };

  /**
   * Draw all datapoints as a grid
   * This function can be used when the style is 'grid'
   */
  Graph3d.prototype._redrawDataGrid = function () {
    var canvas = this.frame.canvas,
        ctx = canvas.getContext('2d'),
        point,
        right,
        top,
        cross,
        i,
        topSideVisible,
        fillStyle,
        strokeStyle,
        lineWidth,
        h,
        s,
        v,
        zAvg;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0) return; // TODO: throw exception?

    // calculate the translations and screen position of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);

      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the translation of the point at the bottom (needed for sorting)
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // sort the points on depth of their (x,y) position (not on z)
    var sortDepth = function sortDepth(a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    if (this.style === Graph3d.STYLE.SURFACE) {
      for (i = 0; i < this.dataPoints.length; i++) {
        point = this.dataPoints[i];
        right = this.dataPoints[i].pointRight;
        top = this.dataPoints[i].pointTop;
        cross = this.dataPoints[i].pointCross;

        if (point !== undefined && right !== undefined && top !== undefined && cross !== undefined) {

          if (this.showGrayBottom || this.showShadow) {
            // calculate the cross product of the two vectors from center
            // to left and right, in order to know whether we are looking at the
            // bottom or at the top side. We can also use the cross product
            // for calculating light intensity
            var aDiff = Point3d.subtract(cross.trans, point.trans);
            var bDiff = Point3d.subtract(top.trans, right.trans);
            var crossproduct = Point3d.crossProduct(aDiff, bDiff);
            var len = crossproduct.length();
            // FIXME: there is a bug with determining the surface side (shadow or colored)

            topSideVisible = crossproduct.z > 0;
          } else {
            topSideVisible = true;
          }

          if (topSideVisible) {
            // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
            zAvg = (point.point.z + right.point.z + top.point.z + cross.point.z) / 4;
            h = (1 - (zAvg - this.zMin) * this.scale.z / this.verticalRatio) * 240;
            s = 1; // saturation

            if (this.showShadow) {
              v = Math.min(1 + crossproduct.x / len / 2, 1); // value. TODO: scale
              fillStyle = this._hsv2rgb(h, s, v);
              strokeStyle = fillStyle;
            } else {
              v = 1;
              fillStyle = this._hsv2rgb(h, s, v);
              strokeStyle = this.colorAxis;
            }
          } else {
            fillStyle = 'gray';
            strokeStyle = this.colorAxis;
          }
          lineWidth = 0.5;

          ctx.lineWidth = lineWidth;
          ctx.fillStyle = fillStyle;
          ctx.strokeStyle = strokeStyle;
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(right.screen.x, right.screen.y);
          ctx.lineTo(cross.screen.x, cross.screen.y);
          ctx.lineTo(top.screen.x, top.screen.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }
    } else {
      // grid style
      for (i = 0; i < this.dataPoints.length; i++) {
        point = this.dataPoints[i];
        right = this.dataPoints[i].pointRight;
        top = this.dataPoints[i].pointTop;

        if (point !== undefined) {
          if (this.showPerspective) {
            lineWidth = 2 / -point.trans.z;
          } else {
            lineWidth = 2 * -(this.eye.z / this.camera.getArmLength());
          }
        }

        if (point !== undefined && right !== undefined) {
          // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
          zAvg = (point.point.z + right.point.z) / 2;
          h = (1 - (zAvg - this.zMin) * this.scale.z / this.verticalRatio) * 240;

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = this._hsv2rgb(h, 1, 1);
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(right.screen.x, right.screen.y);
          ctx.stroke();
        }

        if (point !== undefined && top !== undefined) {
          // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
          zAvg = (point.point.z + top.point.z) / 2;
          h = (1 - (zAvg - this.zMin) * this.scale.z / this.verticalRatio) * 240;

          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = this._hsv2rgb(h, 1, 1);
          ctx.beginPath();
          ctx.moveTo(point.screen.x, point.screen.y);
          ctx.lineTo(top.screen.x, top.screen.y);
          ctx.stroke();
        }
      }
    }
  };

  /**
   * Draw all datapoints as dots.
   * This function can be used when the style is 'dot' or 'dot-line'
   */
  Graph3d.prototype._redrawDataDot = function () {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    var i;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0) return; // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);
      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the distance from the point at the bottom to the camera
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // order the translated points by depth
    var sortDepth = function sortDepth(a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    // draw the datapoints as colored circles
    var dotSize = this.frame.clientWidth * 0.02; // px
    for (i = 0; i < this.dataPoints.length; i++) {
      var point = this.dataPoints[i];

      if (this.style === Graph3d.STYLE.DOTLINE) {
        // draw a vertical line from the bottom to the graph value
        //var from = this._convert3Dto2D(new Point3d(point.point.x, point.point.y, this.zMin));
        var from = this._convert3Dto2D(point.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorGrid;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(point.screen.x, point.screen.y);
        ctx.stroke();
      }

      // calculate radius for the circle
      var size;
      if (this.style === Graph3d.STYLE.DOTSIZE) {
        size = dotSize / 2 + 2 * dotSize * (point.point.value - this.valueMin) / (this.valueMax - this.valueMin);
      } else {
        size = dotSize;
      }

      var radius;
      if (this.showPerspective) {
        radius = size / -point.trans.z;
      } else {
        radius = size * -(this.eye.z / this.camera.getArmLength());
      }
      if (radius < 0) {
        radius = 0;
      }

      var hue, color, borderColor;
      if (this.style === Graph3d.STYLE.DOTCOLOR) {
        // calculate the color based on the value
        hue = (1 - (point.point.value - this.valueMin) * this.scale.value) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      } else if (this.style === Graph3d.STYLE.DOTSIZE) {
        color = this.colorDot;
        borderColor = this.colorDotBorder;
      } else {
        // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
        hue = (1 - (point.point.z - this.zMin) * this.scale.z / this.verticalRatio) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }

      // draw the circle
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.screen.x, point.screen.y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
    }
  };

  /**
   * Draw all datapoints as bars.
   * This function can be used when the style is 'bar', 'bar-color', or 'bar-size'
   */
  Graph3d.prototype._redrawDataBar = function () {
    var canvas = this.frame.canvas;
    var ctx = canvas.getContext('2d');
    var i, j, surface, corners;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0) return; // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);
      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;

      // calculate the distance from the point at the bottom to the camera
      var transBottom = this._convertPointToTranslation(this.dataPoints[i].bottom);
      this.dataPoints[i].dist = this.showPerspective ? transBottom.length() : -transBottom.z;
    }

    // order the translated points by depth
    var sortDepth = function sortDepth(a, b) {
      return b.dist - a.dist;
    };
    this.dataPoints.sort(sortDepth);

    // draw the datapoints as bars
    var xWidth = this.xBarWidth / 2;
    var yWidth = this.yBarWidth / 2;
    for (i = 0; i < this.dataPoints.length; i++) {
      var point = this.dataPoints[i];

      // determine color
      var hue, color, borderColor;
      if (this.style === Graph3d.STYLE.BARCOLOR) {
        // calculate the color based on the value
        hue = (1 - (point.point.value - this.valueMin) * this.scale.value) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      } else if (this.style === Graph3d.STYLE.BARSIZE) {
        color = this.colorDot;
        borderColor = this.colorDotBorder;
      } else {
        // calculate Hue from the current value. At zMin the hue is 240, at zMax the hue is 0
        hue = (1 - (point.point.z - this.zMin) * this.scale.z / this.verticalRatio) * 240;
        color = this._hsv2rgb(hue, 1, 1);
        borderColor = this._hsv2rgb(hue, 1, 0.8);
      }

      // calculate size for the bar
      if (this.style === Graph3d.STYLE.BARSIZE) {
        xWidth = this.xBarWidth / 2 * ((point.point.value - this.valueMin) / (this.valueMax - this.valueMin) * 0.8 + 0.2);
        yWidth = this.yBarWidth / 2 * ((point.point.value - this.valueMin) / (this.valueMax - this.valueMin) * 0.8 + 0.2);
      }

      // calculate all corner points
      var me = this;
      var point3d = point.point;
      var top = [{ point: new Point3d(point3d.x - xWidth, point3d.y - yWidth, point3d.z) }, { point: new Point3d(point3d.x + xWidth, point3d.y - yWidth, point3d.z) }, { point: new Point3d(point3d.x + xWidth, point3d.y + yWidth, point3d.z) }, { point: new Point3d(point3d.x - xWidth, point3d.y + yWidth, point3d.z) }];
      var bottom = [{ point: new Point3d(point3d.x - xWidth, point3d.y - yWidth, this.zMin) }, { point: new Point3d(point3d.x + xWidth, point3d.y - yWidth, this.zMin) }, { point: new Point3d(point3d.x + xWidth, point3d.y + yWidth, this.zMin) }, { point: new Point3d(point3d.x - xWidth, point3d.y + yWidth, this.zMin) }];

      // calculate screen location of the points
      top.forEach(function (obj) {
        obj.screen = me._convert3Dto2D(obj.point);
      });
      bottom.forEach(function (obj) {
        obj.screen = me._convert3Dto2D(obj.point);
      });

      // create five sides, calculate both corner points and center points
      var surfaces = [{ corners: top, center: Point3d.avg(bottom[0].point, bottom[2].point) }, { corners: [top[0], top[1], bottom[1], bottom[0]], center: Point3d.avg(bottom[1].point, bottom[0].point) }, { corners: [top[1], top[2], bottom[2], bottom[1]], center: Point3d.avg(bottom[2].point, bottom[1].point) }, { corners: [top[2], top[3], bottom[3], bottom[2]], center: Point3d.avg(bottom[3].point, bottom[2].point) }, { corners: [top[3], top[0], bottom[0], bottom[3]], center: Point3d.avg(bottom[0].point, bottom[3].point) }];
      point.surfaces = surfaces;

      // calculate the distance of each of the surface centers to the camera
      for (j = 0; j < surfaces.length; j++) {
        surface = surfaces[j];
        var transCenter = this._convertPointToTranslation(surface.center);
        surface.dist = this.showPerspective ? transCenter.length() : -transCenter.z;
        // TODO: this dept calculation doesn't work 100% of the cases due to perspective,
        //     but the current solution is fast/simple and works in 99.9% of all cases
        //     the issue is visible in example 14, with graph.setCameraPosition({horizontal: 2.97, vertical: 0.5, distance: 0.9})
      }

      // order the surfaces by their (translated) depth
      surfaces.sort(function (a, b) {
        var diff = b.dist - a.dist;
        if (diff) return diff;

        // if equal depth, sort the top surface last
        if (a.corners === top) return 1;
        if (b.corners === top) return -1;

        // both are equal
        return 0;
      });

      // draw the ordered surfaces
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = color;
      // NOTE: we start at j=2 instead of j=0 as we don't need to draw the two surfaces at the backside
      for (j = 2; j < surfaces.length; j++) {
        surface = surfaces[j];
        corners = surface.corners;
        ctx.beginPath();
        ctx.moveTo(corners[3].screen.x, corners[3].screen.y);
        ctx.lineTo(corners[0].screen.x, corners[0].screen.y);
        ctx.lineTo(corners[1].screen.x, corners[1].screen.y);
        ctx.lineTo(corners[2].screen.x, corners[2].screen.y);
        ctx.lineTo(corners[3].screen.x, corners[3].screen.y);
        ctx.fill();
        ctx.stroke();
      }
    }
  };

  /**
   * Draw a line through all datapoints.
   * This function can be used when the style is 'line'
   */
  Graph3d.prototype._redrawDataLine = function () {
    var canvas = this.frame.canvas,
        ctx = canvas.getContext('2d'),
        point,
        i;

    if (this.dataPoints === undefined || this.dataPoints.length <= 0) return; // TODO: throw exception?

    // calculate the translations of all points
    for (i = 0; i < this.dataPoints.length; i++) {
      var trans = this._convertPointToTranslation(this.dataPoints[i].point);
      var screen = this._convertTranslationToScreen(trans);

      this.dataPoints[i].trans = trans;
      this.dataPoints[i].screen = screen;
    }

    // start the line
    if (this.dataPoints.length > 0) {
      point = this.dataPoints[0];

      ctx.lineWidth = 1; // TODO: make customizable
      ctx.strokeStyle = 'blue'; // TODO: make customizable
      ctx.beginPath();
      ctx.moveTo(point.screen.x, point.screen.y);
    }

    // draw the datapoints as colored circles
    for (i = 1; i < this.dataPoints.length; i++) {
      point = this.dataPoints[i];
      ctx.lineTo(point.screen.x, point.screen.y);
    }

    // finish the line
    if (this.dataPoints.length > 0) {
      ctx.stroke();
    }
  };

  /**
   * Start a moving operation inside the provided parent element
   * @param {Event}     event     The event that occurred (required for
   *                  retrieving the  mouse position)
   */
  Graph3d.prototype._onMouseDown = function (event) {
    event = event || window.event;

    // check if mouse is still down (may be up when focus is lost for example
    // in an iframe)
    if (this.leftButtonDown) {
      this._onMouseUp(event);
    }

    // only react on left mouse button down
    this.leftButtonDown = event.which ? event.which === 1 : event.button === 1;
    if (!this.leftButtonDown && !this.touchDown) return;

    // get mouse position (different code for IE and all other browsers)
    this.startMouseX = getMouseX(event);
    this.startMouseY = getMouseY(event);

    this.startStart = new Date(this.start);
    this.startEnd = new Date(this.end);
    this.startArmRotation = this.camera.getArmRotation();

    this.frame.style.cursor = 'move';

    // add event listeners to handle moving the contents
    // we store the function onmousemove and onmouseup in the graph, so we can
    // remove the eventlisteners lateron in the function mouseUp()
    var me = this;
    this.onmousemove = function (event) {
      me._onMouseMove(event);
    };
    this.onmouseup = function (event) {
      me._onMouseUp(event);
    };
    util.addEventListener(document, 'mousemove', me.onmousemove);
    util.addEventListener(document, 'mouseup', me.onmouseup);
    util.preventDefault(event);
  };

  /**
   * Perform moving operating.
   * This function activated from within the funcion Graph.mouseDown().
   * @param {Event}   event  Well, eehh, the event
   */
  Graph3d.prototype._onMouseMove = function (event) {
    event = event || window.event;

    // calculate change in mouse position
    var diffX = parseFloat(getMouseX(event)) - this.startMouseX;
    var diffY = parseFloat(getMouseY(event)) - this.startMouseY;

    var horizontalNew = this.startArmRotation.horizontal + diffX / 200;
    var verticalNew = this.startArmRotation.vertical + diffY / 200;

    var snapAngle = 4; // degrees
    var snapValue = Math.sin(snapAngle / 360 * 2 * Math.PI);

    // snap horizontally to nice angles at 0pi, 0.5pi, 1pi, 1.5pi, etc...
    // the -0.001 is to take care that the vertical axis is always drawn at the left front corner
    if (Math.abs(Math.sin(horizontalNew)) < snapValue) {
      horizontalNew = Math.round(horizontalNew / Math.PI) * Math.PI - 0.001;
    }
    if (Math.abs(Math.cos(horizontalNew)) < snapValue) {
      horizontalNew = (Math.round(horizontalNew / Math.PI - 0.5) + 0.5) * Math.PI - 0.001;
    }

    // snap vertically to nice angles
    if (Math.abs(Math.sin(verticalNew)) < snapValue) {
      verticalNew = Math.round(verticalNew / Math.PI) * Math.PI;
    }
    if (Math.abs(Math.cos(verticalNew)) < snapValue) {
      verticalNew = (Math.round(verticalNew / Math.PI - 0.5) + 0.5) * Math.PI;
    }

    this.camera.setArmRotation(horizontalNew, verticalNew);
    this.redraw();

    // fire a cameraPositionChange event
    var parameters = this.getCameraPosition();
    this.emit('cameraPositionChange', parameters);

    util.preventDefault(event);
  };

  /**
   * Stop moving operating.
   * This function activated from within the funcion Graph.mouseDown().
   * @param {event}  event   The event
   */
  Graph3d.prototype._onMouseUp = function (event) {
    this.frame.style.cursor = 'auto';
    this.leftButtonDown = false;

    // remove event listeners here
    util.removeEventListener(document, 'mousemove', this.onmousemove);
    util.removeEventListener(document, 'mouseup', this.onmouseup);
    util.preventDefault(event);
  };

  /**
   * After having moved the mouse, a tooltip should pop up when the mouse is resting on a data point
   * @param {Event}  event   A mouse move event
   */
  Graph3d.prototype._onTooltip = function (event) {
    var delay = 300; // ms
    var boundingRect = this.frame.getBoundingClientRect();
    var mouseX = getMouseX(event) - boundingRect.left;
    var mouseY = getMouseY(event) - boundingRect.top;

    if (!this.showTooltip) {
      return;
    }

    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    // (delayed) display of a tooltip only if no mouse button is down
    if (this.leftButtonDown) {
      this._hideTooltip();
      return;
    }

    if (this.tooltip && this.tooltip.dataPoint) {
      // tooltip is currently visible
      var dataPoint = this._dataPointFromXY(mouseX, mouseY);
      if (dataPoint !== this.tooltip.dataPoint) {
        // datapoint changed
        if (dataPoint) {
          this._showTooltip(dataPoint);
        } else {
          this._hideTooltip();
        }
      }
    } else {
      // tooltip is currently not visible
      var me = this;
      this.tooltipTimeout = setTimeout(function () {
        me.tooltipTimeout = null;

        // show a tooltip if we have a data point
        var dataPoint = me._dataPointFromXY(mouseX, mouseY);
        if (dataPoint) {
          me._showTooltip(dataPoint);
        }
      }, delay);
    }
  };

  /**
   * Event handler for touchstart event on mobile devices
   */
  Graph3d.prototype._onTouchStart = function (event) {
    this.touchDown = true;

    var me = this;
    this.ontouchmove = function (event) {
      me._onTouchMove(event);
    };
    this.ontouchend = function (event) {
      me._onTouchEnd(event);
    };
    util.addEventListener(document, 'touchmove', me.ontouchmove);
    util.addEventListener(document, 'touchend', me.ontouchend);

    this._onMouseDown(event);
  };

  /**
   * Event handler for touchmove event on mobile devices
   */
  Graph3d.prototype._onTouchMove = function (event) {
    this._onMouseMove(event);
  };

  /**
   * Event handler for touchend event on mobile devices
   */
  Graph3d.prototype._onTouchEnd = function (event) {
    this.touchDown = false;

    util.removeEventListener(document, 'touchmove', this.ontouchmove);
    util.removeEventListener(document, 'touchend', this.ontouchend);

    this._onMouseUp(event);
  };

  /**
   * Event handler for mouse wheel event, used to zoom the graph
   * Code from http://adomas.org/javascript-mouse-wheel/
   * @param {event}  event   The event
   */
  Graph3d.prototype._onWheel = function (event) {
    if (!event) /* For IE. */
      event = window.event;

    // retrieve delta
    var delta = 0;
    if (event.wheelDelta) {
      /* IE/Opera. */
      delta = event.wheelDelta / 120;
    } else if (event.detail) {
      /* Mozilla case. */
      // In Mozilla, sign of delta is different than in IE.
      // Also, delta is multiple of 3.
      delta = -event.detail / 3;
    }

    // If delta is nonzero, handle it.
    // Basically, delta is now positive if wheel was scrolled up,
    // and negative, if wheel was scrolled down.
    if (delta) {
      var oldLength = this.camera.getArmLength();
      var newLength = oldLength * (1 - delta / 10);

      this.camera.setArmLength(newLength);
      this.redraw();

      this._hideTooltip();
    }

    // fire a cameraPositionChange event
    var parameters = this.getCameraPosition();
    this.emit('cameraPositionChange', parameters);

    // Prevent default actions caused by mouse wheel.
    // That might be ugly, but we handle scrolls somehow
    // anyway, so don't bother here..
    util.preventDefault(event);
  };

  /**
   * Test whether a point lies inside given 2D triangle
   * @param {Point2d} point
   * @param {Point2d[]} triangle
   * @return {boolean} Returns true if given point lies inside or on the edge of the triangle
   * @private
   */
  Graph3d.prototype._insideTriangle = function (point, triangle) {
    var a = triangle[0],
        b = triangle[1],
        c = triangle[2];

    function sign(x) {
      return x > 0 ? 1 : x < 0 ? -1 : 0;
    }

    var as = sign((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x));
    var bs = sign((c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x));
    var cs = sign((a.x - c.x) * (point.y - c.y) - (a.y - c.y) * (point.x - c.x));

    // each of the three signs must be either equal to each other or zero
    return (as == 0 || bs == 0 || as == bs) && (bs == 0 || cs == 0 || bs == cs) && (as == 0 || cs == 0 || as == cs);
  };

  /**
   * Find a data point close to given screen position (x, y)
   * @param {Number} x
   * @param {Number} y
   * @return {Object | null} The closest data point or null if not close to any data point
   * @private
   */
  Graph3d.prototype._dataPointFromXY = function (x, y) {
    var i,
        distMax = 100,
        // px
    dataPoint = null,
        closestDataPoint = null,
        closestDist = null,
        center = new Point2d(x, y);

    if (this.style === Graph3d.STYLE.BAR || this.style === Graph3d.STYLE.BARCOLOR || this.style === Graph3d.STYLE.BARSIZE) {
      // the data points are ordered from far away to closest
      for (i = this.dataPoints.length - 1; i >= 0; i--) {
        dataPoint = this.dataPoints[i];
        var surfaces = dataPoint.surfaces;
        if (surfaces) {
          for (var s = surfaces.length - 1; s >= 0; s--) {
            // split each surface in two triangles, and see if the center point is inside one of these
            var surface = surfaces[s];
            var corners = surface.corners;
            var triangle1 = [corners[0].screen, corners[1].screen, corners[2].screen];
            var triangle2 = [corners[2].screen, corners[3].screen, corners[0].screen];
            if (this._insideTriangle(center, triangle1) || this._insideTriangle(center, triangle2)) {
              // return immediately at the first hit
              return dataPoint;
            }
          }
        }
      }
    } else {
      // find the closest data point, using distance to the center of the point on 2d screen
      for (i = 0; i < this.dataPoints.length; i++) {
        dataPoint = this.dataPoints[i];
        var point = dataPoint.screen;
        if (point) {
          var distX = Math.abs(x - point.x);
          var distY = Math.abs(y - point.y);
          var dist = Math.sqrt(distX * distX + distY * distY);

          if ((closestDist === null || dist < closestDist) && dist < distMax) {
            closestDist = dist;
            closestDataPoint = dataPoint;
          }
        }
      }
    }

    return closestDataPoint;
  };

  /**
   * Display a tooltip for given data point
   * @param {Object} dataPoint
   * @private
   */
  Graph3d.prototype._showTooltip = function (dataPoint) {
    var content, line, dot;

    if (!this.tooltip) {
      content = document.createElement('div');
      content.style.position = 'absolute';
      content.style.padding = '10px';
      content.style.border = '1px solid #4d4d4d';
      content.style.color = '#1a1a1a';
      content.style.background = 'rgba(255,255,255,0.7)';
      content.style.borderRadius = '2px';
      content.style.boxShadow = '5px 5px 10px rgba(128,128,128,0.5)';

      line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.height = '40px';
      line.style.width = '0';
      line.style.borderLeft = '1px solid #4d4d4d';

      dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.height = '0';
      dot.style.width = '0';
      dot.style.border = '5px solid #4d4d4d';
      dot.style.borderRadius = '5px';

      this.tooltip = {
        dataPoint: null,
        dom: {
          content: content,
          line: line,
          dot: dot
        }
      };
    } else {
      content = this.tooltip.dom.content;
      line = this.tooltip.dom.line;
      dot = this.tooltip.dom.dot;
    }

    this._hideTooltip();

    this.tooltip.dataPoint = dataPoint;
    if (typeof this.showTooltip === 'function') {
      content.innerHTML = this.showTooltip(dataPoint.point);
    } else {
      content.innerHTML = '<table>' + '<tr><td>x:</td><td>' + dataPoint.point.x + '</td></tr>' + '<tr><td>y:</td><td>' + dataPoint.point.y + '</td></tr>' + '<tr><td>z:</td><td>' + dataPoint.point.z + '</td></tr>' + '</table>';
    }

    content.style.left = '0';
    content.style.top = '0';
    this.frame.appendChild(content);
    this.frame.appendChild(line);
    this.frame.appendChild(dot);

    // calculate sizes
    var contentWidth = content.offsetWidth;
    var contentHeight = content.offsetHeight;
    var lineHeight = line.offsetHeight;
    var dotWidth = dot.offsetWidth;
    var dotHeight = dot.offsetHeight;

    var left = dataPoint.screen.x - contentWidth / 2;
    left = Math.min(Math.max(left, 10), this.frame.clientWidth - 10 - contentWidth);

    line.style.left = dataPoint.screen.x + 'px';
    line.style.top = dataPoint.screen.y - lineHeight + 'px';
    content.style.left = left + 'px';
    content.style.top = dataPoint.screen.y - lineHeight - contentHeight + 'px';
    dot.style.left = dataPoint.screen.x - dotWidth / 2 + 'px';
    dot.style.top = dataPoint.screen.y - dotHeight / 2 + 'px';
  };

  /**
   * Hide the tooltip when displayed
   * @private
   */
  Graph3d.prototype._hideTooltip = function () {
    if (this.tooltip) {
      this.tooltip.dataPoint = null;

      for (var prop in this.tooltip.dom) {
        if (this.tooltip.dom.hasOwnProperty(prop)) {
          var elem = this.tooltip.dom[prop];
          if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    }
  };

  /**--------------------------------------------------------------------------**/

  /**
   * Get the horizontal mouse position from a mouse event
   * @param {Event} event
   * @return {Number} mouse x
   */
  function getMouseX(event) {
    if ('clientX' in event) return event.clientX;
    return event.targetTouches[0] && event.targetTouches[0].clientX || 0;
  }

  /**
   * Get the vertical mouse position from a mouse event
   * @param {Event} event
   * @return {Number} mouse y
   */
  function getMouseY(event) {
    if ('clientY' in event) return event.clientY;
    return event.targetTouches[0] && event.targetTouches[0].clientY || 0;
  }

  module.exports = Graph3d;

  // use use defaults

/***/ },
/* 12 */
/***/ function(module, exports) {

  /**
   * @prototype Point2d
   * @param {Number} [x]
   * @param {Number} [y]
   */
  "use strict";

  function Point2d(x, y) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
  }

  module.exports = Point2d;

/***/ },
/* 13 */
/***/ function(module, exports) {

  
  /**
   * Expose `Emitter`.
   */

  module.exports = Emitter;

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  };

  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks[event] = this._callbacks[event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};

    function on() {
      self.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks[event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks[event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
      , callbacks = this._callbacks[event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };


/***/ },
/* 14 */
/***/ function(module, exports) {

  /**
   * @prototype Point3d
   * @param {Number} [x]
   * @param {Number} [y]
   * @param {Number} [z]
   */
  "use strict";

  function Point3d(x, y, z) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
    this.z = z !== undefined ? z : 0;
  };

  /**
   * Subtract the two provided points, returns a-b
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} a-b
   */
  Point3d.subtract = function (a, b) {
    var sub = new Point3d();
    sub.x = a.x - b.x;
    sub.y = a.y - b.y;
    sub.z = a.z - b.z;
    return sub;
  };

  /**
   * Add the two provided points, returns a+b
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} a+b
   */
  Point3d.add = function (a, b) {
    var sum = new Point3d();
    sum.x = a.x + b.x;
    sum.y = a.y + b.y;
    sum.z = a.z + b.z;
    return sum;
  };

  /**
   * Calculate the average of two 3d points
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} The average, (a+b)/2
   */
  Point3d.avg = function (a, b) {
    return new Point3d((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  };

  /**
   * Calculate the cross product of the two provided points, returns axb
   * Documentation: http://en.wikipedia.org/wiki/Cross_product
   * @param {Point3d} a
   * @param {Point3d} b
   * @return {Point3d} cross product axb
   */
  Point3d.crossProduct = function (a, b) {
    var crossproduct = new Point3d();

    crossproduct.x = a.y * b.z - a.z * b.y;
    crossproduct.y = a.z * b.x - a.x * b.z;
    crossproduct.z = a.x * b.y - a.y * b.x;

    return crossproduct;
  };

  /**
   * Rtrieve the length of the vector (or the distance from this point to the origin
   * @return {Number}  length
   */
  Point3d.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  };

  module.exports = Point3d;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var Point3d = __webpack_require__(14);

  /**
   * @class Camera
   * The camera is mounted on a (virtual) camera arm. The camera arm can rotate
   * The camera is always looking in the direction of the origin of the arm.
   * This way, the camera always rotates around one fixed point, the location
   * of the camera arm.
   *
   * Documentation:
   *   http://en.wikipedia.org/wiki/3D_projection
   */
  function Camera() {
    this.armLocation = new Point3d();
    this.armRotation = {};
    this.armRotation.horizontal = 0;
    this.armRotation.vertical = 0;
    this.armLength = 1.7;

    this.cameraLocation = new Point3d();
    this.cameraRotation = new Point3d(0.5 * Math.PI, 0, 0);

    this.calculateCameraOrientation();
  }

  /**
   * Set the location (origin) of the arm
   * @param {Number} x  Normalized value of x
   * @param {Number} y  Normalized value of y
   * @param {Number} z  Normalized value of z
   */
  Camera.prototype.setArmLocation = function (x, y, z) {
    this.armLocation.x = x;
    this.armLocation.y = y;
    this.armLocation.z = z;

    this.calculateCameraOrientation();
  };

  /**
   * Set the rotation of the camera arm
   * @param {Number} horizontal   The horizontal rotation, between 0 and 2*PI.
   *                Optional, can be left undefined.
   * @param {Number} vertical   The vertical rotation, between 0 and 0.5*PI
   *                if vertical=0.5*PI, the graph is shown from the
   *                top. Optional, can be left undefined.
   */
  Camera.prototype.setArmRotation = function (horizontal, vertical) {
    if (horizontal !== undefined) {
      this.armRotation.horizontal = horizontal;
    }

    if (vertical !== undefined) {
      this.armRotation.vertical = vertical;
      if (this.armRotation.vertical < 0) this.armRotation.vertical = 0;
      if (this.armRotation.vertical > 0.5 * Math.PI) this.armRotation.vertical = 0.5 * Math.PI;
    }

    if (horizontal !== undefined || vertical !== undefined) {
      this.calculateCameraOrientation();
    }
  };

  /**
   * Retrieve the current arm rotation
   * @return {object}   An object with parameters horizontal and vertical
   */
  Camera.prototype.getArmRotation = function () {
    var rot = {};
    rot.horizontal = this.armRotation.horizontal;
    rot.vertical = this.armRotation.vertical;

    return rot;
  };

  /**
   * Set the (normalized) length of the camera arm.
   * @param {Number} length A length between 0.71 and 5.0
   */
  Camera.prototype.setArmLength = function (length) {
    if (length === undefined) return;

    this.armLength = length;

    // Radius must be larger than the corner of the graph,
    // which has a distance of sqrt(0.5^2+0.5^2) = 0.71 from the center of the
    // graph
    if (this.armLength < 0.71) this.armLength = 0.71;
    if (this.armLength > 5) this.armLength = 5;

    this.calculateCameraOrientation();
  };

  /**
   * Retrieve the arm length
   * @return {Number} length
   */
  Camera.prototype.getArmLength = function () {
    return this.armLength;
  };

  /**
   * Retrieve the camera location
   * @return {Point3d} cameraLocation
   */
  Camera.prototype.getCameraLocation = function () {
    return this.cameraLocation;
  };

  /**
   * Retrieve the camera rotation
   * @return {Point3d} cameraRotation
   */
  Camera.prototype.getCameraRotation = function () {
    return this.cameraRotation;
  };

  /**
   * Calculate the location and rotation of the camera based on the
   * position and orientation of the camera arm
   */
  Camera.prototype.calculateCameraOrientation = function () {
    // calculate location of the camera
    this.cameraLocation.x = this.armLocation.x - this.armLength * Math.sin(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
    this.cameraLocation.y = this.armLocation.y - this.armLength * Math.cos(this.armRotation.horizontal) * Math.cos(this.armRotation.vertical);
    this.cameraLocation.z = this.armLocation.z + this.armLength * Math.sin(this.armRotation.vertical);

    // calculate rotation of the camera
    this.cameraRotation.x = Math.PI / 2 - this.armRotation.vertical;
    this.cameraRotation.y = 0;
    this.cameraRotation.z = -this.armRotation.horizontal;
  };

  module.exports = Camera;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var DataView = __webpack_require__(10);

  /**
   * @class Filter
   *
   * @param {DataSet} data The google data table
   * @param {Number}  column             The index of the column to be filtered
   * @param {Graph} graph           The graph
   */
  function Filter(data, column, graph) {
    this.data = data;
    this.column = column;
    this.graph = graph; // the parent graph

    this.index = undefined;
    this.value = undefined;

    // read all distinct values and select the first one
    this.values = graph.getDistinctValues(data.get(), this.column);

    // sort both numeric and string values correctly
    this.values.sort(function (a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    });

    if (this.values.length > 0) {
      this.selectValue(0);
    }

    // create an array with the filtered datapoints. this will be loaded afterwards
    this.dataPoints = [];

    this.loaded = false;
    this.onLoadCallback = undefined;

    if (graph.animationPreload) {
      this.loaded = false;
      this.loadInBackground();
    } else {
      this.loaded = true;
    }
  };

  /**
   * Return the label
   * @return {string} label
   */
  Filter.prototype.isLoaded = function () {
    return this.loaded;
  };

  /**
   * Return the loaded progress
   * @return {Number} percentage between 0 and 100
   */
  Filter.prototype.getLoadedProgress = function () {
    var len = this.values.length;

    var i = 0;
    while (this.dataPoints[i]) {
      i++;
    }

    return Math.round(i / len * 100);
  };

  /**
   * Return the label
   * @return {string} label
   */
  Filter.prototype.getLabel = function () {
    return this.graph.filterLabel;
  };

  /**
   * Return the columnIndex of the filter
   * @return {Number} columnIndex
   */
  Filter.prototype.getColumn = function () {
    return this.column;
  };

  /**
   * Return the currently selected value. Returns undefined if there is no selection
   * @return {*} value
   */
  Filter.prototype.getSelectedValue = function () {
    if (this.index === undefined) return undefined;

    return this.values[this.index];
  };

  /**
   * Retrieve all values of the filter
   * @return {Array} values
   */
  Filter.prototype.getValues = function () {
    return this.values;
  };

  /**
   * Retrieve one value of the filter
   * @param {Number}  index
   * @return {*} value
   */
  Filter.prototype.getValue = function (index) {
    if (index >= this.values.length) throw 'Error: index out of range';

    return this.values[index];
  };

  /**
   * Retrieve the (filtered) dataPoints for the currently selected filter index
   * @param {Number} [index] (optional)
   * @return {Array} dataPoints
   */
  Filter.prototype._getDataPoints = function (index) {
    if (index === undefined) index = this.index;

    if (index === undefined) return [];

    var dataPoints;
    if (this.dataPoints[index]) {
      dataPoints = this.dataPoints[index];
    } else {
      var f = {};
      f.column = this.column;
      f.value = this.values[index];

      var dataView = new DataView(this.data, { filter: function filter(item) {
          return item[f.column] == f.value;
        } }).get();
      dataPoints = this.graph._getDataPoints(dataView);

      this.dataPoints[index] = dataPoints;
    }

    return dataPoints;
  };

  /**
   * Set a callback function when the filter is fully loaded.
   */
  Filter.prototype.setOnLoadCallback = function (callback) {
    this.onLoadCallback = callback;
  };

  /**
   * Add a value to the list with available values for this filter
   * No double entries will be created.
   * @param {Number} index
   */
  Filter.prototype.selectValue = function (index) {
    if (index >= this.values.length) throw 'Error: index out of range';

    this.index = index;
    this.value = this.values[index];
  };

  /**
   * Load all filtered rows in the background one by one
   * Start this method without providing an index!
   */
  Filter.prototype.loadInBackground = function (index) {
    if (index === undefined) index = 0;

    var frame = this.graph.frame;

    if (index < this.values.length) {
      var dataPointsTemp = this._getDataPoints(index);
      //this.graph.redrawInfo(); // TODO: not neat

      // create a progress box
      if (frame.progress === undefined) {
        frame.progress = document.createElement('DIV');
        frame.progress.style.position = 'absolute';
        frame.progress.style.color = 'gray';
        frame.appendChild(frame.progress);
      }
      var progress = this.getLoadedProgress();
      frame.progress.innerHTML = 'Loading animation... ' + progress + '%';
      // TODO: this is no nice solution...
      frame.progress.style.bottom = 60 + 'px'; // TODO: use height of slider
      frame.progress.style.left = 10 + 'px';

      var me = this;
      setTimeout(function () {
        me.loadInBackground(index + 1);
      }, 10);
      this.loaded = false;
    } else {
      this.loaded = true;

      // remove the progress box
      if (frame.progress !== undefined) {
        frame.removeChild(frame.progress);
        frame.progress = undefined;
      }

      if (this.onLoadCallback) this.onLoadCallback();
    }
  };

  module.exports = Filter;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var util = __webpack_require__(1);

  /**
   * @constructor Slider
   *
   * An html slider control with start/stop/prev/next buttons
   * @param {Element} container  The element where the slider will be created
   * @param {Object} options   Available options:
   *                 {boolean} visible   If true (default) the
   *                           slider is visible.
   */
  function Slider(container, options) {
    if (container === undefined) {
      throw 'Error: No container element defined';
    }
    this.container = container;
    this.visible = options && options.visible != undefined ? options.visible : true;

    if (this.visible) {
      this.frame = document.createElement('DIV');
      //this.frame.style.backgroundColor = '#E5E5E5';
      this.frame.style.width = '100%';
      this.frame.style.position = 'relative';
      this.container.appendChild(this.frame);

      this.frame.prev = document.createElement('INPUT');
      this.frame.prev.type = 'BUTTON';
      this.frame.prev.value = 'Prev';
      this.frame.appendChild(this.frame.prev);

      this.frame.play = document.createElement('INPUT');
      this.frame.play.type = 'BUTTON';
      this.frame.play.value = 'Play';
      this.frame.appendChild(this.frame.play);

      this.frame.next = document.createElement('INPUT');
      this.frame.next.type = 'BUTTON';
      this.frame.next.value = 'Next';
      this.frame.appendChild(this.frame.next);

      this.frame.bar = document.createElement('INPUT');
      this.frame.bar.type = 'BUTTON';
      this.frame.bar.style.position = 'absolute';
      this.frame.bar.style.border = '1px solid red';
      this.frame.bar.style.width = '100px';
      this.frame.bar.style.height = '6px';
      this.frame.bar.style.borderRadius = '2px';
      this.frame.bar.style.MozBorderRadius = '2px';
      this.frame.bar.style.border = '1px solid #7F7F7F';
      this.frame.bar.style.backgroundColor = '#E5E5E5';
      this.frame.appendChild(this.frame.bar);

      this.frame.slide = document.createElement('INPUT');
      this.frame.slide.type = 'BUTTON';
      this.frame.slide.style.margin = '0px';
      this.frame.slide.value = ' ';
      this.frame.slide.style.position = 'relative';
      this.frame.slide.style.left = '-100px';
      this.frame.appendChild(this.frame.slide);

      // create events
      var me = this;
      this.frame.slide.onmousedown = function (event) {
        me._onMouseDown(event);
      };
      this.frame.prev.onclick = function (event) {
        me.prev(event);
      };
      this.frame.play.onclick = function (event) {
        me.togglePlay(event);
      };
      this.frame.next.onclick = function (event) {
        me.next(event);
      };
    }

    this.onChangeCallback = undefined;

    this.values = [];
    this.index = undefined;

    this.playTimeout = undefined;
    this.playInterval = 1000; // milliseconds
    this.playLoop = true;
  }

  /**
   * Select the previous index
   */
  Slider.prototype.prev = function () {
    var index = this.getIndex();
    if (index > 0) {
      index--;
      this.setIndex(index);
    }
  };

  /**
   * Select the next index
   */
  Slider.prototype.next = function () {
    var index = this.getIndex();
    if (index < this.values.length - 1) {
      index++;
      this.setIndex(index);
    }
  };

  /**
   * Select the next index
   */
  Slider.prototype.playNext = function () {
    var start = new Date();

    var index = this.getIndex();
    if (index < this.values.length - 1) {
      index++;
      this.setIndex(index);
    } else if (this.playLoop) {
      // jump to the start
      index = 0;
      this.setIndex(index);
    }

    var end = new Date();
    var diff = end - start;

    // calculate how much time it to to set the index and to execute the callback
    // function.
    var interval = Math.max(this.playInterval - diff, 0);
    // document.title = diff // TODO: cleanup

    var me = this;
    this.playTimeout = setTimeout(function () {
      me.playNext();
    }, interval);
  };

  /**
   * Toggle start or stop playing
   */
  Slider.prototype.togglePlay = function () {
    if (this.playTimeout === undefined) {
      this.play();
    } else {
      this.stop();
    }
  };

  /**
   * Start playing
   */
  Slider.prototype.play = function () {
    // Test whether already playing
    if (this.playTimeout) return;

    this.playNext();

    if (this.frame) {
      this.frame.play.value = 'Stop';
    }
  };

  /**
   * Stop playing
   */
  Slider.prototype.stop = function () {
    clearInterval(this.playTimeout);
    this.playTimeout = undefined;

    if (this.frame) {
      this.frame.play.value = 'Play';
    }
  };

  /**
   * Set a callback function which will be triggered when the value of the
   * slider bar has changed.
   */
  Slider.prototype.setOnChangeCallback = function (callback) {
    this.onChangeCallback = callback;
  };

  /**
   * Set the interval for playing the list
   * @param {Number} interval   The interval in milliseconds
   */
  Slider.prototype.setPlayInterval = function (interval) {
    this.playInterval = interval;
  };

  /**
   * Retrieve the current play interval
   * @return {Number} interval   The interval in milliseconds
   */
  Slider.prototype.getPlayInterval = function (interval) {
    return this.playInterval;
  };

  /**
   * Set looping on or off
   * @pararm {boolean} doLoop  If true, the slider will jump to the start when
   *               the end is passed, and will jump to the end
   *               when the start is passed.
   */
  Slider.prototype.setPlayLoop = function (doLoop) {
    this.playLoop = doLoop;
  };

  /**
   * Execute the onchange callback function
   */
  Slider.prototype.onChange = function () {
    if (this.onChangeCallback !== undefined) {
      this.onChangeCallback();
    }
  };

  /**
   * redraw the slider on the correct place
   */
  Slider.prototype.redraw = function () {
    if (this.frame) {
      // resize the bar
      this.frame.bar.style.top = this.frame.clientHeight / 2 - this.frame.bar.offsetHeight / 2 + 'px';
      this.frame.bar.style.width = this.frame.clientWidth - this.frame.prev.clientWidth - this.frame.play.clientWidth - this.frame.next.clientWidth - 30 + 'px';

      // position the slider button
      var left = this.indexToLeft(this.index);
      this.frame.slide.style.left = left + 'px';
    }
  };

  /**
   * Set the list with values for the slider
   * @param {Array} values   A javascript array with values (any type)
   */
  Slider.prototype.setValues = function (values) {
    this.values = values;

    if (this.values.length > 0) this.setIndex(0);else this.index = undefined;
  };

  /**
   * Select a value by its index
   * @param {Number} index
   */
  Slider.prototype.setIndex = function (index) {
    if (index < this.values.length) {
      this.index = index;

      this.redraw();
      this.onChange();
    } else {
      throw 'Error: index out of range';
    }
  };

  /**
   * retrieve the index of the currently selected vaue
   * @return {Number} index
   */
  Slider.prototype.getIndex = function () {
    return this.index;
  };

  /**
   * retrieve the currently selected value
   * @return {*} value
   */
  Slider.prototype.get = function () {
    return this.values[this.index];
  };

  Slider.prototype._onMouseDown = function (event) {
    // only react on left mouse button down
    var leftButtonDown = event.which ? event.which === 1 : event.button === 1;
    if (!leftButtonDown) return;

    this.startClientX = event.clientX;
    this.startSlideX = parseFloat(this.frame.slide.style.left);

    this.frame.style.cursor = 'move';

    // add event listeners to handle moving the contents
    // we store the function onmousemove and onmouseup in the graph, so we can
    // remove the eventlisteners lateron in the function mouseUp()
    var me = this;
    this.onmousemove = function (event) {
      me._onMouseMove(event);
    };
    this.onmouseup = function (event) {
      me._onMouseUp(event);
    };
    util.addEventListener(document, 'mousemove', this.onmousemove);
    util.addEventListener(document, 'mouseup', this.onmouseup);
    util.preventDefault(event);
  };

  Slider.prototype.leftToIndex = function (left) {
    var width = parseFloat(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10;
    var x = left - 3;

    var index = Math.round(x / width * (this.values.length - 1));
    if (index < 0) index = 0;
    if (index > this.values.length - 1) index = this.values.length - 1;

    return index;
  };

  Slider.prototype.indexToLeft = function (index) {
    var width = parseFloat(this.frame.bar.style.width) - this.frame.slide.clientWidth - 10;

    var x = index / (this.values.length - 1) * width;
    var left = x + 3;

    return left;
  };

  Slider.prototype._onMouseMove = function (event) {
    var diff = event.clientX - this.startClientX;
    var x = this.startSlideX + diff;

    var index = this.leftToIndex(x);

    this.setIndex(index);

    util.preventDefault();
  };

  Slider.prototype._onMouseUp = function (event) {
    this.frame.style.cursor = 'auto';

    // remove event listeners
    util.removeEventListener(document, 'mousemove', this.onmousemove);
    util.removeEventListener(document, 'mouseup', this.onmouseup);

    util.preventDefault();
  };

  module.exports = Slider;

/***/ },
/* 18 */
/***/ function(module, exports) {

  /**
   * @prototype StepNumber
   * The class StepNumber is an iterator for Numbers. You provide a start and end
   * value, and a best step size. StepNumber itself rounds to fixed values and
   * a finds the step that best fits the provided step.
   *
   * If prettyStep is true, the step size is chosen as close as possible to the
   * provided step, but being a round value like 1, 2, 5, 10, 20, 50, ....
   *
   * Example usage:
   *   var step = new StepNumber(0, 10, 2.5, true);
   *   step.start();
   *   while (!step.end()) {
   *   alert(step.getCurrent());
   *   step.next();
   *   }
   *
   * Version: 1.0
   *
   * @param {Number} start     The start value
   * @param {Number} end     The end value
   * @param {Number} step    Optional. Step size. Must be a positive value.
   * @param {boolean} prettyStep Optional. If true, the step size is rounded
   *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  "use strict";

  function StepNumber(start, end, step, prettyStep) {
    // set default values
    this._start = 0;
    this._end = 0;
    this._step = 1;
    this.prettyStep = true;
    this.precision = 5;

    this._current = 0;
    this.setRange(start, end, step, prettyStep);
  };

  /**
   * Set a new range: start, end and step.
   *
   * @param {Number} start     The start value
   * @param {Number} end     The end value
   * @param {Number} step    Optional. Step size. Must be a positive value.
   * @param {boolean} prettyStep Optional. If true, the step size is rounded
   *               To a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  StepNumber.prototype.setRange = function (start, end, step, prettyStep) {
    this._start = start ? start : 0;
    this._end = end ? end : 0;

    this.setStep(step, prettyStep);
  };

  /**
   * Set a new step size
   * @param {Number} step    New step size. Must be a positive value
   * @param {boolean} prettyStep Optional. If true, the provided step is rounded
   *               to a pretty step size (like 1, 2, 5, 10, 20, 50, ...)
   */
  StepNumber.prototype.setStep = function (step, prettyStep) {
    if (step === undefined || step <= 0) return;

    if (prettyStep !== undefined) this.prettyStep = prettyStep;

    if (this.prettyStep === true) this._step = StepNumber.calculatePrettyStep(step);else this._step = step;
  };

  /**
   * Calculate a nice step size, closest to the desired step size.
   * Returns a value in one of the ranges 1*10^n, 2*10^n, or 5*10^n, where n is an
   * integer Number. For example 1, 2, 5, 10, 20, 50, etc...
   * @param {Number}  step  Desired step size
   * @return {Number}     Nice step size
   */
  StepNumber.calculatePrettyStep = function (step) {
    var log10 = function log10(x) {
      return Math.log(x) / Math.LN10;
    };

    // try three steps (multiple of 1, 2, or 5
    var step1 = Math.pow(10, Math.round(log10(step))),
        step2 = 2 * Math.pow(10, Math.round(log10(step / 2))),
        step5 = 5 * Math.pow(10, Math.round(log10(step / 5)));

    // choose the best step (closest to minimum step)
    var prettyStep = step1;
    if (Math.abs(step2 - step) <= Math.abs(prettyStep - step)) prettyStep = step2;
    if (Math.abs(step5 - step) <= Math.abs(prettyStep - step)) prettyStep = step5;

    // for safety
    if (prettyStep <= 0) {
      prettyStep = 1;
    }

    return prettyStep;
  };

  /**
   * returns the current value of the step
   * @return {Number} current value
   */
  StepNumber.prototype.getCurrent = function () {
    return parseFloat(this._current.toPrecision(this.precision));
  };

  /**
   * returns the current step size
   * @return {Number} current step size
   */
  StepNumber.prototype.getStep = function () {
    return this._step;
  };

  /**
   * Set the current value to the largest value smaller than start, which
   * is a multiple of the step size
   */
  StepNumber.prototype.start = function () {
    this._current = this._start - this._start % this._step;
  };

  /**
   * Do a step, add the step size to the current value
   */
  StepNumber.prototype.next = function () {
    this._current += this._step;
  };

  /**
   * Returns true whether the end is reached
   * @return {boolean}  True if the current value has passed the end value.
   */
  StepNumber.prototype.end = function () {
    return this._current > this._end;
  };

  module.exports = StepNumber;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var Emitter = __webpack_require__(13);
  var Hammer = __webpack_require__(23);
  var util = __webpack_require__(1);
  var DataSet = __webpack_require__(8);
  var DataView = __webpack_require__(10);
  var Range = __webpack_require__(27);
  var Core = __webpack_require__(30);
  var TimeAxis = __webpack_require__(41);
  var CurrentTime = __webpack_require__(20);
  var CustomTime = __webpack_require__(44);
  var ItemSet = __webpack_require__(31);

  var Configurator = __webpack_require__(45);
  var Validator = __webpack_require__(47)['default'];
  var printStyle = __webpack_require__(47).printStyle;
  var allOptions = __webpack_require__(48).allOptions;
  var configureOptions = __webpack_require__(48).configureOptions;

  /**
   * Create a timeline visualization
   * @param {HTMLElement} container
   * @param {vis.DataSet | vis.DataView | Array} [items]
   * @param {vis.DataSet | vis.DataView | Array} [groups]
   * @param {Object} [options]  See Timeline.setOptions for the available options.
   * @constructor
   * @extends Core
   */
  function Timeline(container, items, groups, options) {
    if (!(this instanceof Timeline)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // if the third element is options, the forth is groups (optionally);
    if (!(Array.isArray(groups) || groups instanceof DataSet || groups instanceof DataView) && groups instanceof Object) {
      var forthArgument = options;
      options = groups;
      groups = forthArgument;
    }

    var me = this;
    this.defaultOptions = {
      start: null,
      end: null,

      autoResize: true,

      orientation: {
        axis: 'bottom', // axis orientation: 'bottom', 'top', or 'both'
        item: 'bottom' // not relevant
      },

      width: null,
      height: null,
      maxHeight: null,
      minHeight: null
    };
    this.options = util.deepExtend({}, this.defaultOptions);

    // Create the DOM, props, and emitter
    this._create(container);

    // all components listed here will be repainted automatically
    this.components = [];

    this.body = {
      dom: this.dom,
      domProps: this.props,
      emitter: {
        on: this.on.bind(this),
        off: this.off.bind(this),
        emit: this.emit.bind(this)
      },
      hiddenDates: [],
      util: {
        getScale: function getScale() {
          return me.timeAxis.step.scale;
        },
        getStep: function getStep() {
          return me.timeAxis.step.step;
        },

        toScreen: me._toScreen.bind(me),
        toGlobalScreen: me._toGlobalScreen.bind(me), // this refers to the root.width
        toTime: me._toTime.bind(me),
        toGlobalTime: me._toGlobalTime.bind(me)
      }
    };

    // range
    this.range = new Range(this.body);
    this.components.push(this.range);
    this.body.range = this.range;

    // time axis
    this.timeAxis = new TimeAxis(this.body);
    this.timeAxis2 = null; // used in case of orientation option 'both'
    this.components.push(this.timeAxis);

    // current time bar
    this.currentTime = new CurrentTime(this.body);
    this.components.push(this.currentTime);

    // item set
    this.itemSet = new ItemSet(this.body);
    this.components.push(this.itemSet);

    this.itemsData = null; // DataSet
    this.groupsData = null; // DataSet

    this.on('tap', function (event) {
      me.emit('click', me.getEventProperties(event));
    });
    this.on('doubletap', function (event) {
      me.emit('doubleClick', me.getEventProperties(event));
    });
    this.dom.root.oncontextmenu = function (event) {
      me.emit('contextmenu', me.getEventProperties(event));
    };

    // apply options
    if (options) {
      this.setOptions(options);
    }

    // IMPORTANT: THIS HAPPENS BEFORE SET ITEMS!
    if (groups) {
      this.setGroups(groups);
    }

    // create itemset
    if (items) {
      this.setItems(items);
    } else {
      this._redraw();
    }
  }

  // Extend the functionality from Core
  Timeline.prototype = new Core();

  /**
   * Load a configurator
   * @return {Object}
   * @private
   */
  Timeline.prototype._createConfigurator = function () {
    return new Configurator(this, this.dom.container, configureOptions);
  };

  /**
   * Force a redraw. The size of all items will be recalculated.
   * Can be useful to manually redraw when option autoResize=false and the window
   * has been resized, or when the items CSS has been changed.
   */
  Timeline.prototype.redraw = function () {
    this.itemSet && this.itemSet.markDirty({ refreshItems: true });
    this._redraw();
  };

  Timeline.prototype.setOptions = function (options) {
    // validate options
    var errorFound = Validator.validate(options, allOptions);
    if (errorFound === true) {
      console.log('%cErrors have been found in the supplied options object.', printStyle);
    }

    Core.prototype.setOptions.call(this, options);

    if ('type' in options) {
      if (options.type !== this.options.type) {
        this.options.type = options.type;

        // force recreation of all items
        var itemsData = this.itemsData;
        if (itemsData) {
          var selection = this.getSelection();
          this.setItems(null); // remove all
          this.setItems(itemsData); // add all
          this.setSelection(selection); // restore selection
        }
      }
    }
  };

  /**
   * Set items
   * @param {vis.DataSet | Array | null} items
   */
  Timeline.prototype.setItems = function (items) {
    var initialLoad = this.itemsData == null;

    // convert to type DataSet when needed
    var newDataSet;
    if (!items) {
      newDataSet = null;
    } else if (items instanceof DataSet || items instanceof DataView) {
      newDataSet = items;
    } else {
      // turn an array into a dataset
      newDataSet = new DataSet(items, {
        type: {
          start: 'Date',
          end: 'Date'
        }
      });
    }

    // set items
    this.itemsData = newDataSet;
    this.itemSet && this.itemSet.setItems(newDataSet);

    if (initialLoad) {
      if (this.options.start != undefined || this.options.end != undefined) {
        if (this.options.start == undefined || this.options.end == undefined) {
          var range = this.getItemRange();
        }

        var start = this.options.start != undefined ? this.options.start : range.min;
        var end = this.options.end != undefined ? this.options.end : range.max;

        this.setWindow(start, end, { animation: false });
      } else {
        this.fit({ animation: false });
      }
    }
  };

  /**
   * Set groups
   * @param {vis.DataSet | Array} groups
   */
  Timeline.prototype.setGroups = function (groups) {
    // convert to type DataSet when needed
    var newDataSet;
    if (!groups) {
      newDataSet = null;
    } else if (groups instanceof DataSet || groups instanceof DataView) {
      newDataSet = groups;
    } else {
      // turn an array into a dataset
      newDataSet = new DataSet(groups);
    }

    this.groupsData = newDataSet;
    this.itemSet.setGroups(newDataSet);
  };

  /**
   * Set both items and groups in one go
   * @param {{items: Array | vis.DataSet, groups: Array | vis.DataSet}} data
   */
  Timeline.prototype.setData = function (data) {
    if (data && data.groups) {
      this.setGroups(data.groups);
    }

    if (data && data.items) {
      this.setItems(data.items);
    }
  };

  /**
   * Set selected items by their id. Replaces the current selection
   * Unknown id's are silently ignored.
   * @param {string[] | string} [ids]  An array with zero or more id's of the items to be
   *                                selected. If ids is an empty array, all items will be
   *                                unselected.
   * @param {Object} [options]      Available options:
   *                                `focus: boolean`
   *                                    If true, focus will be set to the selected item(s)
   *                                `animation: boolean | {duration: number, easingFunction: string}`
   *                                    If true (default), the range is animated
   *                                    smoothly to the new window. An object can be
   *                                    provided to specify duration and easing function.
   *                                    Default duration is 500 ms, and default easing
   *                                    function is 'easeInOutQuad'.
   *                                    Only applicable when option focus is true.
   */
  Timeline.prototype.setSelection = function (ids, options) {
    this.itemSet && this.itemSet.setSelection(ids);

    if (options && options.focus) {
      this.focus(ids, options);
    }
  };

  /**
   * Get the selected items by their id
   * @return {Array} ids  The ids of the selected items
   */
  Timeline.prototype.getSelection = function () {
    return this.itemSet && this.itemSet.getSelection() || [];
  };

  /**
   * Adjust the visible window such that the selected item (or multiple items)
   * are centered on screen.
   * @param {String | String[]} id     An item id or array with item ids
   * @param {Object} [options]      Available options:
   *                                `animation: boolean | {duration: number, easingFunction: string}`
   *                                    If true (default), the range is animated
   *                                    smoothly to the new window. An object can be
   *                                    provided to specify duration and easing function.
   *                                    Default duration is 500 ms, and default easing
   *                                    function is 'easeInOutQuad'.
   */
  Timeline.prototype.focus = function (id, options) {
    if (!this.itemsData || id == undefined) return;

    var ids = Array.isArray(id) ? id : [id];

    // get the specified item(s)
    var itemsData = this.itemsData.getDataSet().get(ids, {
      type: {
        start: 'Date',
        end: 'Date'
      }
    });

    // calculate minimum start and maximum end of specified items
    var start = null;
    var end = null;
    itemsData.forEach(function (itemData) {
      var s = itemData.start.valueOf();
      var e = 'end' in itemData ? itemData.end.valueOf() : itemData.start.valueOf();

      if (start === null || s < start) {
        start = s;
      }

      if (end === null || e > end) {
        end = e;
      }
    });

    if (start !== null && end !== null) {
      // calculate the new middle and interval for the window
      var middle = (start + end) / 2;
      var interval = Math.max(this.range.end - this.range.start, (end - start) * 1.1);

      var animation = options && options.animation !== undefined ? options.animation : true;
      this.range.setRange(middle - interval / 2, middle + interval / 2, animation);
    }
  };

  /**
   * Set Timeline window such that it fits all items
   * @param {Object} [options]  Available options:
   *                                `animation: boolean | {duration: number, easingFunction: string}`
   *                                    If true (default), the range is animated
   *                                    smoothly to the new window. An object can be
   *                                    provided to specify duration and easing function.
   *                                    Default duration is 500 ms, and default easing
   *                                    function is 'easeInOutQuad'.
   */
  Timeline.prototype.fit = function (options) {
    var animation = options && options.animation !== undefined ? options.animation : true;
    var range = this.getItemRange();
    this.range.setRange(range.min, range.max, animation);
  };

  /**
   * Determine the range of the items, taking into account their actual width
   * and a margin of 10 pixels on both sides.
   * @return {{min: Date | null, max: Date | null}}
   */
  Timeline.prototype.getItemRange = function () {
    var _this = this;

    // get a rough approximation for the range based on the items start and end dates
    var range = this.getDataRange();
    var min = range.min;
    var max = range.max;
    var minItem = null;
    var maxItem = null;

    if (min != null && max != null) {
      var interval;
      var factor;
      var lhs;
      var rhs;
      var delta;

      (function () {
        var getStart = function (item) {
          return util.convert(item.data.start, 'Date').valueOf();
        };

        var getEnd = function (item) {
          var end = item.data.end != undefined ? item.data.end : item.data.start;
          return util.convert(end, 'Date').valueOf();
        };

        interval = max - min;
        // ms
        if (interval <= 0) {
          interval = 10;
        }
        factor = interval / _this.props.center.width;

        // calculate the date of the left side and right side of the items given
        util.forEach(_this.itemSet.items, (function (item) {
          item.show();

          var start = getStart(item);
          var end = getEnd(item);

          var left = new Date(start - (item.getWidthLeft() + 10) * factor);
          var right = new Date(end + (item.getWidthRight() + 10) * factor);

          if (left < min) {
            min = left;
            minItem = item;
          }
          if (right > max) {
            max = right;
            maxItem = item;
          }
        }).bind(_this));

        if (minItem && maxItem) {
          lhs = minItem.getWidthLeft() + 10;
          rhs = maxItem.getWidthRight() + 10;
          delta = _this.props.center.width - lhs - rhs;
          // px

          if (delta > 0) {
            min = getStart(minItem) - lhs * interval / delta; // ms
            max = getEnd(maxItem) + rhs * interval / delta; // ms
          }
        }
      })();
    }

    return {
      min: min != null ? new Date(min) : null,
      max: max != null ? new Date(max) : null
    };
  };

  /**
   * Calculate the data range of the items start and end dates
   * @returns {{min: Date | null, max: Date | null}}
   */
  Timeline.prototype.getDataRange = function () {
    var min = null;
    var max = null;

    var dataset = this.itemsData && this.itemsData.getDataSet();
    if (dataset) {
      dataset.forEach(function (item) {
        var start = util.convert(item.start, 'Date').valueOf();
        var end = util.convert(item.end != undefined ? item.end : item.start, 'Date').valueOf();
        if (min === null || start < min) {
          min = start;
        }
        if (max === null || end > max) {
          max = start;
        }
      });
    }

    return {
      min: min != null ? new Date(min) : null,
      max: max != null ? new Date(max) : null
    };
  };

  /**
   * Generate Timeline related information from an event
   * @param {Event} event
   * @return {Object} An object with related information, like on which area
   *                  The event happened, whether clicked on an item, etc.
   */
  Timeline.prototype.getEventProperties = function (event) {
    var clientX = event.center ? event.center.x : event.clientX;
    var clientY = event.center ? event.center.y : event.clientY;
    var x = clientX - util.getAbsoluteLeft(this.dom.centerContainer);
    var y = clientY - util.getAbsoluteTop(this.dom.centerContainer);

    var item = this.itemSet.itemFromTarget(event);
    var group = this.itemSet.groupFromTarget(event);
    var customTime = CustomTime.customTimeFromTarget(event);

    var snap = this.itemSet.options.snap || null;
    var scale = this.body.util.getScale();
    var step = this.body.util.getStep();
    var time = this._toTime(x);
    var snappedTime = snap ? snap(time, scale, step) : time;

    var element = util.getTarget(event);
    var what = null;
    if (item != null) {
      what = 'item';
    } else if (customTime != null) {
      what = 'custom-time';
    } else if (util.hasParent(element, this.timeAxis.dom.foreground)) {
      what = 'axis';
    } else if (this.timeAxis2 && util.hasParent(element, this.timeAxis2.dom.foreground)) {
      what = 'axis';
    } else if (util.hasParent(element, this.itemSet.dom.labelSet)) {
      what = 'group-label';
    } else if (util.hasParent(element, this.currentTime.bar)) {
      what = 'current-time';
    } else if (util.hasParent(element, this.dom.center)) {
      what = 'background';
    }

    return {
      event: event,
      item: item ? item.id : null,
      group: group ? group.groupId : null,
      what: what,
      pageX: event.srcEvent ? event.srcEvent.pageX : event.pageX,
      pageY: event.srcEvent ? event.srcEvent.pageY : event.pageY,
      x: x,
      y: y,
      time: time,
      snappedTime: snappedTime
    };
  };

  module.exports = Timeline;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var util = __webpack_require__(1);
  var Component = __webpack_require__(21);
  var moment = __webpack_require__(2);
  var locales = __webpack_require__(22);

  /**
   * A current time bar
   * @param {{range: Range, dom: Object, domProps: Object}} body
   * @param {Object} [options]        Available parameters:
   *                                  {Boolean} [showCurrentTime]
   * @constructor CurrentTime
   * @extends Component
   */
  function CurrentTime(body, options) {
    this.body = body;

    // default options
    this.defaultOptions = {
      showCurrentTime: true,

      locales: locales,
      locale: 'en'
    };
    this.options = util.extend({}, this.defaultOptions);
    this.offset = 0;

    this._create();

    this.setOptions(options);
  }

  CurrentTime.prototype = new Component();

  /**
   * Create the HTML DOM for the current time bar
   * @private
   */
  CurrentTime.prototype._create = function () {
    var bar = document.createElement('div');
    bar.className = 'vis-current-time';
    bar.style.position = 'absolute';
    bar.style.top = '0px';
    bar.style.height = '100%';

    this.bar = bar;
  };

  /**
   * Destroy the CurrentTime bar
   */
  CurrentTime.prototype.destroy = function () {
    this.options.showCurrentTime = false;
    this.redraw(); // will remove the bar from the DOM and stop refreshing

    this.body = null;
  };

  /**
   * Set options for the component. Options will be merged in current options.
   * @param {Object} options  Available parameters:
   *                          {boolean} [showCurrentTime]
   */
  CurrentTime.prototype.setOptions = function (options) {
    if (options) {
      // copy all options that we know
      util.selectiveExtend(['showCurrentTime', 'locale', 'locales'], this.options, options);
    }
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  CurrentTime.prototype.redraw = function () {
    if (this.options.showCurrentTime) {
      var parent = this.body.dom.backgroundVertical;
      if (this.bar.parentNode != parent) {
        // attach to the dom
        if (this.bar.parentNode) {
          this.bar.parentNode.removeChild(this.bar);
        }
        parent.appendChild(this.bar);

        this.start();
      }

      var now = new Date(new Date().valueOf() + this.offset);
      var x = this.body.util.toScreen(now);

      var locale = this.options.locales[this.options.locale];
      if (!locale) {
        if (!this.warned) {
          console.log('WARNING: options.locales[\'' + this.options.locale + '\'] not found. See http://visjs.org/docs/timeline.html#Localization');
          this.warned = true;
        }
        locale = this.options.locales['en']; // fall back on english when not available
      }
      var title = locale.current + ' ' + locale.time + ': ' + moment(now).format('dddd, MMMM Do YYYY, H:mm:ss');
      title = title.charAt(0).toUpperCase() + title.substring(1);

      this.bar.style.left = x + 'px';
      this.bar.title = title;
    } else {
      // remove the line from the DOM
      if (this.bar.parentNode) {
        this.bar.parentNode.removeChild(this.bar);
      }
      this.stop();
    }

    return false;
  };

  /**
   * Start auto refreshing the current time bar
   */
  CurrentTime.prototype.start = function () {
    var me = this;

    function update() {
      me.stop();

      // determine interval to refresh
      var scale = me.body.range.conversion(me.body.domProps.center.width).scale;
      var interval = 1 / scale / 10;
      if (interval < 30) interval = 30;
      if (interval > 1000) interval = 1000;

      me.redraw();

      // start a renderTimer to adjust for the new time
      me.currentTimeTimer = setTimeout(update, interval);
    }

    update();
  };

  /**
   * Stop auto refreshing the current time bar
   */
  CurrentTime.prototype.stop = function () {
    if (this.currentTimeTimer !== undefined) {
      clearTimeout(this.currentTimeTimer);
      delete this.currentTimeTimer;
    }
  };

  /**
   * Set a current time. This can be used for example to ensure that a client's
   * time is synchronized with a shared server time.
   * @param {Date | String | Number} time     A Date, unix timestamp, or
   *                                          ISO date string.
   */
  CurrentTime.prototype.setCurrentTime = function (time) {
    var t = util.convert(time, 'Date').valueOf();
    var now = new Date().valueOf();
    this.offset = t - now;
    this.redraw();
  };

  /**
   * Get the current time.
   * @return {Date} Returns the current time.
   */
  CurrentTime.prototype.getCurrentTime = function () {
    return new Date(new Date().valueOf() + this.offset);
  };

  module.exports = CurrentTime;

/***/ },
/* 21 */
/***/ function(module, exports) {

  /**
   * Prototype for visual components
   * @param {{dom: Object, domProps: Object, emitter: Emitter, range: Range}} [body]
   * @param {Object} [options]
   */
  "use strict";

  function Component(body, options) {
    this.options = null;
    this.props = null;
  }

  /**
   * Set options for the component. The new options will be merged into the
   * current options.
   * @param {Object} options
   */
  Component.prototype.setOptions = function (options) {
    if (options) {
      util.extend(this.options, options);
    }
  };

  /**
   * Repaint the component
   * @return {boolean} Returns true if the component is resized
   */
  Component.prototype.redraw = function () {
    // should be implemented by the component
    return false;
  };

  /**
   * Destroy the component. Cleanup DOM and event listeners
   */
  Component.prototype.destroy = function () {};

  /**
   * Test whether the component is resized since the last time _isResized() was
   * called.
   * @return {Boolean} Returns true if the component is resized
   * @protected
   */
  Component.prototype._isResized = function () {
    var resized = this.props._previousWidth !== this.props.width || this.props._previousHeight !== this.props.height;

    this.props._previousWidth = this.props.width;
    this.props._previousHeight = this.props.height;

    return resized;
  };

  module.exports = Component;

  // should be implemented by the component

/***/ },
/* 22 */
/***/ function(module, exports) {

  // English
  'use strict';

  exports['en'] = {
    current: 'current',
    time: 'time'
  };
  exports['en_EN'] = exports['en'];
  exports['en_US'] = exports['en'];

  // Dutch
  exports['nl'] = {
    current: 'huidige',
    time: 'tijd'
  };
  exports['nl_NL'] = exports['nl'];
  exports['nl_BE'] = exports['nl'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  // Only load hammer.js when in a browser environment
  // (loading hammer.js in a node.js environment gives errors)
  'use strict';

  if (typeof window !== 'undefined') {
    var propagating = __webpack_require__(24);
    var Hammer = window['Hammer'] || __webpack_require__(25);
    module.exports = propagating(Hammer, {
      preventDefault: 'mouse'
    });
  } else {
    module.exports = function () {
      throw Error('hammer.js is only available in a browser, not in node.js.');
    };
  }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

  (function (factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      window.propagating = factory();
    }
  }(function () {
    var _firstTarget = null; // singleton, will contain the target element where the touch event started
    var _processing = false; // singleton, true when a touch event is being handled

    /**
     * Extend an Hammer.js instance with event propagation.
     *
     * Features:
     * - Events emitted by hammer will propagate in order from child to parent
     *   elements.
     * - Events are extended with a function `event.stopPropagation()` to stop
     *   propagation to parent elements.
     * - An option `preventDefault` to stop all default browser behavior.
     *
     * Usage:
     *   var hammer = propagatingHammer(new Hammer(element));
     *   var hammer = propagatingHammer(new Hammer(element), {preventDefault: true});
     *
     * @param {Hammer.Manager} hammer   An hammer instance.
     * @param {Object} [options]        Available options:
     *                                  - `preventDefault: true | 'mouse' | 'touch' | 'pen'`.
     *                                    Enforce preventing the default browser behavior.
     *                                    Cannot be set to `false`.
     * @return {Hammer.Manager} Returns the same hammer instance with extended
     *                          functionality
     */
    return function propagating(hammer, options) {
      var _options = options || {
        preventDefault: false
      };

      if (hammer.Manager) {
        // This looks like the Hammer constructor.
        // Overload the constructors with our own.
        var Hammer = hammer;

        var PropagatingHammer = function(element, options) {
          var o = Object.create(_options);
          if (options) Hammer.extend(o, options);
          return propagating(new Hammer(element, o), o);
        };
        Hammer.extend(PropagatingHammer, Hammer);

        PropagatingHammer.Manager = function (element, options) {
          var o = Object.create(_options);
          if (options) Hammer.extend(o, options);
          return propagating(new Hammer.Manager(element, o), o);
        };

        return PropagatingHammer;
      }

      // create a wrapper object which will override the functions
      // `on`, `off`, `destroy`, and `emit` of the hammer instance
      var wrapper = Object.create(hammer);

      // attach to DOM element
      var element = hammer.element;
      element.hammer = wrapper;

      // register an event to catch the start of a gesture and store the
      // target in a singleton
      hammer.on('hammer.input', function (event) {
        if (_options.preventDefault === true || (_options.preventDefault === event.pointerType)) {
          event.preventDefault();
        }
        if (event.isFirst) {
          _firstTarget = event.target;
        }
      });

      /** @type {Object.<String, Array.<function>>} */
      wrapper._handlers = {};

      /**
       * Register a handler for one or multiple events
       * @param {String} events    A space separated string with events
       * @param {function} handler A callback function, called as handler(event)
       * @returns {Hammer.Manager} Returns the hammer instance
       */
      wrapper.on = function (events, handler) {
        // register the handler
        split(events).forEach(function (event) {
          var _handlers = wrapper._handlers[event];
          if (!_handlers) {
            wrapper._handlers[event] = _handlers = [];

            // register the static, propagated handler
            hammer.on(event, propagatedHandler);
          }
          _handlers.push(handler);
        });

        return wrapper;
      };

      /**
       * Unregister a handler for one or multiple events
       * @param {String} events      A space separated string with events
       * @param {function} [handler] Optional. The registered handler. If not
       *                             provided, all handlers for given events
       *                             are removed.
       * @returns {Hammer.Manager}   Returns the hammer instance
       */
      wrapper.off = function (events, handler) {
        // unregister the handler
        split(events).forEach(function (event) {
          var _handlers = wrapper._handlers[event];
          if (_handlers) {
            _handlers = handler ? _handlers.filter(function (h) {
              return h !== handler;
            }) : [];

            if (_handlers.length > 0) {
              wrapper._handlers[event] = _handlers;
            }
            else {
              // remove static, propagated handler
              hammer.off(event, propagatedHandler);
              delete wrapper._handlers[event];
            }
          }
        });

        return wrapper;
      };

      /**
       * Emit to the event listeners
       * @param {string} eventType
       * @param {Event} event
       */
      wrapper.emit = function(eventType, event) {
        _firstTarget = event.target;
        hammer.emit(eventType, event);
      };

      wrapper.destroy = function () {
        // Detach from DOM element
        delete hammer.element.hammer;

        // clear all handlers
        wrapper._handlers = {};

        // call original hammer destroy
        hammer.destroy();
      };

      // split a string with space separated words
      function split(events) {
        return events.match(/[^ ]+/g);
      }

      /**
       * A static event handler, applying event propagation.
       * @param {Object} event
       */
      function propagatedHandler(event) {
        // let only a single hammer instance handle this event
        if (event.type !== 'hammer.input') {
          // it is possible that the same srcEvent is used with multiple hammer events,
          // we keep track on which events are handled in an object _handled
          if (!event.srcEvent._handled) {
            event.srcEvent._handled = {};
          }

          if (event.srcEvent._handled[event.type]) {
            return;
          }
          else {
            event.srcEvent._handled[event.type] = true;
          }
        }

        // attach a stopPropagation function to the event
        var stopped = false;
        event.stopPropagation = function () {
          stopped = true;
        };

        // attach firstTarget property to the event
        event.firstTarget = _firstTarget;

        // propagate over all elements (until stopped)
        var elem = _firstTarget;
        while (elem && !stopped) {
          var _handlers = elem.hammer && elem.hammer._handlers[event.type];
          if (_handlers) {
            for (var i = 0; i < _handlers.length && !stopped; i++) {
              _handlers[i](event);
            }
          }

          elem = elem.parentNode;
        }
      }

      return wrapper;
    };
  }));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.4 - 2014-09-28
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2014 Jorik Tangelder;
   * Licensed under the MIT license */
  (function(window, document, exportName, undefined) {
    'use strict';

  var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = document.createElement('div');

  var TYPE_FUNCTION = 'function';

  var round = Math.round;
  var abs = Math.abs;
  var now = Date.now;

  /**
   * set a timeout with a given scope
   * @param {Function} fn
   * @param {Number} timeout
   * @param {Object} context
   * @returns {number}
   */
  function setTimeoutContext(fn, timeout, context) {
      return setTimeout(bindFn(fn, context), timeout);
  }

  /**
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */
  function invokeArrayArg(arg, fn, context) {
      if (Array.isArray(arg)) {
          each(arg, context[fn], context);
          return true;
      }
      return false;
  }

  /**
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */
  function each(obj, iterator, context) {
      var i;

      if (!obj) {
          return;
      }

      if (obj.forEach) {
          obj.forEach(iterator, context);
      } else if (obj.length !== undefined) {
          i = 0;
          while (i < obj.length) {
              iterator.call(context, obj[i], i, obj);
              i++;
          }
      } else {
          for (i in obj) {
              obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
          }
      }
  }

  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge]
   * @returns {Object} dest
   */
  function extend(dest, src, merge) {
      var keys = Object.keys(src);
      var i = 0;
      while (i < keys.length) {
          if (!merge || (merge && dest[keys[i]] === undefined)) {
              dest[keys[i]] = src[keys[i]];
          }
          i++;
      }
      return dest;
  }

  /**
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */
  function merge(dest, src) {
      return extend(dest, src, true);
  }

  /**
   * simple class inheritance
   * @param {Function} child
   * @param {Function} base
   * @param {Object} [properties]
   */
  function inherit(child, base, properties) {
      var baseP = base.prototype,
          childP;

      childP = child.prototype = Object.create(baseP);
      childP.constructor = child;
      childP._super = baseP;

      if (properties) {
          extend(childP, properties);
      }
  }

  /**
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */
  function bindFn(fn, context) {
      return function boundFn() {
          return fn.apply(context, arguments);
      };
  }

  /**
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */
  function boolOrFn(val, args) {
      if (typeof val == TYPE_FUNCTION) {
          return val.apply(args ? args[0] || undefined : undefined, args);
      }
      return val;
  }

  /**
   * use the val2 when val1 is undefined
   * @param {*} val1
   * @param {*} val2
   * @returns {*}
   */
  function ifUndefined(val1, val2) {
      return (val1 === undefined) ? val2 : val1;
  }

  /**
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */
  function addEventListeners(target, types, handler) {
      each(splitStr(types), function(type) {
          target.addEventListener(type, handler, false);
      });
  }

  /**
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */
  function removeEventListeners(target, types, handler) {
      each(splitStr(types), function(type) {
          target.removeEventListener(type, handler, false);
      });
  }

  /**
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */
  function hasParent(node, parent) {
      while (node) {
          if (node == parent) {
              return true;
          }
          node = node.parentNode;
      }
      return false;
  }

  /**
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */
  function inStr(str, find) {
      return str.indexOf(find) > -1;
  }

  /**
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */
  function splitStr(str) {
      return str.trim().split(/\s+/g);
  }

  /**
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */
  function inArray(src, find, findByKey) {
      if (src.indexOf && !findByKey) {
          return src.indexOf(find);
      } else {
          var i = 0;
          while (i < src.length) {
              if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                  return i;
              }
              i++;
          }
          return -1;
      }
  }

  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */
  function toArray(obj) {
      return Array.prototype.slice.call(obj, 0);
  }

  /**
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */
  function uniqueArray(src, key, sort) {
      var results = [];
      var values = [];
      var i = 0;

      while (i < src.length) {
          var val = key ? src[i][key] : src[i];
          if (inArray(values, val) < 0) {
              results.push(src[i]);
          }
          values[i] = val;
          i++;
      }

      if (sort) {
          if (!key) {
              results = results.sort();
          } else {
              results = results.sort(function sortUniqueArray(a, b) {
                  return a[key] > b[key];
              });
          }
      }

      return results;
  }

  /**
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */
  function prefixed(obj, property) {
      var prefix, prop;
      var camelProp = property[0].toUpperCase() + property.slice(1);

      var i = 0;
      while (i < VENDOR_PREFIXES.length) {
          prefix = VENDOR_PREFIXES[i];
          prop = (prefix) ? prefix + camelProp : property;

          if (prop in obj) {
              return prop;
          }
          i++;
      }
      return undefined;
  }

  /**
   * get a unique id
   * @returns {number} uniqueId
   */
  var _uniqueId = 1;
  function uniqueId() {
      return _uniqueId++;
  }

  /**
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */
  function getWindowForElement(element) {
      var doc = element.ownerDocument;
      return (doc.defaultView || doc.parentWindow);
  }

  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

  var SUPPORT_TOUCH = ('ontouchstart' in window);
  var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';

  var COMPUTE_INTERVAL = 25;

  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;

  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;

  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];

  /**
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */
  function Input(manager, callback) {
      var self = this;
      this.manager = manager;
      this.callback = callback;
      this.element = manager.element;
      this.target = manager.options.inputTarget;

      // smaller wrapper around the handler, for the scope and the enabled state of the manager,
      // so when disabled the input events are completely bypassed.
      this.domHandler = function(ev) {
          if (boolOrFn(manager.options.enable, [manager])) {
              self.handler(ev);
          }
      };

      this.init();

  }

  Input.prototype = {
      /**
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */
      handler: function() { },

      /**
       * bind the events
       */
      init: function() {
          this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      },

      /**
       * unbind the events
       */
      destroy: function() {
          this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
          this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
          this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      }
  };

  /**
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */
  function createInputInstance(manager) {
      var Type;
      var inputClass = manager.options.inputClass;

      if (inputClass) {
          Type = inputClass;
      } else if (SUPPORT_POINTER_EVENTS) {
          Type = PointerEventInput;
      } else if (SUPPORT_ONLY_TOUCH) {
          Type = TouchInput;
      } else if (!SUPPORT_TOUCH) {
          Type = MouseInput;
      } else {
          Type = TouchMouseInput;
      }
      return new (Type)(manager, inputHandler);
  }

  /**
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */
  function inputHandler(manager, eventType, input) {
      var pointersLen = input.pointers.length;
      var changedPointersLen = input.changedPointers.length;
      var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
      var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

      input.isFirst = !!isFirst;
      input.isFinal = !!isFinal;

      if (isFirst) {
          manager.session = {};
      }

      // source event is the normalized value of the domEvents
      // like 'touchstart, mouseup, pointerdown'
      input.eventType = eventType;

      // compute scale, rotation etc
      computeInputData(manager, input);

      // emit secret event
      manager.emit('hammer.input', input);

      manager.recognize(input);
      manager.session.prevInput = input;
  }

  /**
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */
  function computeInputData(manager, input) {
      var session = manager.session;
      var pointers = input.pointers;
      var pointersLength = pointers.length;

      // store the first input to calculate the distance and direction
      if (!session.firstInput) {
          session.firstInput = simpleCloneInputData(input);
      }

      // to compute scale and rotation we need to store the multiple touches
      if (pointersLength > 1 && !session.firstMultiple) {
          session.firstMultiple = simpleCloneInputData(input);
      } else if (pointersLength === 1) {
          session.firstMultiple = false;
      }

      var firstInput = session.firstInput;
      var firstMultiple = session.firstMultiple;
      var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

      var center = input.center = getCenter(pointers);
      input.timeStamp = now();
      input.deltaTime = input.timeStamp - firstInput.timeStamp;

      input.angle = getAngle(offsetCenter, center);
      input.distance = getDistance(offsetCenter, center);

      computeDeltaXY(session, input);
      input.offsetDirection = getDirection(input.deltaX, input.deltaY);

      input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
      input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

      computeIntervalInputData(session, input);

      // find the correct target
      var target = manager.element;
      if (hasParent(input.srcEvent.target, target)) {
          target = input.srcEvent.target;
      }
      input.target = target;
  }

  function computeDeltaXY(session, input) {
      var center = input.center;
      var offset = session.offsetDelta || {};
      var prevDelta = session.prevDelta || {};
      var prevInput = session.prevInput || {};

      if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
          prevDelta = session.prevDelta = {
              x: prevInput.deltaX || 0,
              y: prevInput.deltaY || 0
          };

          offset = session.offsetDelta = {
              x: center.x,
              y: center.y
          };
      }

      input.deltaX = prevDelta.x + (center.x - offset.x);
      input.deltaY = prevDelta.y + (center.y - offset.y);
  }

  /**
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */
  function computeIntervalInputData(session, input) {
      var last = session.lastInterval || input,
          deltaTime = input.timeStamp - last.timeStamp,
          velocity, velocityX, velocityY, direction;

      if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
          var deltaX = last.deltaX - input.deltaX;
          var deltaY = last.deltaY - input.deltaY;

          var v = getVelocity(deltaTime, deltaX, deltaY);
          velocityX = v.x;
          velocityY = v.y;
          velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
          direction = getDirection(deltaX, deltaY);

          session.lastInterval = input;
      } else {
          // use latest velocity info if it doesn't overtake a minimum period
          velocity = last.velocity;
          velocityX = last.velocityX;
          velocityY = last.velocityY;
          direction = last.direction;
      }

      input.velocity = velocity;
      input.velocityX = velocityX;
      input.velocityY = velocityY;
      input.direction = direction;
  }

  /**
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */
  function simpleCloneInputData(input) {
      // make a simple copy of the pointers because we will get a reference if we don't
      // we only need clientXY for the calculations
      var pointers = [];
      var i = 0;
      while (i < input.pointers.length) {
          pointers[i] = {
              clientX: round(input.pointers[i].clientX),
              clientY: round(input.pointers[i].clientY)
          };
          i++;
      }

      return {
          timeStamp: now(),
          pointers: pointers,
          center: getCenter(pointers),
          deltaX: input.deltaX,
          deltaY: input.deltaY
      };
  }

  /**
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */
  function getCenter(pointers) {
      var pointersLength = pointers.length;

      // no need to loop when only one touch
      if (pointersLength === 1) {
          return {
              x: round(pointers[0].clientX),
              y: round(pointers[0].clientY)
          };
      }

      var x = 0, y = 0, i = 0;
      while (i < pointersLength) {
          x += pointers[i].clientX;
          y += pointers[i].clientY;
          i++;
      }

      return {
          x: round(x / pointersLength),
          y: round(y / pointersLength)
      };
  }

  /**
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */
  function getVelocity(deltaTime, x, y) {
      return {
          x: x / deltaTime || 0,
          y: y / deltaTime || 0
      };
  }

  /**
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */
  function getDirection(x, y) {
      if (x === y) {
          return DIRECTION_NONE;
      }

      if (abs(x) >= abs(y)) {
          return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }

  /**
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */
  function getDistance(p1, p2, props) {
      if (!props) {
          props = PROPS_XY;
      }
      var x = p2[props[0]] - p1[props[0]],
          y = p2[props[1]] - p1[props[1]];

      return Math.sqrt((x * x) + (y * y));
  }

  /**
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */
  function getAngle(p1, p2, props) {
      if (!props) {
          props = PROPS_XY;
      }
      var x = p2[props[0]] - p1[props[0]],
          y = p2[props[1]] - p1[props[1]];
      return Math.atan2(y, x) * 180 / Math.PI;
  }

  /**
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */
  function getRotation(start, end) {
      return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }

  /**
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */
  function getScale(start, end) {
      return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }

  var MOUSE_INPUT_MAP = {
      mousedown: INPUT_START,
      mousemove: INPUT_MOVE,
      mouseup: INPUT_END
  };

  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

  /**
   * Mouse events input
   * @constructor
   * @extends Input
   */
  function MouseInput() {
      this.evEl = MOUSE_ELEMENT_EVENTS;
      this.evWin = MOUSE_WINDOW_EVENTS;

      this.allow = true; // used by Input.TouchMouse to disable mouse events
      this.pressed = false; // mousedown state

      Input.apply(this, arguments);
  }

  inherit(MouseInput, Input, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function MEhandler(ev) {
          var eventType = MOUSE_INPUT_MAP[ev.type];

          // on start we want to have the left mouse button down
          if (eventType & INPUT_START && ev.button === 0) {
              this.pressed = true;
          }

          if (eventType & INPUT_MOVE && ev.which !== 1) {
              eventType = INPUT_END;
          }

          // mouse must be down, and mouse events are allowed (see the TouchMouse input)
          if (!this.pressed || !this.allow) {
              return;
          }

          if (eventType & INPUT_END) {
              this.pressed = false;
          }

          this.callback(this.manager, eventType, {
              pointers: [ev],
              changedPointers: [ev],
              pointerType: INPUT_TYPE_MOUSE,
              srcEvent: ev
          });
      }
  });

  var POINTER_INPUT_MAP = {
      pointerdown: INPUT_START,
      pointermove: INPUT_MOVE,
      pointerup: INPUT_END,
      pointercancel: INPUT_CANCEL,
      pointerout: INPUT_CANCEL
  };

  // in IE10 the pointer types is defined as an enum
  var IE10_POINTER_TYPE_ENUM = {
      2: INPUT_TYPE_TOUCH,
      3: INPUT_TYPE_PEN,
      4: INPUT_TYPE_MOUSE,
      5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
  };

  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

  // IE10 has prefixed support, and case-sensitive
  if (window.MSPointerEvent) {
      POINTER_ELEMENT_EVENTS = 'MSPointerDown';
      POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }

  /**
   * Pointer events input
   * @constructor
   * @extends Input
   */
  function PointerEventInput() {
      this.evEl = POINTER_ELEMENT_EVENTS;
      this.evWin = POINTER_WINDOW_EVENTS;

      Input.apply(this, arguments);

      this.store = (this.manager.session.pointerEvents = []);
  }

  inherit(PointerEventInput, Input, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function PEhandler(ev) {
          var store = this.store;
          var removePointer = false;

          var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
          var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
          var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

          var isTouch = (pointerType == INPUT_TYPE_TOUCH);

          // get index of the event in the store
          var storeIndex = inArray(store, ev.pointerId, 'pointerId');

          // start and mouse must be down
          if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
              if (storeIndex < 0) {
                  store.push(ev);
                  storeIndex = store.length - 1;
              }
          } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
              removePointer = true;
          }

          // it not found, so the pointer hasn't been down (so it's probably a hover)
          if (storeIndex < 0) {
              return;
          }

          // update the event in the store
          store[storeIndex] = ev;

          this.callback(this.manager, eventType, {
              pointers: store,
              changedPointers: [ev],
              pointerType: pointerType,
              srcEvent: ev
          });

          if (removePointer) {
              // remove from the store
              store.splice(storeIndex, 1);
          }
      }
  });

  var SINGLE_TOUCH_INPUT_MAP = {
      touchstart: INPUT_START,
      touchmove: INPUT_MOVE,
      touchend: INPUT_END,
      touchcancel: INPUT_CANCEL
  };

  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

  /**
   * Touch events input
   * @constructor
   * @extends Input
   */
  function SingleTouchInput() {
      this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
      this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
      this.started = false;

      Input.apply(this, arguments);
  }

  inherit(SingleTouchInput, Input, {
      handler: function TEhandler(ev) {
          var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

          // should we handle the touch events?
          if (type === INPUT_START) {
              this.started = true;
          }

          if (!this.started) {
              return;
          }

          var touches = normalizeSingleTouches.call(this, ev, type);

          // when done, reset the started state
          if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
              this.started = false;
          }

          this.callback(this.manager, type, {
              pointers: touches[0],
              changedPointers: touches[1],
              pointerType: INPUT_TYPE_TOUCH,
              srcEvent: ev
          });
      }
  });

  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */
  function normalizeSingleTouches(ev, type) {
      var all = toArray(ev.touches);
      var changed = toArray(ev.changedTouches);

      if (type & (INPUT_END | INPUT_CANCEL)) {
          all = uniqueArray(all.concat(changed), 'identifier', true);
      }

      return [all, changed];
  }

  var TOUCH_INPUT_MAP = {
      touchstart: INPUT_START,
      touchmove: INPUT_MOVE,
      touchend: INPUT_END,
      touchcancel: INPUT_CANCEL
  };

  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

  /**
   * Multi-user touch events input
   * @constructor
   * @extends Input
   */
  function TouchInput() {
      this.evTarget = TOUCH_TARGET_EVENTS;
      this.targetIds = {};

      Input.apply(this, arguments);
  }

  inherit(TouchInput, Input, {
      handler: function MTEhandler(ev) {
          var type = TOUCH_INPUT_MAP[ev.type];
          var touches = getTouches.call(this, ev, type);
          if (!touches) {
              return;
          }

          this.callback(this.manager, type, {
              pointers: touches[0],
              changedPointers: touches[1],
              pointerType: INPUT_TYPE_TOUCH,
              srcEvent: ev
          });
      }
  });

  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */
  function getTouches(ev, type) {
      var allTouches = toArray(ev.touches);
      var targetIds = this.targetIds;

      // when there is only one touch, the process can be simplified
      if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
          targetIds[allTouches[0].identifier] = true;
          return [allTouches, allTouches];
      }

      var i,
          targetTouches,
          changedTouches = toArray(ev.changedTouches),
          changedTargetTouches = [],
          target = this.target;

      // get target touches from touches
      targetTouches = allTouches.filter(function(touch) {
          return hasParent(touch.target, target);
      });

      // collect touches
      if (type === INPUT_START) {
          i = 0;
          while (i < targetTouches.length) {
              targetIds[targetTouches[i].identifier] = true;
              i++;
          }
      }

      // filter changed touches to only contain touches that exist in the collected target ids
      i = 0;
      while (i < changedTouches.length) {
          if (targetIds[changedTouches[i].identifier]) {
              changedTargetTouches.push(changedTouches[i]);
          }

          // cleanup removed touches
          if (type & (INPUT_END | INPUT_CANCEL)) {
              delete targetIds[changedTouches[i].identifier];
          }
          i++;
      }

      if (!changedTargetTouches.length) {
          return;
      }

      return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
          changedTargetTouches
      ];
  }

  /**
   * Combined touch and mouse input
   *
   * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
   * This because touch devices also emit mouse events while doing a touch.
   *
   * @constructor
   * @extends Input
   */
  function TouchMouseInput() {
      Input.apply(this, arguments);

      var handler = bindFn(this.handler, this);
      this.touch = new TouchInput(this.manager, handler);
      this.mouse = new MouseInput(this.manager, handler);
  }

  inherit(TouchMouseInput, Input, {
      /**
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */
      handler: function TMEhandler(manager, inputEvent, inputData) {
          var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
              isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

          // when we're in a touch event, so  block all upcoming mouse events
          // most mobile browser also emit mouseevents, right after touchstart
          if (isTouch) {
              this.mouse.allow = false;
          } else if (isMouse && !this.mouse.allow) {
              return;
          }

          // reset the allowMouse when we're done
          if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
              this.mouse.allow = true;
          }

          this.callback(manager, inputEvent, inputData);
      },

      /**
       * remove the event listeners
       */
      destroy: function destroy() {
          this.touch.destroy();
          this.mouse.destroy();
      }
  });

  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

  // magical touchAction value
  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';

  /**
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */
  function TouchAction(manager, value) {
      this.manager = manager;
      this.set(value);
  }

  TouchAction.prototype = {
      /**
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */
      set: function(value) {
          // find out the touch-action by the event handlers
          if (value == TOUCH_ACTION_COMPUTE) {
              value = this.compute();
          }

          if (NATIVE_TOUCH_ACTION) {
              this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
          }
          this.actions = value.toLowerCase().trim();
      },

      /**
       * just re-set the touchAction value
       */
      update: function() {
          this.set(this.manager.options.touchAction);
      },

      /**
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */
      compute: function() {
          var actions = [];
          each(this.manager.recognizers, function(recognizer) {
              if (boolOrFn(recognizer.options.enable, [recognizer])) {
                  actions = actions.concat(recognizer.getTouchAction());
              }
          });
          return cleanTouchActions(actions.join(' '));
      },

      /**
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */
      preventDefaults: function(input) {
          // not needed with native support for the touchAction property
          if (NATIVE_TOUCH_ACTION) {
              return;
          }

          var srcEvent = input.srcEvent;
          var direction = input.offsetDirection;

          // if the touch action did prevented once this session
          if (this.manager.session.prevented) {
              srcEvent.preventDefault();
              return;
          }

          var actions = this.actions;
          var hasNone = inStr(actions, TOUCH_ACTION_NONE);
          var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
          var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

          if (hasNone ||
              (hasPanY && direction & DIRECTION_HORIZONTAL) ||
              (hasPanX && direction & DIRECTION_VERTICAL)) {
              return this.preventSrc(srcEvent);
          }
      },

      /**
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */
      preventSrc: function(srcEvent) {
          this.manager.session.prevented = true;
          srcEvent.preventDefault();
      }
  };

  /**
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */
  function cleanTouchActions(actions) {
      // none
      if (inStr(actions, TOUCH_ACTION_NONE)) {
          return TOUCH_ACTION_NONE;
      }

      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

      // pan-x and pan-y can be combined
      if (hasPanX && hasPanY) {
          return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
      }

      // pan-x OR pan-y
      if (hasPanX || hasPanY) {
          return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
      }

      // manipulation
      if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
          return TOUCH_ACTION_MANIPULATION;
      }

      return TOUCH_ACTION_AUTO;
  }

  /**
   * Recognizer flow explained; *
   * All recognizers have the initial state of POSSIBLE when a input session starts.
   * The definition of a input session is from the first input until the last input, with all it's movement in it. *
   * Example session for mouse-input: mousedown -> mousemove -> mouseup
   *
   * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
   * which determines with state it should be.
   *
   * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
   * POSSIBLE to give it another change on the next cycle.
   *
   *               Possible
   *                  |
   *            +-----+---------------+
   *            |                     |
   *      +-----+-----+               |
   *      |           |               |
   *   Failed      Cancelled          |
   *                          +-------+------+
   *                          |              |
   *                      Recognized       Began
   *                                         |
   *                                      Changed
   *                                         |
   *                                  Ended/Recognized
   */
  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;

  /**
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */
  function Recognizer(options) {
      this.id = uniqueId();

      this.manager = null;
      this.options = merge(options || {}, this.defaults);

      // default is enable true
      this.options.enable = ifUndefined(this.options.enable, true);

      this.state = STATE_POSSIBLE;

      this.simultaneous = {};
      this.requireFail = [];
  }

  Recognizer.prototype = {
      /**
       * @virtual
       * @type {Object}
       */
      defaults: {},

      /**
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */
      set: function(options) {
          extend(this.options, options);

          // also update the touchAction, in case something changed about the directions/enabled state
          this.manager && this.manager.touchAction.update();
          return this;
      },

      /**
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      recognizeWith: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
              return this;
          }

          var simultaneous = this.simultaneous;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (!simultaneous[otherRecognizer.id]) {
              simultaneous[otherRecognizer.id] = otherRecognizer;
              otherRecognizer.recognizeWith(this);
          }
          return this;
      },

      /**
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRecognizeWith: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
              return this;
          }

          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          delete this.simultaneous[otherRecognizer.id];
          return this;
      },

      /**
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      requireFailure: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
              return this;
          }

          var requireFail = this.requireFail;
          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          if (inArray(requireFail, otherRecognizer) === -1) {
              requireFail.push(otherRecognizer);
              otherRecognizer.requireFailure(this);
          }
          return this;
      },

      /**
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRequireFailure: function(otherRecognizer) {
          if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
              return this;
          }

          otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
          var index = inArray(this.requireFail, otherRecognizer);
          if (index > -1) {
              this.requireFail.splice(index, 1);
          }
          return this;
      },

      /**
       * has require failures boolean
       * @returns {boolean}
       */
      hasRequireFailures: function() {
          return this.requireFail.length > 0;
      },

      /**
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */
      canRecognizeWith: function(otherRecognizer) {
          return !!this.simultaneous[otherRecognizer.id];
      },

      /**
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */
      emit: function(input) {
          var self = this;
          var state = this.state;

          function emit(withState) {
              self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
          }

          // 'panstart' and 'panmove'
          if (state < STATE_ENDED) {
              emit(true);
          }

          emit(); // simple 'eventName' events

          // panend and pancancel
          if (state >= STATE_ENDED) {
              emit(true);
          }
      },

      /**
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */
      tryEmit: function(input) {
          if (this.canEmit()) {
              return this.emit(input);
          }
          // it's failing anyway
          this.state = STATE_FAILED;
      },

      /**
       * can we emit?
       * @returns {boolean}
       */
      canEmit: function() {
          var i = 0;
          while (i < this.requireFail.length) {
              if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                  return false;
              }
              i++;
          }
          return true;
      },

      /**
       * update the recognizer
       * @param {Object} inputData
       */
      recognize: function(inputData) {
          // make a new copy of the inputData
          // so we can change the inputData without messing up the other recognizers
          var inputDataClone = extend({}, inputData);

          // is is enabled and allow recognizing?
          if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
              this.reset();
              this.state = STATE_FAILED;
              return;
          }

          // reset when we've reached the end
          if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
              this.state = STATE_POSSIBLE;
          }

          this.state = this.process(inputDataClone);

          // the recognizer has recognized a gesture
          // so trigger an event
          if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
              this.tryEmit(inputDataClone);
          }
      },

      /**
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {Const} STATE
       */
      process: function(inputData) { }, // jshint ignore:line

      /**
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */
      getTouchAction: function() { },

      /**
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */
      reset: function() { }
  };

  /**
   * get a usable string, used as event postfix
   * @param {Const} state
   * @returns {String} state
   */
  function stateStr(state) {
      if (state & STATE_CANCELLED) {
          return 'cancel';
      } else if (state & STATE_ENDED) {
          return 'end';
      } else if (state & STATE_CHANGED) {
          return 'move';
      } else if (state & STATE_BEGAN) {
          return 'start';
      }
      return '';
  }

  /**
   * direction cons to string
   * @param {Const} direction
   * @returns {String}
   */
  function directionStr(direction) {
      if (direction == DIRECTION_DOWN) {
          return 'down';
      } else if (direction == DIRECTION_UP) {
          return 'up';
      } else if (direction == DIRECTION_LEFT) {
          return 'left';
      } else if (direction == DIRECTION_RIGHT) {
          return 'right';
      }
      return '';
  }

  /**
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */
  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
      var manager = recognizer.manager;
      if (manager) {
          return manager.get(otherRecognizer);
      }
      return otherRecognizer;
  }

  /**
   * This recognizer is just used as a base for the simple attribute recognizers.
   * @constructor
   * @extends Recognizer
   */
  function AttrRecognizer() {
      Recognizer.apply(this, arguments);
  }

  inherit(AttrRecognizer, Recognizer, {
      /**
       * @namespace
       * @memberof AttrRecognizer
       */
      defaults: {
          /**
           * @type {Number}
           * @default 1
           */
          pointers: 1
      },

      /**
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */
      attrTest: function(input) {
          var optionPointers = this.options.pointers;
          return optionPointers === 0 || input.pointers.length === optionPointers;
      },

      /**
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */
      process: function(input) {
          var state = this.state;
          var eventType = input.eventType;

          var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
          var isValid = this.attrTest(input);

          // on cancel input and we've recognized before, return STATE_CANCELLED
          if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
              return state | STATE_CANCELLED;
          } else if (isRecognized || isValid) {
              if (eventType & INPUT_END) {
                  return state | STATE_ENDED;
              } else if (!(state & STATE_BEGAN)) {
                  return STATE_BEGAN;
              }
              return state | STATE_CHANGED;
          }
          return STATE_FAILED;
      }
  });

  /**
   * Pan
   * Recognized when the pointer is down and moved in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */
  function PanRecognizer() {
      AttrRecognizer.apply(this, arguments);

      this.pX = null;
      this.pY = null;
  }

  inherit(PanRecognizer, AttrRecognizer, {
      /**
       * @namespace
       * @memberof PanRecognizer
       */
      defaults: {
          event: 'pan',
          threshold: 10,
          pointers: 1,
          direction: DIRECTION_ALL
      },

      getTouchAction: function() {
          var direction = this.options.direction;
          var actions = [];
          if (direction & DIRECTION_HORIZONTAL) {
              actions.push(TOUCH_ACTION_PAN_Y);
          }
          if (direction & DIRECTION_VERTICAL) {
              actions.push(TOUCH_ACTION_PAN_X);
          }
          return actions;
      },

      directionTest: function(input) {
          var options = this.options;
          var hasMoved = true;
          var distance = input.distance;
          var direction = input.direction;
          var x = input.deltaX;
          var y = input.deltaY;

          // lock to axis?
          if (!(direction & options.direction)) {
              if (options.direction & DIRECTION_HORIZONTAL) {
                  direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                  hasMoved = x != this.pX;
                  distance = Math.abs(input.deltaX);
              } else {
                  direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                  hasMoved = y != this.pY;
                  distance = Math.abs(input.deltaY);
              }
          }
          input.direction = direction;
          return hasMoved && distance > options.threshold && direction & options.direction;
      },

      attrTest: function(input) {
          return AttrRecognizer.prototype.attrTest.call(this, input) &&
              (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
      },

      emit: function(input) {
          this.pX = input.deltaX;
          this.pY = input.deltaY;

          var direction = directionStr(input.direction);
          if (direction) {
              this.manager.emit(this.options.event + direction, input);
          }

          this._super.emit.call(this, input);
      }
  });

  /**
   * Pinch
   * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * @constructor
   * @extends AttrRecognizer
   */
  function PinchRecognizer() {
      AttrRecognizer.apply(this, arguments);
  }

  inherit(PinchRecognizer, AttrRecognizer, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
          event: 'pinch',
          threshold: 0,
          pointers: 2
      },

      getTouchAction: function() {
          return [TOUCH_ACTION_NONE];
      },

      attrTest: function(input) {
          return this._super.attrTest.call(this, input) &&
              (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
      },

      emit: function(input) {
          this._super.emit.call(this, input);
          if (input.scale !== 1) {
              var inOut = input.scale < 1 ? 'in' : 'out';
              this.manager.emit(this.options.event + inOut, input);
          }
      }
  });

  /**
   * Press
   * Recognized when the pointer is down for x ms without any movement.
   * @constructor
   * @extends Recognizer
   */
  function PressRecognizer() {
      Recognizer.apply(this, arguments);

      this._timer = null;
      this._input = null;
  }

  inherit(PressRecognizer, Recognizer, {
      /**
       * @namespace
       * @memberof PressRecognizer
       */
      defaults: {
          event: 'press',
          pointers: 1,
          time: 500, // minimal time of the pointer to be pressed
          threshold: 5 // a minimal movement is ok, but keep it low
      },

      getTouchAction: function() {
          return [TOUCH_ACTION_AUTO];
      },

      process: function(input) {
          var options = this.options;
          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTime = input.deltaTime > options.time;

          this._input = input;

          // we only allow little movement
          // and we've reached an end event, so a tap is possible
          if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
              this.reset();
          } else if (input.eventType & INPUT_START) {
              this.reset();
              this._timer = setTimeoutContext(function() {
                  this.state = STATE_RECOGNIZED;
                  this.tryEmit();
              }, options.time, this);
          } else if (input.eventType & INPUT_END) {
              return STATE_RECOGNIZED;
          }
          return STATE_FAILED;
      },

      reset: function() {
          clearTimeout(this._timer);
      },

      emit: function(input) {
          if (this.state !== STATE_RECOGNIZED) {
              return;
          }

          if (input && (input.eventType & INPUT_END)) {
              this.manager.emit(this.options.event + 'up', input);
          } else {
              this._input.timeStamp = now();
              this.manager.emit(this.options.event, this._input);
          }
      }
  });

  /**
   * Rotate
   * Recognized when two or more pointer are moving in a circular motion.
   * @constructor
   * @extends AttrRecognizer
   */
  function RotateRecognizer() {
      AttrRecognizer.apply(this, arguments);
  }

  inherit(RotateRecognizer, AttrRecognizer, {
      /**
       * @namespace
       * @memberof RotateRecognizer
       */
      defaults: {
          event: 'rotate',
          threshold: 0,
          pointers: 2
      },

      getTouchAction: function() {
          return [TOUCH_ACTION_NONE];
      },

      attrTest: function(input) {
          return this._super.attrTest.call(this, input) &&
              (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
      }
  });

  /**
   * Swipe
   * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */
  function SwipeRecognizer() {
      AttrRecognizer.apply(this, arguments);
  }

  inherit(SwipeRecognizer, AttrRecognizer, {
      /**
       * @namespace
       * @memberof SwipeRecognizer
       */
      defaults: {
          event: 'swipe',
          threshold: 10,
          velocity: 0.65,
          direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
          pointers: 1
      },

      getTouchAction: function() {
          return PanRecognizer.prototype.getTouchAction.call(this);
      },

      attrTest: function(input) {
          var direction = this.options.direction;
          var velocity;

          if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
              velocity = input.velocity;
          } else if (direction & DIRECTION_HORIZONTAL) {
              velocity = input.velocityX;
          } else if (direction & DIRECTION_VERTICAL) {
              velocity = input.velocityY;
          }

          return this._super.attrTest.call(this, input) &&
              direction & input.direction &&
              input.distance > this.options.threshold &&
              abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
      },

      emit: function(input) {
          var direction = directionStr(input.direction);
          if (direction) {
              this.manager.emit(this.options.event + direction, input);
          }

          this.manager.emit(this.options.event, input);
      }
  });

  /**
   * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
   * between the given interval and position. The delay option can be used to recognize multi-taps without firing
   * a single tap.
   *
   * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
   * multi-taps being recognized.
   * @constructor
   * @extends Recognizer
   */
  function TapRecognizer() {
      Recognizer.apply(this, arguments);

      // previous time and center,
      // used for tap counting
      this.pTime = false;
      this.pCenter = false;

      this._timer = null;
      this._input = null;
      this.count = 0;
  }

  inherit(TapRecognizer, Recognizer, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
          event: 'tap',
          pointers: 1,
          taps: 1,
          interval: 300, // max time between the multi-tap taps
          time: 250, // max time of the pointer to be down (like finger on the screen)
          threshold: 2, // a minimal movement is ok, but keep it low
          posThreshold: 10 // a multi-tap can be a bit off the initial position
      },

      getTouchAction: function() {
          return [TOUCH_ACTION_MANIPULATION];
      },

      process: function(input) {
          var options = this.options;

          var validPointers = input.pointers.length === options.pointers;
          var validMovement = input.distance < options.threshold;
          var validTouchTime = input.deltaTime < options.time;

          this.reset();

          if ((input.eventType & INPUT_START) && (this.count === 0)) {
              return this.failTimeout();
          }

          // we only allow little movement
          // and we've reached an end event, so a tap is possible
          if (validMovement && validTouchTime && validPointers) {
              if (input.eventType != INPUT_END) {
                  return this.failTimeout();
              }

              var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
              var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

              this.pTime = input.timeStamp;
              this.pCenter = input.center;

              if (!validMultiTap || !validInterval) {
                  this.count = 1;
              } else {
                  this.count += 1;
              }

              this._input = input;

              // if tap count matches we have recognized it,
              // else it has began recognizing...
              var tapCount = this.count % options.taps;
              if (tapCount === 0) {
                  // no failing requirements, immediately trigger the tap event
                  // or wait as long as the multitap interval to trigger
                  if (!this.hasRequireFailures()) {
                      return STATE_RECOGNIZED;
                  } else {
                      this._timer = setTimeoutContext(function() {
                          this.state = STATE_RECOGNIZED;
                          this.tryEmit();
                      }, options.interval, this);
                      return STATE_BEGAN;
                  }
              }
          }
          return STATE_FAILED;
      },

      failTimeout: function() {
          this._timer = setTimeoutContext(function() {
              this.state = STATE_FAILED;
          }, this.options.interval, this);
          return STATE_FAILED;
      },

      reset: function() {
          clearTimeout(this._timer);
      },

      emit: function() {
          if (this.state == STATE_RECOGNIZED ) {
              this._input.tapCount = this.count;
              this.manager.emit(this.options.event, this._input);
          }
      }
  });

  /**
   * Simple way to create an manager with a default set of recognizers.
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */
  function Hammer(element, options) {
      options = options || {};
      options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
      return new Manager(element, options);
  }

  /**
   * @const {string}
   */
  Hammer.VERSION = '2.0.4';

  /**
   * default settings
   * @namespace
   */
  Hammer.defaults = {
      /**
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: false,

      /**
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: TOUCH_ACTION_COMPUTE,

      /**
       * @type {Boolean}
       * @default true
       */
      enable: true,

      /**
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,

      /**
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,

      /**
       * Default recognizer setup when calling `Hammer()`
       * When creating a new Manager these will be skipped.
       * @type {Array}
       */
      preset: [
          // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
          [RotateRecognizer, { enable: false }],
          [PinchRecognizer, { enable: false }, ['rotate']],
          [SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],
          [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
          [TapRecognizer],
          [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
          [PressRecognizer]
      ],

      /**
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
          /**
           * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userSelect: 'none',

          /**
           * Disable the Windows Phone grippers when pressing an element.
           * @type {String}
           * @default 'none'
           */
          touchSelect: 'none',

          /**
           * Disables the default callout shown when you touch and hold a touch target.
           * On iOS, when you touch and hold a touch target such as a link, Safari displays
           * a callout containing information about the link. This property allows you to disable that callout.
           * @type {String}
           * @default 'none'
           */
          touchCallout: 'none',

          /**
           * Specifies whether zooming is enabled. Used by IE10>
           * @type {String}
           * @default 'none'
           */
          contentZooming: 'none',

          /**
           * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
           * @type {String}
           * @default 'none'
           */
          userDrag: 'none',

          /**
           * Overrides the highlight color shown when the user taps a link or a JavaScript
           * clickable element in iOS. This property obeys the alpha value, if specified.
           * @type {String}
           * @default 'rgba(0,0,0,0)'
           */
          tapHighlightColor: 'rgba(0,0,0,0)'
      }
  };

  var STOP = 1;
  var FORCED_STOP = 2;

  /**
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */
  function Manager(element, options) {
      options = options || {};

      this.options = merge(options, Hammer.defaults);
      this.options.inputTarget = this.options.inputTarget || element;

      this.handlers = {};
      this.session = {};
      this.recognizers = [];

      this.element = element;
      this.input = createInputInstance(this);
      this.touchAction = new TouchAction(this, this.options.touchAction);

      toggleCssProps(this, true);

      each(options.recognizers, function(item) {
          var recognizer = this.add(new (item[0])(item[1]));
          item[2] && recognizer.recognizeWith(item[2]);
          item[3] && recognizer.requireFailure(item[3]);
      }, this);
  }

  Manager.prototype = {
      /**
       * set options
       * @param {Object} options
       * @returns {Manager}
       */
      set: function(options) {
          extend(this.options, options);

          // Options that need a little more setup
          if (options.touchAction) {
              this.touchAction.update();
          }
          if (options.inputTarget) {
              // Clean up existing event listeners and reinitialize
              this.input.destroy();
              this.input.target = options.inputTarget;
              this.input.init();
          }
          return this;
      },

      /**
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */
      stop: function(force) {
          this.session.stopped = force ? FORCED_STOP : STOP;
      },

      /**
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */
      recognize: function(inputData) {
          var session = this.session;
          if (session.stopped) {
              return;
          }

          // run the touch-action polyfill
          this.touchAction.preventDefaults(inputData);

          var recognizer;
          var recognizers = this.recognizers;

          // this holds the recognizer that is being recognized.
          // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
          // if no recognizer is detecting a thing, it is set to `null`
          var curRecognizer = session.curRecognizer;

          // reset when the last recognizer is recognized
          // or when we're in a new session
          if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
              curRecognizer = session.curRecognizer = null;
          }

          var i = 0;
          while (i < recognizers.length) {
              recognizer = recognizers[i];

              // find out if we are allowed try to recognize the input for this one.
              // 1.   allow if the session is NOT forced stopped (see the .stop() method)
              // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
              //      that is being recognized.
              // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
              //      this can be setup with the `recognizeWith()` method on the recognizer.
              if (session.stopped !== FORCED_STOP && ( // 1
                      !curRecognizer || recognizer == curRecognizer || // 2
                      recognizer.canRecognizeWith(curRecognizer))) { // 3
                  recognizer.recognize(inputData);
              } else {
                  recognizer.reset();
              }

              // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
              // current active recognizer. but only if we don't already have an active recognizer
              if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                  curRecognizer = session.curRecognizer = recognizer;
              }
              i++;
          }
      },

      /**
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */
      get: function(recognizer) {
          if (recognizer instanceof Recognizer) {
              return recognizer;
          }

          var recognizers = this.recognizers;
          for (var i = 0; i < recognizers.length; i++) {
              if (recognizers[i].options.event == recognizer) {
                  return recognizers[i];
              }
          }
          return null;
      },

      /**
       * add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */
      add: function(recognizer) {
          if (invokeArrayArg(recognizer, 'add', this)) {
              return this;
          }

          // remove existing
          var existing = this.get(recognizer.options.event);
          if (existing) {
              this.remove(existing);
          }

          this.recognizers.push(recognizer);
          recognizer.manager = this;

          this.touchAction.update();
          return recognizer;
      },

      /**
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */
      remove: function(recognizer) {
          if (invokeArrayArg(recognizer, 'remove', this)) {
              return this;
          }

          var recognizers = this.recognizers;
          recognizer = this.get(recognizer);
          recognizers.splice(inArray(recognizers, recognizer), 1);

          this.touchAction.update();
          return this;
      },

      /**
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */
      on: function(events, handler) {
          var handlers = this.handlers;
          each(splitStr(events), function(event) {
              handlers[event] = handlers[event] || [];
              handlers[event].push(handler);
          });
          return this;
      },

      /**
       * unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */
      off: function(events, handler) {
          var handlers = this.handlers;
          each(splitStr(events), function(event) {
              if (!handler) {
                  delete handlers[event];
              } else {
                  handlers[event].splice(inArray(handlers[event], handler), 1);
              }
          });
          return this;
      },

      /**
       * emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */
      emit: function(event, data) {
          // we also want to trigger dom events
          if (this.options.domEvents) {
              triggerDomEvent(event, data);
          }

          // no handlers, so skip it all
          var handlers = this.handlers[event] && this.handlers[event].slice();
          if (!handlers || !handlers.length) {
              return;
          }

          data.type = event;
          data.preventDefault = function() {
              data.srcEvent.preventDefault();
          };

          var i = 0;
          while (i < handlers.length) {
              handlers[i](data);
              i++;
          }
      },

      /**
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */
      destroy: function() {
          this.element && toggleCssProps(this, false);

          this.handlers = {};
          this.session = {};
          this.input.destroy();
          this.element = null;
      }
  };

  /**
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */
  function toggleCssProps(manager, add) {
      var element = manager.element;
      each(manager.options.cssProps, function(value, name) {
          element.style[prefixed(element.style, name)] = add ? value : '';
      });
  }

  /**
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */
  function triggerDomEvent(event, data) {
      var gestureEvent = document.createEvent('Event');
      gestureEvent.initEvent(event, true, true);
      gestureEvent.gesture = data;
      data.target.dispatchEvent(gestureEvent);
  }

  extend(Hammer, {
      INPUT_START: INPUT_START,
      INPUT_MOVE: INPUT_MOVE,
      INPUT_END: INPUT_END,
      INPUT_CANCEL: INPUT_CANCEL,

      STATE_POSSIBLE: STATE_POSSIBLE,
      STATE_BEGAN: STATE_BEGAN,
      STATE_CHANGED: STATE_CHANGED,
      STATE_ENDED: STATE_ENDED,
      STATE_RECOGNIZED: STATE_RECOGNIZED,
      STATE_CANCELLED: STATE_CANCELLED,
      STATE_FAILED: STATE_FAILED,

      DIRECTION_NONE: DIRECTION_NONE,
      DIRECTION_LEFT: DIRECTION_LEFT,
      DIRECTION_RIGHT: DIRECTION_RIGHT,
      DIRECTION_UP: DIRECTION_UP,
      DIRECTION_DOWN: DIRECTION_DOWN,
      DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
      DIRECTION_VERTICAL: DIRECTION_VERTICAL,
      DIRECTION_ALL: DIRECTION_ALL,

      Manager: Manager,
      Input: Input,
      TouchAction: TouchAction,

      TouchInput: TouchInput,
      MouseInput: MouseInput,
      PointerEventInput: PointerEventInput,
      TouchMouseInput: TouchMouseInput,
      SingleTouchInput: SingleTouchInput,

      Recognizer: Recognizer,
      AttrRecognizer: AttrRecognizer,
      Tap: TapRecognizer,
      Pan: PanRecognizer,
      Swipe: SwipeRecognizer,
      Pinch: PinchRecognizer,
      Rotate: RotateRecognizer,
      Press: PressRecognizer,

      on: addEventListeners,
      off: removeEventListeners,
      each: each,
      merge: merge,
      extend: extend,
      inherit: inherit,
      bindFn: bindFn,
      prefixed: prefixed
  });

  if ("function" == TYPE_FUNCTION && __webpack_require__(26)) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
          return Hammer;
      }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module != 'undefined' && module.exports) {
      module.exports = Hammer;
  } else {
      window[exportName] = Hammer;
  }

  })(window, document, 'Hammer');


/***/ },
/* 26 */
/***/ function(module, exports) {

  /* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

  /* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var util = __webpack_require__(1);
  var hammerUtil = __webpack_require__(28);
  var moment = __webpack_require__(2);
  var Component = __webpack_require__(21);
  var DateUtil = __webpack_require__(29);

  /**
   * @constructor Range
   * A Range controls a numeric range with a start and end value.
   * The Range adjusts the range based on mouse events or programmatic changes,
   * and triggers events when the range is changing or has been changed.
   * @param {{dom: Object, domProps: Object, emitter: Emitter}} body
   * @param {Object} [options]    See description at Range.setOptions
   */
  function Range(body, options) {
    var now = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    this.start = now.clone().add(-3, 'days').valueOf(); // Number
    this.end = now.clone().add(4, 'days').valueOf(); // Number

    this.body = body;
    this.deltaDifference = 0;
    this.scaleOffset = 0;
    this.startToFront = false;
    this.endToFront = true;

    // default options
    this.defaultOptions = {
      start: null,
      end: null,
      direction: 'horizontal', // 'horizontal' or 'vertical'
      moveable: true,
      zoomable: true,
      min: null,
      max: null,
      zoomMin: 10, // milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 10000 // milliseconds
    };
    this.options = util.extend({}, this.defaultOptions);

    this.props = {
      touch: {}
    };
    this.animationTimer = null;

    // drag listeners for dragging
    this.body.emitter.on('panstart', this._onDragStart.bind(this));
    this.body.emitter.on('panmove', this._onDrag.bind(this));
    this.body.emitter.on('panend', this._onDragEnd.bind(this));

    // mouse wheel for zooming
    this.body.emitter.on('mousewheel', this._onMouseWheel.bind(this));

    // pinch to zoom
    this.body.emitter.on('touch', this._onTouch.bind(this));
    this.body.emitter.on('pinch', this._onPinch.bind(this));

    this.setOptions(options);
  }

  Range.prototype = new Component();

  /**
   * Set options for the range controller
   * @param {Object} options      Available options:
   *                              {Number | Date | String} start  Start date for the range
   *                              {Number | Date | String} end    End date for the range
   *                              {Number} min    Minimum value for start
   *                              {Number} max    Maximum value for end
   *                              {Number} zoomMin    Set a minimum value for
   *                                                  (end - start).
   *                              {Number} zoomMax    Set a maximum value for
   *                                                  (end - start).
   *                              {Boolean} moveable Enable moving of the range
   *                                                 by dragging. True by default
   *                              {Boolean} zoomable Enable zooming of the range
   *                                                 by pinching/scrolling. True by default
   */
  Range.prototype.setOptions = function (options) {
    if (options) {
      // copy the options that we know
      var fields = ['direction', 'min', 'max', 'zoomMin', 'zoomMax', 'moveable', 'zoomable', 'activate', 'hiddenDates'];
      util.selectiveExtend(fields, this.options, options);

      if ('start' in options || 'end' in options) {
        // apply a new range. both start and end are optional
        this.setRange(options.start, options.end);
      }
    }
  };

  /**
   * Test whether direction has a valid value
   * @param {String} direction    'horizontal' or 'vertical'
   */
  function validateDirection(direction) {
    if (direction != 'horizontal' && direction != 'vertical') {
      throw new TypeError('Unknown direction "' + direction + '". ' + 'Choose "horizontal" or "vertical".');
    }
  }

  /**
   * Set a new start and end range
   * @param {Date | Number | String} [start]
   * @param {Date | Number | String} [end]
   * @param {boolean | {duration: number, easingFunction: string}} [animation=false]
   *                                    If true (default), the range is animated
   *                                    smoothly to the new window. An object can be
   *                                    provided to specify duration and easing function.
   *                                    Default duration is 500 ms, and default easing
   *                                    function is 'easeInOutQuad'.
   * @param {Boolean} [byUser=false]
   *
   */
  Range.prototype.setRange = function (start, end, animation, byUser) {
    if (byUser !== true) {
      byUser = false;
    }
    var finalStart = start != undefined ? util.convert(start, 'Date').valueOf() : null;
    var finalEnd = end != undefined ? util.convert(end, 'Date').valueOf() : null;
    this._cancelAnimation();

    if (animation) {
      // true or an Object
      var me = this;
      var initStart = this.start;
      var initEnd = this.end;
      var duration = typeof animation === 'object' && 'duration' in animation ? animation.duration : 500;
      var easingName = typeof animation === 'object' && 'easingFunction' in animation ? animation.easingFunction : 'easeInOutQuad';
      var easingFunction = util.easingFunctions[easingName];
      if (!easingFunction) {
        throw new Error('Unknown easing function ' + JSON.stringify(easingName) + '. ' + 'Choose from: ' + Object.keys(util.easingFunctions).join(', '));
      }

      var initTime = new Date().valueOf();
      var anyChanged = false;

      var next = function next() {
        if (!me.props.touch.dragging) {
          var now = new Date().valueOf();
          var time = now - initTime;
          var ease = easingFunction(time / duration);
          var done = time > duration;
          var s = done || finalStart === null ? finalStart : initStart + (finalStart - initStart) * ease;
          var e = done || finalEnd === null ? finalEnd : initEnd + (finalEnd - initEnd) * ease;

          changed = me._applyRange(s, e);
          DateUtil.updateHiddenDates(me.body, me.options.hiddenDates);
          anyChanged = anyChanged || changed;
          if (changed) {
            me.body.emitter.emit('rangechange', { start: new Date(me.start), end: new Date(me.end), byUser: byUser });
          }

          if (done) {
            if (anyChanged) {
              me.body.emitter.emit('rangechanged', { start: new Date(me.start), end: new Date(me.end), byUser: byUser });
            }
          } else {
            // animate with as high as possible frame rate, leave 20 ms in between
            // each to prevent the browser from blocking
            me.animationTimer = setTimeout(next, 20);
          }
        }
      };

      return next();
    } else {
      var changed = this._applyRange(finalStart, finalEnd);
      DateUtil.updateHiddenDates(this.body, this.options.hiddenDates);
      if (changed) {
        var params = { start: new Date(this.start), end: new Date(this.end), byUser: byUser };
        this.body.emitter.emit('rangechange', params);
        this.body.emitter.emit('rangechanged', params);
      }
    }
  };

  /**
   * Stop an animation
   * @private
   */
  Range.prototype._cancelAnimation = function () {
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }
  };

  /**
   * Set a new start and end range. This method is the same as setRange, but
   * does not trigger a range change and range changed event, and it returns
   * true when the range is changed
   * @param {Number} [start]
   * @param {Number} [end]
   * @return {Boolean} changed
   * @private
   */
  Range.prototype._applyRange = function (start, end) {
    var newStart = start != null ? util.convert(start, 'Date').valueOf() : this.start,
        newEnd = end != null ? util.convert(end, 'Date').valueOf() : this.end,
        max = this.options.max != null ? util.convert(this.options.max, 'Date').valueOf() : null,
        min = this.options.min != null ? util.convert(this.options.min, 'Date').valueOf() : null,
        diff;

    // check for valid number
    if (isNaN(newStart) || newStart === null) {
      throw new Error('Invalid start "' + start + '"');
    }
    if (isNaN(newEnd) || newEnd === null) {
      throw new Error('Invalid end "' + end + '"');
    }

    // prevent start < end
    if (newEnd < newStart) {
      newEnd = newStart;
    }

    // prevent start < min
    if (min !== null) {
      if (newStart < min) {
        diff = min - newStart;
        newStart += diff;
        newEnd += diff;

        // prevent end > max
        if (max != null) {
          if (newEnd > max) {
            newEnd = max;
          }
        }
      }
    }

    // prevent end > max
    if (max !== null) {
      if (newEnd > max) {
        diff = newEnd - max;
        newStart -= diff;
        newEnd -= diff;

        // prevent start < min
        if (min != null) {
          if (newStart < min) {
            newStart = min;
          }
        }
      }
    }

    // prevent (end-start) < zoomMin
    if (this.options.zoomMin !== null) {
      var zoomMin = parseFloat(this.options.zoomMin);
      if (zoomMin < 0) {
        zoomMin = 0;
      }
      if (newEnd - newStart < zoomMin) {
        if (this.end - this.start === zoomMin && newStart > this.start && newEnd < this.end) {
          // ignore this action, we are already zoomed to the minimum
          newStart = this.start;
          newEnd = this.end;
        } else {
          // zoom to the minimum
          diff = zoomMin - (newEnd - newStart);
          newStart -= diff / 2;
          newEnd += diff / 2;
        }
      }
    }

    // prevent (end-start) > zoomMax
    if (this.options.zoomMax !== null) {
      var zoomMax = parseFloat(this.options.zoomMax);
      if (zoomMax < 0) {
        zoomMax = 0;
      }

      if (newEnd - newStart > zoomMax) {
        if (this.end - this.start === zoomMax && newStart < this.start && newEnd > this.end) {
          // ignore this action, we are already zoomed to the maximum
          newStart = this.start;
          newEnd = this.end;
        } else {
          // zoom to the maximum
          diff = newEnd - newStart - zoomMax;
          newStart += diff / 2;
          newEnd -= diff / 2;
        }
      }
    }

    var changed = this.start != newStart || this.end != newEnd;

    // if the new range does NOT overlap with the old range, emit checkRangedItems to avoid not showing ranged items (ranged meaning has end time, not necessarily of type Range)
    if (!(newStart >= this.start && newStart <= this.end || newEnd >= this.start && newEnd <= this.end) && !(this.start >= newStart && this.start <= newEnd || this.end >= newStart && this.end <= newEnd)) {
      this.body.emitter.emit('checkRangedItems');
    }

    this.start = newStart;
    this.end = newEnd;
    return changed;
  };

  /**
   * Retrieve the current range.
   * @return {Object} An object with start and end properties
   */
  Range.prototype.getRange = function () {
    return {
      start: this.start,
      end: this.end
    };
  };

  /**
   * Calculate the conversion offset and scale for current range, based on
   * the provided width
   * @param {Number} width
   * @returns {{offset: number, scale: number}} conversion
   */
  Range.prototype.conversion = function (width, totalHidden) {
    return Range.conversion(this.start, this.end, width, totalHidden);
  };

  /**
   * Static method to calculate the conversion offset and scale for a range,
   * based on the provided start, end, and width
   * @param {Number} start
   * @param {Number} end
   * @param {Number} width
   * @returns {{offset: number, scale: number}} conversion
   */
  Range.conversion = function (start, end, width, totalHidden) {
    if (totalHidden === undefined) {
      totalHidden = 0;
    }
    if (width != 0 && end - start != 0) {
      return {
        offset: start,
        scale: width / (end - start - totalHidden)
      };
    } else {
      return {
        offset: 0,
        scale: 1
      };
    }
  };

  /**
   * Start dragging horizontally or vertically
   * @param {Event} event
   * @private
   */
  Range.prototype._onDragStart = function (event) {
    this.deltaDifference = 0;
    this.previousDelta = 0;
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;

    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;

    this.props.touch.start = this.start;
    this.props.touch.end = this.end;
    this.props.touch.dragging = true;

    if (this.body.dom.root) {
      this.body.dom.root.style.cursor = 'move';
    }
  };

  /**
   * Perform dragging operation
   * @param {Event} event
   * @private
   */
  Range.prototype._onDrag = function (event) {
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;

    // TODO: this may be redundant in hammerjs2
    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;

    var direction = this.options.direction;
    validateDirection(direction);
    var delta = direction == 'horizontal' ? event.deltaX : event.deltaY;
    delta -= this.deltaDifference;
    var interval = this.props.touch.end - this.props.touch.start;

    // normalize dragging speed if cutout is in between.
    var duration = DateUtil.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
    interval -= duration;

    var width = direction == 'horizontal' ? this.body.domProps.center.width : this.body.domProps.center.height;
    var diffRange = -delta / width * interval;
    var newStart = this.props.touch.start + diffRange;
    var newEnd = this.props.touch.end + diffRange;

    // snapping times away from hidden zones
    var safeStart = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newStart, this.previousDelta - delta, true);
    var safeEnd = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newEnd, this.previousDelta - delta, true);
    if (safeStart != newStart || safeEnd != newEnd) {
      this.deltaDifference += delta;
      this.props.touch.start = safeStart;
      this.props.touch.end = safeEnd;
      this._onDrag(event);
      return;
    }

    this.previousDelta = delta;
    this._applyRange(newStart, newEnd);

    // fire a rangechange event
    this.body.emitter.emit('rangechange', {
      start: new Date(this.start),
      end: new Date(this.end),
      byUser: true
    });
  };

  /**
   * Stop dragging operation
   * @param {event} event
   * @private
   */
  Range.prototype._onDragEnd = function (event) {
    // only allow dragging when configured as movable
    if (!this.options.moveable) return;

    // TODO: this may be redundant in hammerjs2
    // refuse to drag when we where pinching to prevent the timeline make a jump
    // when releasing the fingers in opposite order from the touch screen
    if (!this.props.touch.allowDragging) return;

    this.props.touch.dragging = false;
    if (this.body.dom.root) {
      this.body.dom.root.style.cursor = 'auto';
    }

    // fire a rangechanged event
    this.body.emitter.emit('rangechanged', {
      start: new Date(this.start),
      end: new Date(this.end),
      byUser: true
    });
  };

  /**
   * Event handler for mouse wheel event, used to zoom
   * Code from http://adomas.org/javascript-mouse-wheel/
   * @param {Event} event
   * @private
   */
  Range.prototype._onMouseWheel = function (event) {
    // only allow zooming when configured as zoomable and moveable
    if (!(this.options.zoomable && this.options.moveable)) return;

    // retrieve delta
    var delta = 0;
    if (event.wheelDelta) {
      /* IE/Opera. */
      delta = event.wheelDelta / 120;
    } else if (event.detail) {
      /* Mozilla case. */
      // In Mozilla, sign of delta is different than in IE.
      // Also, delta is multiple of 3.
      delta = -event.detail / 3;
    }

    // If delta is nonzero, handle it.
    // Basically, delta is now positive if wheel was scrolled up,
    // and negative, if wheel was scrolled down.
    if (delta) {
      // perform the zoom action. Delta is normally 1 or -1

      // adjust a negative delta such that zooming in with delta 0.1
      // equals zooming out with a delta -0.1
      var scale;
      if (delta < 0) {
        scale = 1 - delta / 5;
      } else {
        scale = 1 / (1 + delta / 5);
      }

      // calculate center, the date to zoom around
      var pointer = getPointer({ x: event.clientX, y: event.clientY }, this.body.dom.center);
      var pointerDate = this._pointerToDate(pointer);

      this.zoom(scale, pointerDate, delta);
    }

    // Prevent default actions caused by mouse wheel
    // (else the page and timeline both zoom and scroll)
    event.preventDefault();
  };

  /**
   * Start of a touch gesture
   * @private
   */
  Range.prototype._onTouch = function (event) {
    this.props.touch.start = this.start;
    this.props.touch.end = this.end;
    this.props.touch.allowDragging = true;
    this.props.touch.center = null;
    this.scaleOffset = 0;
    this.deltaDifference = 0;
  };

  /**
   * Handle pinch event
   * @param {Event} event
   * @private
   */
  Range.prototype._onPinch = function (event) {
    // only allow zooming when configured as zoomable and moveable
    if (!(this.options.zoomable && this.options.moveable)) return;

    this.props.touch.allowDragging = false;

    if (!this.props.touch.center) {
      this.props.touch.center = getPointer(event.center, this.body.dom.center);
    }

    var scale = 1 / (event.scale + this.scaleOffset);
    var centerDate = this._pointerToDate(this.props.touch.center);

    var hiddenDuration = DateUtil.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
    var hiddenDurationBefore = DateUtil.getHiddenDurationBefore(this.body.hiddenDates, this, centerDate);
    var hiddenDurationAfter = hiddenDuration - hiddenDurationBefore;

    // calculate new start and end
    var newStart = centerDate - hiddenDurationBefore + (this.props.touch.start - (centerDate - hiddenDurationBefore)) * scale;
    var newEnd = centerDate + hiddenDurationAfter + (this.props.touch.end - (centerDate + hiddenDurationAfter)) * scale;

    // snapping times away from hidden zones
    this.startToFront = 1 - scale <= 0; // used to do the right auto correction with periodic hidden times
    this.endToFront = scale - 1 <= 0; // used to do the right auto correction with periodic hidden times

    var safeStart = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newStart, 1 - scale, true);
    var safeEnd = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newEnd, scale - 1, true);
    if (safeStart != newStart || safeEnd != newEnd) {
      this.props.touch.start = safeStart;
      this.props.touch.end = safeEnd;
      this.scaleOffset = 1 - event.scale;
      newStart = safeStart;
      newEnd = safeEnd;
    }

    this.setRange(newStart, newEnd, false, true);

    this.startToFront = false; // revert to default
    this.endToFront = true; // revert to default
  };

  /**
   * Helper function to calculate the center date for zooming
   * @param {{x: Number, y: Number}} pointer
   * @return {number} date
   * @private
   */
  Range.prototype._pointerToDate = function (pointer) {
    var conversion;
    var direction = this.options.direction;

    validateDirection(direction);

    if (direction == 'horizontal') {
      return this.body.util.toTime(pointer.x).valueOf();
    } else {
      var height = this.body.domProps.center.height;
      conversion = this.conversion(height);
      return pointer.y / conversion.scale + conversion.offset;
    }
  };

  /**
   * Get the pointer location relative to the location of the dom element
   * @param {{x: Number, y: Number}} touch
   * @param {Element} element   HTML DOM element
   * @return {{x: Number, y: Number}} pointer
   * @private
   */
  function getPointer(touch, element) {
    return {
      x: touch.x - util.getAbsoluteLeft(element),
      y: touch.y - util.getAbsoluteTop(element)
    };
  }

  /**
   * Zoom the range the given scale in or out. Start and end date will
   * be adjusted, and the timeline will be redrawn. You can optionally give a
   * date around which to zoom.
   * For example, try scale = 0.9 or 1.1
   * @param {Number} scale      Scaling factor. Values above 1 will zoom out,
   *                            values below 1 will zoom in.
   * @param {Number} [center]   Value representing a date around which will
   *                            be zoomed.
   */
  Range.prototype.zoom = function (scale, center, delta) {
    // if centerDate is not provided, take it half between start Date and end Date
    if (center == null) {
      center = (this.start + this.end) / 2;
    }

    var hiddenDuration = DateUtil.getHiddenDurationBetween(this.body.hiddenDates, this.start, this.end);
    var hiddenDurationBefore = DateUtil.getHiddenDurationBefore(this.body.hiddenDates, this, center);
    var hiddenDurationAfter = hiddenDuration - hiddenDurationBefore;

    // calculate new start and end
    var newStart = center - hiddenDurationBefore + (this.start - (center - hiddenDurationBefore)) * scale;
    var newEnd = center + hiddenDurationAfter + (this.end - (center + hiddenDurationAfter)) * scale;

    // snapping times away from hidden zones
    this.startToFront = delta > 0 ? false : true; // used to do the right autocorrection with periodic hidden times
    this.endToFront = -delta > 0 ? false : true; // used to do the right autocorrection with periodic hidden times
    var safeStart = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newStart, delta, true);
    var safeEnd = DateUtil.snapAwayFromHidden(this.body.hiddenDates, newEnd, -delta, true);
    if (safeStart != newStart || safeEnd != newEnd) {
      newStart = safeStart;
      newEnd = safeEnd;
    }

    this.setRange(newStart, newEnd, false, true);

    this.startToFront = false; // revert to default
    this.endToFront = true; // revert to default
  };

  /**
   * Move the range with a given delta to the left or right. Start and end
   * value will be adjusted. For example, try delta = 0.1 or -0.1
   * @param {Number}  delta     Moving amount. Positive value will move right,
   *                            negative value will move left
   */
  Range.prototype.move = function (delta) {
    // zoom start Date and end Date relative to the centerDate
    var diff = this.end - this.start;

    // apply new values
    var newStart = this.start + diff * delta;
    var newEnd = this.end + diff * delta;

    // TODO: reckon with min and max range

    this.start = newStart;
    this.end = newEnd;
  };

  /**
   * Move the range to a new center point
   * @param {Number} moveTo      New center point of the range
   */
  Range.prototype.moveTo = function (moveTo) {
    var center = (this.start + this.end) / 2;

    var diff = center - moveTo;

    // calculate new start and end
    var newStart = this.start - diff;
    var newEnd = this.end - diff;

    this.setRange(newStart, newEnd);
  };

  module.exports = Range;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var Hammer = __webpack_require__(23);

  /**
   * Register a touch event, taking place before a gesture
   * @param {Hammer} hammer       A hammer instance
   * @param {function} callback   Callback, called as callback(event)
   */
  exports.onTouch = function (hammer, callback) {
    callback.inputHandler = function (event) {
      if (event.isFirst && !isTouching) {
        callback(event);

        isTouching = true;
        setTimeout(function () {
          isTouching = false;
        }, 0);
      }
    };

    hammer.on('hammer.input', callback.inputHandler);
  };

  // isTouching is true while a touch action is being emitted
  // this is a hack to prevent `touch` from being fired twice
  var isTouching = false;

  /**
   * Register a release event, taking place after a gesture
   * @param {Hammer} hammer       A hammer instance
   * @param {function} callback   Callback, called as callback(event)
   */
  exports.onRelease = function (hammer, callback) {
    callback.inputHandler = function (event) {
      if (event.isFinal && !isReleasing) {
        callback(event);

        isReleasing = true;
        setTimeout(function () {
          isReleasing = false;
        }, 0);
      }
    };

    return hammer.on('hammer.input', callback.inputHandler);
  };

  // isReleasing is true while a release action is being emitted
  // this is a hack to prevent `release` from being fired twice
  var isReleasing = false;

  /**
   * Unregister a touch event, taking place before a gesture
   * @param {Hammer} hammer       A hammer instance
   * @param {function} callback   Callback, called as callback(event)
   */
  exports.offTouch = function (hammer, callback) {
    hammer.off('hammer.input', callback.inputHandler);
  };

  /**
   * Unregister a release event, taking place before a gesture
   * @param {Hammer} hammer       A hammer instance
   * @param {function} callback   Callback, called as callback(event)
   */
  exports.offRelease = exports.offTouch;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  var moment = __webpack_require__(2);

  /**
   * used in Core to convert the options into a volatile variable
   * 
   * @param Core
   */
  exports.convertHiddenOptions = function (body, hiddenDates) {
    body.hiddenDates = [];
    if (hiddenDates) {
      if (Array.isArray(hiddenDates) == true) {
        for (var i = 0; i < hiddenDates.length; i++) {
          if (hiddenDates[i].repeat === undefined) {
            var dateItem = {};
            dateItem.start = moment(hiddenDates[i].start).toDate().valueOf();
            dateItem.end = moment(hiddenDates[i].end).toDate().valueOf();
            body.hiddenDates.push(dateItem);
          }
        }
        body.hiddenDates.sort(function (a, b) {
          return a.start - b.start;
        }); // sort by start time
      }
    }
  };

  /**
   * create new entrees for the repeating hidden dates
   * @param body
   * @param hiddenDates
   */
  exports.updateHiddenDates = function (body, hiddenDates) {
    if (hiddenDates && body.domProps.centerContainer.width !== undefined) {
      exports.convertHiddenOptions(body, hiddenDates);

      var start = moment(body.range.start);
      var end = moment(body.range.end);

      var totalRange = body.range.end - body.range.start;
      var pixelTime = totalRange / body.domProps.centerContainer.width;

      for (var i = 0; i < hiddenDates.length; i++) {
        if (hiddenDates[i].repeat !== undefined) {
          var startDate = moment(hiddenDates[i].start);
          var endDate = moment(hiddenDates[i].end);

          if (startDate._d == "Invalid Date") {
            throw new Error("Supplied start date is not valid: " + hiddenDates[i].start);
          }
          if (endDate._d == "Invalid Date") {
            throw new Error("Supplied end date is not valid: " + hiddenDates[i].end);
          }

          var duration = endDate - startDate;
          if (duration >= 4 * pixelTime) {

            var offset = 0;
            var runUntil = end.clone();
            switch (hiddenDates[i].repeat) {
              case "daily":
                // case of time
                if (startDate.day() != endDate.day()) {
                  offset = 1;
                }
                startDate.dayOfYear(start.dayOfYear());
                startDate.year(start.year());
                startDate.subtract(7, "days");

                endDate.dayOfYear(start.dayOfYear());
                endDate.year(start.year());
                endDate.subtract(7 - offset, "days");

                runUntil.add(1, "weeks");
                break;
              case "weekly":
                var dayOffset = endDate.diff(startDate, "days");
                var day = startDate.day();

                // set the start date to the range.start
                startDate.date(start.date());
                startDate.month(start.month());
                startDate.year(start.year());
                endDate = startDate.clone();

                // force
                startDate.day(day);
                endDate.day(day);
                endDate.add(dayOffset, "days");

                startDate.subtract(1, "weeks");
                endDate.subtract(1, "weeks");

                runUntil.add(1, "weeks");
                break;
              case "monthly":
                if (startDate.month() != endDate.month()) {
                  offset = 1;
                }
                startDate.month(start.month());
                startDate.year(start.year());
                startDate.subtract(1, "months");

                endDate.month(start.month());
                endDate.year(start.year());
                endDate.subtract(1, "months");
                endDate.add(offset, "months");

                runUntil.add(1, "months");
                break;
              case "yearly":
                if (startDate.year() != endDate.year()) {
                  offset = 1;
                }
                startDate.year(start.year());
                startDate.subtract(1, "years");
                endDate.year(start.year());
                endDate.subtract(1, "years");
                endDate.add(offset, "years");

                runUntil.add(1, "years");
                break;
              default:
                console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", hiddenDates[i].repeat);
                return;
            }
            while (startDate < runUntil) {
              body.hiddenDates.push({ start: startDate.valueOf(), end: endDate.valueOf() });
              switch (hiddenDates[i].repeat) {
                case "daily":
                  startDate.add(1, "days");
                  endDate.add(1, "days");
                  break;
                case "weekly":
                  startDate.add(1, "weeks");
                  endDate.add(1, "weeks");
                  break;
                case "monthly":
                  startDate.add(1, "months");
                  endDate.add(1, "months");
                  break;
                case "yearly":
                  startDate.add(1, "y");
                  endDate.add(1, "y");
                  break;
                default:
                  console.log("Wrong repeat format, allowed are: daily, weekly, monthly, yearly. Given:", hiddenDates[i].repeat);
                  return;
              }
            }
            body.hiddenDates.push({ start: startDate.valueOf(), end: endDate.valueOf() });
          }
        }
      }
      // remove duplicates, merge where possible
      exports.removeDuplicates(body);
      // ensure the new positions are not on hidden dates
      var startHidden = exports.isHidden(body.range.start, body.hiddenDates);
      var endHidden = exports.isHidden(body.range.end, body.hiddenDates);
      var rangeStart = body.range.start;
      var rangeEnd = body.range.end;
      if (startHidden.hidden == true) {
        rangeStart = body.range.startToFront == true ? startHidden.startDate - 1 : startHidden.endDate + 1;
      }
      if (endHidden.hidden == true) {
        rangeEnd = body.range.endToFront == true ? endHidden.startDate - 1 : endHidden.endDate + 1;
      }
      if (startHidden.hidden == true || endHidden.hidden == true) {
        body.range._applyRange(rangeStart, rangeEnd);
      }
    }
  };

  /**
   * remove duplicates from the hidden dates list. Duplicates are evil. They mess everything up.
   * Scales with N^2
   * @param body
   */
  exports.removeDuplicates = function (body) {
    var hiddenDates = body.hiddenDates;
    var safeDates = [];
    for (var i = 0; i < hiddenDates.length; i++) {
      for (var j = 0; j < hiddenDates.length; j++) {
        if (i != j && hiddenDates[j].remove != true && hiddenDates[i].remove != true) {
          // j inside i
          if (hiddenDates[j].start >= hiddenDates[i].start && hiddenDates[j].end <= hiddenDates[i].end) {
            hiddenDates[j].remove = true;
          }
          // j start inside i
          else if (hiddenDates[j].start >= hiddenDates[i].start && hiddenDates[j].start <= hiddenDates[i].end) {
            hiddenDates[i].end = hiddenDates[j].end;
            hiddenDates[j].remove = true;
          }
          // j end inside i
          else if (hiddenDates[j].end >= hiddenDates[i].start && hiddenDates[j].end <= hiddenDates[i].end) {
            hiddenDates[i].start = hiddenDates[j].start;
            hiddenDates[j].remove = true;
          }
        }
      }
    }

    for (var i = 0; i < hiddenDates.length; i++) {
      if (hiddenDates[i].remove !== true) {
        safeDates.push(hiddenDates[i]);
      }
    }

    body.hiddenDates = safeDates;
    body.hiddenDates.sort(function (a, b) {
      return a.start - b.start;
    }); // sort by start time
  };

  exports.printDates = function (dates) {
    for (var i = 0; i < dates.length; i++) {
      console.log(i, new Date(dates[i].start), new Date(dates[i].end), dates[i].start, dates[i].end, dates[i].remove);
    }
  }
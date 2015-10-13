'use strict';

const isString = require('../lib/isString');
const isFunction = require('../lib/isFunction');

/**
 * Function extends object with event functions
 * @param {Object} obj
 */
module.exports = function eventsMixin(obj) {
  /**
   * Event handler functions
   * @type {Function[]}
   */
  obj.eventHandlers = {};

  /**
   * Event promises
   * @type {[{}]}
   */
  obj.eventPromises = {};

  /**
   * Method adds event callback to event
   * @param {string} event
   * @param {Function} callback
   */
  obj.addEventListener = function(event, callback) {
    if (!isString(event)) {
      throw new Error('Argument event should be string');
    }

    if (!isFunction(callback)) {
      throw new Error('Argument callback should be function');
    }

    if (!(event in this.eventHandlers)) {
      this.eventHandlers[event] = [];
    }

    this.eventHandlers[event].push(callback);

    if (event in this.eventPromises) {
      this.eventPromises[event].forEach((value) => {
        callback(value);
      });

      delete this.eventPromises[event];
    }
  };

  /**
   * Method removes event listener
   * @param {string} event
   * @param {Function} callback
   */
  obj.removeEventListener = function(event, callback) {
    if (!isString(event)) {
      throw new Error('Argument event should be string');
    }

    if (!isFunction(callback)) {
      throw new Error('Argument callback should be function');
    }

    if (!(event in this.eventHandlers)) {
      return;
    }

    let i = this.eventHandlers[event].indexOf(callback);
    if (i === -1) {
      return;
    }

    this.eventHandlers[event].splice(i, 1);
  };

  /**
   * Method dispatches event. If promise is set, it will be delayed until listener is available. In
   * data you can provide any data passed as first argument for event listener
   * @param {string} event
   * @param {boolean} [promise]
   * @param {*} [data]
   */
  obj.dispatchEvent = function(event, promise, data) {
    if (!isString(event)) {
      throw new Error('Argument event should be string');
    }

    var i;
    promise = promise || false;
    data = data || null;
    if (!(event in this.eventHandlers)) {
      if (promise) {
        if (!(event in this.eventPromises)) {
          this.eventPromises[event] = [];
        }

        this.eventPromises[event].push(data);
      }

      return;
    }

    for (i = 0; i < this.eventHandlers[event].length; i++) {
      this.eventHandlers[event][i](data);
    }
  };

  /**
   * Method removes all current handlers and promises
   */
  obj.clearEvents = function() {
    this.eventHandlers = {};
    this.eventPromises = {};
  };
};

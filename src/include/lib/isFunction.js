'use strict';

/**
 * Function checks if argument passed is function. Returns true if it is
 * @param obj - any variable
 * @returns {boolean}
 */
module.exports = function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

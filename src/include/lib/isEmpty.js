'use strict';

/**
 * Function detects if value is empty (contain null, undefined, empty string, object or array with length equal 0
 * @param {*} value - value to check or object in which check second key if set
 * @param {string} [key] - key to check in object
 * @returns {boolean}
 */
module.exports = function isEmpty(value, key) {
  if (key !== undefined && typeof value === 'object') {
    if (!value.hasOwnProperty(key)) {
      return true;
    }

    value = value[key];
  }

  if (value === null || value === undefined || value === '') {
    return true;
  }

  if (value.hasOwnProperty('length')) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

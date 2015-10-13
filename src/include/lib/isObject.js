'use strict';

/**
 * Function checks if its argument is object (hash). Returns true if it is
 * @param obj - any variable
 * @returns {boolean}
 */
module.exports = function isObject(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval) {
    return false;
  }

  /* istanbul ignore if */
  if (obj.constructor && !hasOwnProperty.call(obj, 'constructor') && !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }

  // jscs:disable
  for (let key in obj) {
    //
  }
  // jscs:enable
  return key === undefined || hasOwnProperty.call(obj, key);
};

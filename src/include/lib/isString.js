/**
 * Function returns true if argument is string.
 *
 * @param {string} value
 * @returns {boolean}
 */
module.exports = function isString(value) {
  return value instanceof String || typeof value === 'string';
};

/**
 * Function converts relative url to absolute one
 * @param {string} url
 * @param {boolean} [returnNode]
 * @returns {Node|string}
 */
module.exports = function qualifyURL(url, returnNode) {
  'use strict';
  let a = document.createElement('a');
  a.href = url;
  if (returnNode === true) {
    return a.cloneNode(false);
  } else {
    return a.cloneNode(false).href;
  }
};

/**
 * Function returns text content for domElements tree.
 * @param {Node} element
 * @returns {string}
 */
exports.parseTextNodes = function parseTextNodes(element) {
  'use strict';
  let content = [];
  Array.prototype.forEach.call(element.childNodes, function(child) {
    if (child.nodeType === Document.TEXT_NODE) {
      content.push(child.nodeValue);
    } else if (child.hasChildNodes()) {
      content.push(parseTextNodes(child));
    }
  });

  return content.join(' ');
};

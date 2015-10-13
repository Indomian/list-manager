/**
 * Method creates new DOM element. Used widely accross all extension
 * @param {string}      tagName
 * @param {Object}      [attrs]
 * @param {string}      [textContent]
 * @returns {Element}
 */
exports.createElement = function(tagName, attrs, textContent) {
  'use strict';
  if (!tagName) {
    return null;
  }

  if (attrs === undefined) {
    attrs = {};
  }

  let element = document.createElement(tagName.toLowerCase());

  if (typeof attrs === 'string' || attrs instanceof String) {
    textContent = attrs;
  } else {
    for (let attrName in attrs) {
      if (attrs.hasOwnProperty(attrName)) {
        if (attrName === 'className') {
          element.className = attrs[attrName];
        } else {
          element.setAttribute(attrName, attrs[attrName]);
        }
      }
    }
  }

  if (textContent) {
    element.appendChild(document.createTextNode(textContent));
  }

  return element;
};

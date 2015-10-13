'use strict';
let domElement = require('dom-element');

module.exports = {
  attr: domElement.attr,
  hasAttr: require('./hasAttribute').hasAttribute,
  attrNS: domElement.attrNS,
  prop: domElement.prop,
  css: domElement.css,
  type: domElement.type,
  data: domElement.data,
  text: domElement.text,
  value: domElement.value,
  hasClass: domElement.hasClass,
  addClass: domElement.addClass,
  removeClass: domElement.removeClass,
  toggleClass: domElement.toggleClass,
  createElement: require('./createElement').createElement,
  getOffset: require('./getOffset').getOffset,
  emptyElement: require('./emptyElement').emptyElement,
  getText: require('./parseTextNodes').parseTextNodes,
  qualifyURL: require('./qualifyURL'),
};

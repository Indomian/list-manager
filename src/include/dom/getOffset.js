/**
 * Method returns DOM element coordinates
 * @param {Element} elem
 * @returns {*}
 */
exports.getOffset = function(elem) {
  'use strict';

  if (!elem || !elem.ownerDocument) {
    return null;
  }

  let offsetParent = elem.offsetParent;
  let doc = elem.ownerDocument;
  let docElem = doc.documentElement;
  let body = doc.body;
  let defaultView = doc.defaultView;
  let prevComputedStyle = defaultView.getComputedStyle(elem, null);
  let top = elem.offsetTop;
  let left = elem.offsetLeft;

  while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
    if (prevComputedStyle.position === 'fixed') {
      break;
    }

    let computedStyle = defaultView.getComputedStyle(elem, null);
    top -= elem.scrollTop;
    left -= elem.scrollLeft;

    if (elem === offsetParent) {
      top += elem.offsetTop;
      left += elem.offsetLeft;

      top += parseFloat(computedStyle.borderTopWidth) || 0;
      left += parseFloat(computedStyle.borderLeftWidth) || 0;

      let prevOffsetParent = offsetParent;
      offsetParent = elem.offsetParent;
    }

    prevComputedStyle = computedStyle;
  }

  if (prevComputedStyle.position === 'relative' || prevComputedStyle.position === 'static') {
    top += body.offsetTop;
    left += body.offsetLeft;
  }

  if (prevComputedStyle.position === 'fixed') {
    top += Math.max(docElem.scrollTop, body.scrollTop);
    left += Math.max(docElem.scrollLeft, body.scrollLeft);
  }

  return {top, left};
};


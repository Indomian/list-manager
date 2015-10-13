/**
 * Function empties element removing all element children
 * @param {Element} anElem
 * @return {Element}
 */
exports.emptyElement = function(anElem) {
  'use strict';

  while (anElem.firstChild) {
    anElem.removeChild(anElem.firstChild);
  }

  return anElem;
};

const dom = require('common/dom/main.js');

class CounterElement {
  /**
   * @param {string|HTMLElement} selector
   * @param {HTMLElement|HTMLDocument} [context]
   * @returns {null}
   */
  constructor(selector, context) {
    'use strict';
    context = context || document;
    this._element = null;
    if (selector instanceof HTMLElement) {
      this._element = selector;
    } else {
      this._element = context.querySelector(selector);
    }

    this._counter = 0;
  }

  /**
   * Method increase inner counter by given value
   * @param {number} [step]
   */
  inc(step) {
    'use strict';
    step = step || 1;
    this._counter += step;
    this.show();
  }

  show() {
    if (this._element !== null) {
      dom.text(this._element, this._counter);
    }
  }
}

module.exports = CounterElement;

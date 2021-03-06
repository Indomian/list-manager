'use strict';
/**
 * @typedef {Function} callbackResponse
 * @param {string} Error - if error contains some text
 * @param ... - other callback data
 */

/**
 * Class MessageProcessor provides main plugin functionality
 */
class MessageProcessor {
  constructor() {
    require('./mixin/eventsMixin')(this);

    this._list = null;
  }

  set dataList(value) {
    this._list = value;
  }

  get dataList() {
    if (this._list !== null) {
      return this._list;
    }

    throw new ValueNotSetError();
  }

  /**
   * Method provides processing message.
   *
   * @param {Object} message
   * @param {callbackResponse} callbackResponse
   * @param {string} tabId
   */
  processMessage(message, callbackResponse, tabId) {
    try {
      switch (message.action) {
        case 'clearList':
          this.dataList.clear();
          callbackResponse();
          break;
        case 'addToList':
          let item = this.dataList.set(message.data, 1);
          callbackResponse('', item);
          break;
        case 'isInList':
          console.log(this.dataList);
          callbackResponse('', this.dataList.has(message.data));
          break;
        case 'removeFromList':
          if (this.dataList.has(message.data)) {
            this.dataList.remove(message.data);
          }

          callbackResponse();
          break;
        case 'getList':
          let result = this.dataList.getAll();
          callbackResponse('', result);
          break;
        default:
          callbackResponse('Action not supported');
      }
    } catch (e) {
      callbackResponse(e.getMessage());
    }
  }
}

class ValueNotSetError extends Error {}

module.exports = {
  MessageProcessor,
  ValueNotSetError,
};

'use strict';

const isObject = require('./include/lib/isObject');
const {MessageProcessor} = require('./include/MessageProcessor');
const {DataStorage} = require('./include/DataStorage');

let main = new MessageProcessor();
main.dataList = new DataStorage();

function createCallbackResponse(callbackResponse) {
  return function(error, data) {
    error = error || '';
    data = data || null;
    callbackResponse({
      error,
      data,
    });
  };
}

/**
 * Function process messages from content scripts to background.
 *
 * @param {Object} message
 * @param {Sender} sender
 * @param {callbackResponse} callbackResponse
 * @returns {boolean}
 */
function messageProcessor(message, sender, callbackResponse) {
  callbackResponse = createCallbackResponse(callbackResponse);

  if (!isObject(message)) {
    callbackResponse('message has wrong structure');
  }

  if (!message.hasOwnProperty('action')) {
    callbackResponse('message has no property action');
  }

  let tabId = 0;
  if (sender.hasOwnProperty('tab') && sender.tab.id) {
    tabId = sender.tab.id;
  }

  main.processMessage(message, callbackResponse, tabId);

  return true;
}

chrome.runtime.onMessage.addListener(messageProcessor);

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(activeInfo);
});


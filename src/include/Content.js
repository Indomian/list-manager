const {ItemButton} = require('./ItemButton');
const {URIObject} = require('./URIObject');

class Content {
  constructor() {
    this._url = new URIObject(document.location.toString());
    this._itemsMap = new Map();
  }

  get isCommunitySearchPage() {
    return this._url.getQueryVar('act') === 'community_search';
  }

  sendMessage(action, data, callback) {
    let message = {
      action: action,
      data: data,
    };
    chrome.runtime.sendMessage(message, function(answer) {
      callback.call(this, answer.error, answer.data);
    });
  }

  /**
   * Method creates item buttom binded to current content instance.
   * Also it checks if current row is data row.
   *
   * @param {HTMLElement} element - row of table to which button should be added
   */
  createItemButton(element) {
    let button = element.querySelector('td:nth-child(6) button');
    if (button !== null) {
      let onclickText = button.getAttribute('onclick');
      let match = onclickText.match(/^Exchange\.addRequest\((\d+), (\d+), 1\);$/);
      if (match) {
        this.sendMessage('isInList', match[1], (error, answer) => {
          if (error === '') {
            let button = new ItemButton(this, element, match[1], match[2]);
            this._itemsMap.set(element, button);
            if (answer === true) {
              button.mode = ItemButton.MODE_REMOVE;
            } else {
              button.mode = ItemButton.MODE_ADD;
            }
          }
        });
      }
    }
  }

  initCommunitySearchPage() {
    let elements = Array.prototype.slice.call(document.querySelectorAll('#exchange_comm_search_table tr'));
    elements.forEach((element) => {
      this.createItemButton(element);
    });

    let observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let mutation = mutations[i];
        if (mutation.target.tagName === 'TBODY') {
          if (mutation.addedNodes.length > 0) {
            let nodes = Array.prototype.slice.call(mutation.addedNodes);
            nodes.forEach((element) => {
              this.createItemButton(element);
            });
          }

          if (mutation.removedNodes.length > 0) {
            let nodes = Array.prototype.slice.call(mutation.addedNodes);
            nodes.forEach((element) => {
              if (this._itemsMap.has(element)) {
                this._itemsMap.get(element).remove();
                this._itemsMap.delete(element);
              }
            });
          }

          break;
        } else if (mutation.target.tagName === 'TABLE') {
          this._itemsMap.forEach(element => element.remove());
          this._itemsMap.clear();
          let nodes = Array.prototype.slice.call(document.querySelectorAll('#exchange_comm_search_table tr'));
          nodes.forEach((element) => {
            this.createItemButton(element);
          });
        }
      }
    });
    observer.observe(document.getElementById('exchange_comm_search_table'), {childList: true, subtree: true});
  }
}

module.exports = {
  Content,
};

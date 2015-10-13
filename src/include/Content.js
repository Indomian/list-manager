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

  createItemButton(element) {
    if (element.querySelector('td:nth-child(6) button')) {
      this._itemsMap.set(element, new ItemButton(this, element));
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
        }
      }
    });
    observer.observe(document.getElementById('exchange_comm_search_table'), {childList: true, subtree: true});
  }
}

module.exports = {
  Content,
};

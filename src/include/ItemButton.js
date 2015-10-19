const dom = require('./dom/main');
const config = require('./config');

class ItemButton {
  constructor(content, element, groupId, advertId) {
    this._content = content;
    this._rootElement = element;
    this._element = null;
    this._groupId = groupId;
    this._advertId = advertId;
    this._mode = 0;
    this.render();
  }

  get content() {
    return this._content;
  }

  addToListHandler() {
    this.content.sendMessage('addToList', this._groupId, (error, answer) => {
      if (error === '') {
        this.mode = ItemButton.MODE_REMOVE;
        console.log('Added to list: ' + this._groupId);
      }
    });
  }

  removeFromListHandler() {
    this.content.sendMessage('removeFromList', this._groupId, (error, answer) => {
      if (error === '') {
        this.mode = ItemButton.MODE_ADD;
        console.log('Removed to list: ' + this._groupId);
      }
    });
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    if (value === this._mode) {
      return;
    }

    this._mode = value;
    this.update();
  }

  render() {
    if (this._element !== null) {
      this.update();
      return;
    }

    this._element = dom.createElement('div', {
      className: config.css(['item-block', 'item-undefined']),
    });

    let buttonAdd = dom.createElement('button', {
      className: config.css('button'),
      style: 'display:none',
    }, 'Добавить в список');

    buttonAdd.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.addToListHandler();
    });

    let buttonRemove = dom.createElement('button', {
      className: config.css('button'),
      style: 'display:none',
    }, 'Убрать из списка');

    buttonRemove.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.removeFromListHandler();
    });

    this._element.appendChild(buttonAdd);
    this._element.appendChild(buttonRemove);

    let position = dom.getOffset(this._rootElement);
    dom.css(this._element, {
      top: position.top + 'px',
    });
    document.getElementById('page_layout').appendChild(this._element);
  }

  update() {
    if (this._mode === ItemButton.MODE_ADD) {
      dom.css(this._element.firstChild, 'display', '');
      dom.css(this._element.lastChild, 'display', 'none');
    } else if (this._mode === ItemButton.MODE_REMOVE) {
      dom.css(this._element.firstChild, 'display', 'none');
      dom.css(this._element.lastChild, 'display', '');
    } else {
      dom.css(this._element.firstChild, 'display', 'none');
      dom.css(this._element.lastChild, 'display', 'none');
    }
  }

  remove() {
    if (this._element !== null) {
      document.getElementById('page_layout').removeChild(this._element);
      this._element = null;
    }

    this._content = null;
    this._rootElement = null;
  }
}

ItemButton.MODE_UNSET = 0;
ItemButton.MODE_ADD = 1;
ItemButton.MODE_REMOVE = 2;

module.exports = {
  ItemButton,
};

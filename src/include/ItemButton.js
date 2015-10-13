const dom = require('./dom/main');
const config = require('./config');

class ItemButton {
  constructor(content, element) {
    this._content = content;
    this._rootElement = element;
    this._element = null;
    this.render();
  }

  get content() {
    return this._content;
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
    }, 'Добавить в список');

    let buttonRemove = dom.createElement('button', {
      className: config.css('button'),
    }, 'Убрать из списка');

    this._element.appendChild(buttonAdd);
    this._element.appendChild(buttonRemove);

    let position = dom.getOffset(this._rootElement);
    dom.css(this._element, {
      top: position.top + 'px',
    });
    document.getElementById('page_layout').appendChild(this._element);
  }

  update() {

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

module.exports = {
  ItemButton,
};

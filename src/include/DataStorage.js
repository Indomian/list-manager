class DataStorage {
  constructor() {
    this._data = new Map();
    this.loadFromStorage();
  }

  loadFromStorage() {
    this._data.clear();
    try {
      let data = JSON.parse(localStorage.getItem('data'));
      if (data  instanceof Array) {
        for (let value of data) {
          this._data.set(value, 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  saveToStorage() {
    let result = [];
    for (let [key, value] of this._data) {
      result.push(key);
    }

    localStorage.setItem('data', JSON.stringify(result));
  }

  set(key, value) {
    this._data.set(key, value);
    this.saveToStorage();
  }

  has(key) {
    return this._data.has(key);
  }

  remove(key) {
    this._data.delete(key);
    this.saveToStorage();
  }

  get(key) {
    return this._data.get(key);
  }

  getAll() {
    let result = [];
    for (let [key, value] of this._data) {
      result.push(key);
    }

    return result;
  }
}

module.exports = {
  DataStorage,
};

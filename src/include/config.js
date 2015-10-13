const isString = require ('./lib/isString');

module.exports = {
  CSS_PREFIX: 'list-manager-',
  css: function css(name) {
    if (isString(name)) {
      return module.exports.CSS_PREFIX + name + ' ';
    } else {
      let result = '';
      name.forEach((value) => {
        result += css(value);
      });
      return result;
    }
  },
};

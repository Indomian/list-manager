const toCamelCase = require('to-camel-case');

exports.hasAttribute = function(element, name) {
  name = toCamelCase(name === 'for' ? 'htmlFor' : name);
  return element.hasAttribute(name);
};

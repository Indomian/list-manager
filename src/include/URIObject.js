'use strict';

const isEmpty = require('./lib/isEmpty');

/**
 * @typedef {Object} URIObject
 * @property {string} anchor - anchor part of uri (without hash)
 * @property {string} query - query part of uri (with question)
 * @property {string} file - file part of uri (if exists)
 * @property {string} directory - directory part of uri
 * @property {string} path - path to file relative to domain
 * @property {string} relative - relative part of uri
 * @property {string} port - connection port (if set)
 * @property {string} domain - domain
 * @property {string} password - password if set in uri
 * @property {string} user - username if set
 * @property {string} userInfo - user name and password devided with ":", if exists
 * @property {string} authority - ???
 * @property {string} scheme - connection protocol/scheme
 * @property {string} url - full url
 * @property {string} cache - link to google page cache
 * @property {string} clean_domain - domain part, without other characters
 * @property {string} topdomain - top part of domain
 *
 * @description Object used to store URI as map with keys showing parts of URI.
 */

class URIObject {
  constructor(string) {
    let o;
    let m;
    let l;
    let i;
    let match;
    let p;

    if (string.indexOf('@') >= 0) {
      string = string.split('//');
      if (string[1].indexOf('/') > 0) {
        string[1] = string[1].substr(0, string[1].indexOf('/')) + string[1].substr(string[1].indexOf('/')).replace('@', '%40');
      }

      string = string[0] + '//' + string[1];
    }

    o = URIObject.options;
    m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(string);
    i = o.key.length; //TODO Some magic? Was magic 14

    while (i--) {
      this[o.key[i]] = m[i] || '';
    }

    //TODO More magic? Looks like require update: http://www.hacktabs.com/google-pagerank-is-not-dead/
    this.cache = 'http://toolbarqueries.google.com/search?hl=en&ie=UTF-8&oe=UTF-8&q=cache:' + this.url;
    this.clean_domain = this.domain.replace(/^www\./, '');

    this.query = '?' + this.query;

    match = this.domain.match(/^.+\.{1}([a-z0-9\-]+\.{1}[a-z]+)$/i);
    this.topdomain = (match) ? match[1] : this.domain;

    p = this.domain.split('.');
    p = p.reverse();
    for (i = 0, l = p.length; i < l; i++) {
      this[(i + 1).toString()] = p[i];
    }
  }

  get queryAsMap() {
    let result = new Map();
    let str = this.query.substr(1);

    if (isEmpty(str)) {
      return result;
    }

    let args = str.split('&');

    for (let element of args) {
      if (element.indexOf('=') !== -1) {
        let [key, value] = element.split('=');
        result.set(key, value);
      } else {
        result.set(element, null);
      }
    }

    return result;
  }

  getQueryVar(key) {
    let query = this.queryAsMap;
    if (query.has(key)) {
      return query.get(key);
    }

    return undefined;
  }
}

URIObject.options = {
  strictMode: false,
  key: ['url', 'scheme', 'authority', 'userInfo', 'user', 'password', 'domain', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
  q: {
    name: 'queryKey',
    parser: /(?:^|&)([^&=]*)=?([^&]*)/g,
  },
  parser: {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  },
};

module.exports = {
  URIObject,
};

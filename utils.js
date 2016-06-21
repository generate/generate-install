'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('async-each-series', 'eachSeries');
require('base-npm', 'npm');
require('base-pkg', 'pkg');
require('extend-shallow', 'extend');
require('is-valid-app', 'isValid');
require('isobject', 'isObject');
require('parser-front-matter', 'parser');
require = fn;

/**
 * Cast `val` to an array
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Remove names that are already listed in `package.json`
 */

utils.unique = function(app, type, keys) {
  var names = utils.arrayify(Object.keys(app.pkg.get(type) || {}));
  return utils.arrayify(keys).filter(function(name) {
    return names.indexOf(name) === -1;
  });
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
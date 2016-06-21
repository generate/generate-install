'use strict';

require('mocha');
var assert = require('assert');
var install = require('./');

describe('generate-install', function() {
  it('should export a function', function() {
    assert.equal(typeof install, 'function');
  });

  it('should export an object', function() {
    assert(install);
    assert.equal(typeof install, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      install();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});

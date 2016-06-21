'use strict';

var utils = require('./utils');

module.exports = function(app) {
  if (!utils.isValid(app, 'generate-install'));

  app.use(utils.npm());
  app.use(utils.pkg());
  app.use(require('generate-collections'));

  /**
   * Middleware to get `install` objects from front-matter
   */

  app.postWrite(/./, function(file, next) {
    if (typeof file.data === 'undefined' || typeof file.data.install === 'undefined') {
      next();
      return;
    }
    if (utils.isObject(file.data.install)) {
      for (var type in file.data.install) {
        app.union(['cache.install', type], utils.arrayify(file.data.install[type]));
      }
    } else {
      app.union('cache.install.devDependencies', utils.arrayify(file.data.install));
    }
    next();
  });

  /**
   * Prompt to install any `dependencies` or `devDependencies` after writing files to
   * the file system. By default this only installs deps that were found in front-matter.
   * _(this task is named this way to make it easy to use programatically by other
   * generators)_.
   *
   * ```sh
   * $ gen install:prompt-install
   * ```
   * @name prompt-install
   * @api public
   */

  app.task('prompt-install', install(app, true));

  /**
   * Automatically install any `dependencies` or `devDependencies` after writing files to
   * the file system. By default this only installs deps that were found in front-matter.
   *
   * ```sh
   * $ gen install
   * ```
   * @name install
   * @api public
   */

  app.task('install', install(app));

  /**
   * Default task
   */

  app.task('default', ['prompt-install']);
};

function install(app, prompt) {
  return function(cb) {
    var types = app.get('cache.install') || {};
    if (typeof types === 'undefined') {
      cb();
      return;
    }

    if (Array.isArray(types)) {
      types = { devDependencies: types };
    }

    utils.eachSeries(Object.keys(types), function(type, next) {
      var keys = types[type] || [];
      var names = utils.unique(app, type, keys);
      if (!names.length) {
        next();
        return;
      }

      if (prompt === true) {
        app.npm.askInstall(names, {method: type, type: type}, next);
      } else {
        app.npm[type](names, next);
      }
    }, cb);
  };
}
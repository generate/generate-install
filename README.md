# generate-install [![NPM version](https://img.shields.io/npm/v/generate-install.svg?style=flat)](https://www.npmjs.com/package/generate-install) [![NPM downloads](https://img.shields.io/npm/dm/generate-install.svg?style=flat)](https://npmjs.org/package/generate-install) [![Build Status](https://img.shields.io/travis/generate/generate-install.svg?style=flat)](https://travis-ci.org/generate/generate-install)

Generator that automatically detects the dependencies or devDependencies to install based on the templates or includes used. This can be used as a sub-generator or plugin in your own generator.

## TOC

- [What is generate?](#what-is-generate)
- [Usage](#usage)
- [CLI](#cli)
- [Tasks](#tasks)
- [API](#api)
- [Related projects](#related-projects)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## What is generate?

Generate is a new, open source developer framework for rapidly initializing and scaffolding out new code projects, offering an intuitive CLI, and a powerful and expressive API that makes it easy and enjoyable to use.

Visit the [getting started guide](https://github.com/generate/getting-started) or the [generate](https://github.com/generate/generate) project and documentation to learn more.

## Usage

Register as a plugin or sub-generator:

```js
// plugin
module.exports = function(app) {
  app.use(require('generate-install'));
};

// sub-generator
module.exports = function(app) {
  app.register('foo', require('generate-install'));
};
```

See the [generate docs](https://github.com/generate/generate) for more details.

## CLI

**Installing the CLI**

To run the `install` generator from the command line, you'll need to install [generate](https://github.com/generate/generate) globally first. You can do that now with the following command:

```sh
$ npm i -g generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Help**

Get general help and a menu of available commands:

```sh
$ gen help
```

**Running the `install` generator**

Once both [generate](https://github.com/generate/generate) and `generate-install` are installed globally, you can run the generator with the following command:

```sh
$ gen install
```

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

## Tasks

### [install:prompt-install](generator.js#L44)

Prompt to install any `dependencies` or `devDependencies` after rendering or writing files. By default this only that were detected in front-matter. _(this task is named this way to make it easy to use programatically by other generators)_.

**Example**

```sh
$ gen install:prompt-install
```

### [install](generator.js#L57)

Automatically install any `dependencies` or `devDependencies` after writing files to the file system. By default this only installs deps that were found in front-matter.

**Example**

```sh
$ gen install
```

## API

This updater can also be used as a node.js library in your own updater. To do so you must first install generate-install locally.

**Install**

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save generate-install
```

**Use as a plugin in your generator**

Use as a plugin if you want to extend your own generator with the features, settings and tasks of generate-install, as if they were created on your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  app.use(require('generate-install'));

  // specify any tasks from generate-install. Example:
  app.task('default', ['install']);
};
```

**Use as a sub-generator**

Use as a sub-generator if you want expose the features, settings and tasks from generate-install on a _namespace_ in your generator.

In your `generator.js`:

```js
module.exports = function(app) {
  // register the generate-install generator (as a sub-generator with an arbitrary name)
  app.register('foo', require('generate-install'));

  app.task('minify', function(cb) {
    // minify some stuff
    cb();
  });

  // run the "default" task on generate-install (aliased as `foo`), 
  // then run the `minify` task defined in our generator
  app.task('default', function(cb) {
    app.generate(['foo:default', 'minify'], cb);
  });
};
```

Tasks from `generate-install` will be available on the `foo` namespace from the API and the command line. Continuing with the previous code example, to run the `default` task on `generate-install`, you would run `gen foo:default` (or just `gen foo` if `foo` does not conflict with an existing task on your generator).

To learn more about namespaces and sub-generators, and how they work, [visit the getting started guide](https://github.com/generate/getting-started).

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-install/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 21, 2016._
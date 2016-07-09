# generate-install [![NPM version](https://img.shields.io/npm/v/generate-install.svg?style=flat)](https://www.npmjs.com/package/generate-install) [![NPM downloads](https://img.shields.io/npm/dm/generate-install.svg?style=flat)](https://npmjs.org/package/generate-install) [![Build Status](https://img.shields.io/travis/generate/generate-install.svg?style=flat)](https://travis-ci.org/generate/generate-install)

Generator that automatically detects the dependencies or devDependencies to install based on the templates or includes used. This can be used as a sub-generator or plugin in your own generator.

## What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/){generators.md} and [tasks](https://github.com/generate/generate/blob/master/docs/){tasks.md}. Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

For more information about Generate:

* Visit the [generate project](https://github.com/generate/generate)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/){micro-generators.md})

## How does generate-install work?

This generator can be [installed](#install) as a dependency and registered with the `.use` method in your own generator.

**Install**

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install generate-install
```

**Example usage**

In your own [generator](https://github.com/generate/generate/blob/master/docs/){generators.md}:

```js
module.exports = function(app) {
  app.use(require('generate-install'));
};
```

Once registered, generate-install does two things:

* [middleware](#middleware): Adds a middleware for getting dependencies to install
* [prompt](#prompt): Adds a task for prompting the user to install the detected dependencies

### 1. middleware

Adds a `.postWrite` [middleware](https://github.com/generate/generate/blob/master/docs/){middleware.md}, which runs after a file is written to the file system to see if an `install` object was defined in [yaml front-matter](https://github.com/generate/generate/blob/master/docs/){front-matter.md}).

**Example**

This example shows a basic `gulpfile.js` template with front-matter that defines `gulp` as a dev dependency.

```js
---
install:
  devDependencies: ['gulp']
---
var gulp = require('gulp');

gulp.task('default', function(cb) {
  // do task stuff
  cb();
});
```

If the `install` object exists, the middleware will extract the `dependencies` and `devDependencies`, filtering out any deps that are already installed and listed in `package.json`.

This also works:

```js
---
install: ['gulp']
---
var gulp = require('gulp');

gulp.task('default', function(cb) {
  // do task stuff
  cb();
});
```

Which is normalize to `{devDependencies: ['gulp']}`.

### 2. prompt

The second thing this generator adds is an optional [task](#tasks) for prompting the user.

**Example usage**

Run after other tasks are finished:

```js
app.use(require('generate-install'));
app.task('generate-stuff', function(cb) {
  cb();
});

app.generate(['generate-stuff', 'install'], function(err) {
  if (err) return console.log(err);
});
```

This task is optional, since the user can also install this generator globally and run is directly.

**Example**

If your generate is named `foo`, the user can do this:

```sh
gen foo install
```

## Tasks

Visit Generate's [task documentation](https://github.com/generate/generate/blob/master/docs/){tasks.md}.

## About

### Related projects

You might also be interested in these projects:

* [generate-eslint](https://www.npmjs.com/package/generate-eslint): Generate a `.eslintrc.json` or `.eslintignore` file as part of a larger build workflow. This generator… [more](https://github.com/generate/generate-eslint) | [homepage](https://github.com/generate/generate-eslint "Generate a `.eslintrc.json` or `.eslintignore` file as part of a larger build workflow. This generator can be used as a sub-generator or plugin inside other generators.")
* [generate-license](https://www.npmjs.com/package/generate-license): Generate a license file for a GitHub project. | [homepage](https://github.com/generate/generate-license "Generate a license file for a GitHub project.")
* [generate-package](https://www.npmjs.com/package/generate-package): Generate a package.json for a project. This generator can be used as a plugin or… [more](https://github.com/generate/generate-package) | [homepage](https://github.com/generate/generate-package "Generate a package.json for a project. This generator can be used as a plugin or sub-generator in your own generator, as a component of a larger build workflow.")
* [generate-travis](https://www.npmjs.com/package/generate-travis): Generate a .travis.yml file to the cwd or specified directory. Install globally and run with… [more](https://github.com/generate/generate-travis) | [homepage](https://github.com/generate/generate-travis "Generate a .travis.yml file to the cwd or specified directory. Install globally and run with generate's CLI, or use as a component in your own generator.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/generate-install/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on July 09, 2016._
## Intro

This repository is a seed AngularJS application written in TypeScript. Its focus is on showing how TypeScript modules can be managed by using SystemJS, and how unit tests can be written and run in such a project configuration.

## Software Prerequisites

In order to run this seed, the following software is required.

### Git

See [Setting Up Git](https://help.github.com/articles/set-up-git/) from the GitHub guides.

### Node.js, npm

Node.js and Node's package manager, npm, are used for installing dependencies and run Gulp tasks.

### Gulp

Gulp is used for running the build steps, and running tests.

### TSD

TSD is a package manager to search and install TypeScript definition files directly from the community driven [DefinitelyTyped] (https://github.com/borisyankov/DefinitelyTyped) repository.

## Getting Started

Begin by cloning the repository.

Use npm to get dependencies: `npm install`

TypeScript definition files are stored in the `typings` directory. You can reinstall them with the command `tsd reinstall` if needed. The application code is stored in the `app` directory, while test code resides in the `test` directory.
 
## The Build/Test Pipeline

This seed uses Gulp tasks for all building and testing steps, they are all defined in `gulpfile.js`.
 
### Build

The `build` task invokes the TypeScript compiler via the `gulp-typescript` plugin to create ES5 JavaScript file and source maps from the `.ts` files. Run with:

`gulp build`

The generated files are output in the `dist` folder. You can examine the configuration of the TypeScript compiler in `tsconfig.json`. The `build` task also copies in the `dist` folder the necessary JavaScript libraries (i.e., AngularJS and SystemJS) and static assets (e.g., `index.html`).

To remove all generated files, run:

`gulp clean_dist`.

### Serve and Watch

To see the app run and have `.ts` file recompiled upon changes (with the addition of app auto-reload), run:

`gulp serve`.

### Production

The `build_prod` task generates a (minified) `bundle.js` file from the compiled `.ts` files by using the SystemJS builder. The generated file is output in the `prod` directory. The task also copies in the `prod` directory the necessary libraries and static assets. Run with:
 
 `gulp build_prod`.
 
 To remove all generated files, run:
 
 `gulp clean_prod`.
 
 To see the app run using the bundle, run:
 
 `gulp prod`.

### Test

We use Karma with the Jasmine framework to run tests. Try them with

`gulp test`

This will start a persistent process which will re-run tests whenever `.ts` application or test files are changed. The generated `.js` test files are output in the `dist` folder. 

You can see the Karma configuration at `karma.conf.js`. A few things are notable:

* Only the test JavaScript files are included and watched.

* SystemJS is configured by using the `karma-systemjs` plugin. SystemJS will serve the application compiled JavaScript files and external libraries.

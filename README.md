# lazyload-script 😴 &middot; [![Build Status](https://travis-ci.org/jpdevries/lazyload-script.svg?branch=master)](https://travis-ci.org/jpdevries/lazyload-script) [![npm version](https://badge.fury.io/js/lazyload-script.svg)](https://badge.fury.io/js/lazyload-script)

Promise based method for adding a script to the page if it has not already been added.

##  Install

```bash
yarn add lazyload-script
```

```bash
bower install lazyload-script
```

## Weight In
#### Imported Weight
When used with `require()` you'll notice very little weight is added to your bundle.

```js
const lazyLoadScript = require('lazyLoadScript');
```

#### VanillaJS Weight
| Script        | Disk Size           | GZIP  |
| ------------- | ------------- | ----- |
| `lazyload-script.0.0.4.js`      | `4.82kB`      |   `1.48kB` |
| `lazyload-script.0.0.4.min.js`      | `1.64kB`      |   `773b` |

The UMD module wrapper weighs more than the `lazyLoadScript()` method itself.  
If you want to go rogue, you can [load directly from source](https://github.com/jpdevries/lazyload-script/blob/master/lazyload-script.js).

## Usage

`lazyLoadScript` accepts two parameters. The path to the script to load and either an id or configuration object.

```js
lazyLoadScript('js/main.js', 'main').then(() => {
  // main.js is loaded now with an id of main
})
```
_The id parameter is optional. It is used to ensure that subsequent requests to load a script with that same id immediately resolve. If you omit the id parameter, the DOM will first be queried for a `<script>` with the same `src` attribute, before making a new request by appending a new `<script>` tag._

`lazyLoadScript` uses this id to ensure scripts with the same id are only loaded once. This allows web components to request dependencies with `lazyLoadScript` and rest assured the script will always be ready but only be requested as needed.


`lazyLoadScript` is packaged as a UMD module so it can be included in several ways.

> The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others). In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.  
&emsp;&mdash;&emsp;[umd](https://github.com/umdjs/umd)

With `require()`  
```js
const lazyLoadScript = require(`lazyLoadScript`);
lazyLoadScript('main.js', 'main').then(() => {
  /// main.js loaded
});

```

With VanillaJS
```js
lazyLoadScript('main.js', 'main').then(() => {
  /// main.js loaded
});
```

Multiple scripts can asynchronously be loaded by passing an Array of `lazyLoadScript` promises to `Promise.all()`.

```js
  Promise.all([
    lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js", "react.15.4.2.min.js"),
    lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js", "react-dom.15.4.2.min.js")
  ]).then(() => {
    // React is ready, maybe load your component with lazyLoadScript() now?
  });
```

## Configuration

`lazyLoadScript` accepts two parameters. The path to the script to load and either an id or configuration object.

| Option        | Default           | Description  |
| ------------- | ------------- | ----- |
| `async`      | `undefined`      |   If true adds an `async` attribute |
| `defer`      | `undefined`      |   If true adds a `defer` attribute |
| `integrity`      | `undefined`      |   If set adds an `integrity` attribute |
| `type`      | `undefined`      |   If set adds a `type` attribute |
| `text`      | `undefined`      |   If set adds an `text` attribute |
| `charset`      | `undefined`      |   If set adds an `charset` attribute |
| `crossorigin`      | `undefined`      |   If set adds an `crossorigin` attribute |
| `force`      | `false`      |   If true forces an asset to be loaded even if another with the same `id` or `href` are found |

## CDN Fallbacks

Loading common libraries and frameworks from CDNs can be great for leveraging the browser cache, but to keep your experience functional in the event the CDN is reachable, it is recommended to load a local fallback.

For example:

```js
const promises = [
  // try to load React from a CDN, fallback to a local copy
  lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js", "react.15.4.2.min.js").catch((err => (
    lazyLoadScript(`./js/vendor/react.15.4.2.min.js`, "react.15.4.2.min.js")
  ))),
  // try to load React DOM from a CDN, fallback to a local copy
  lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js", "react-dom.15.4.2.min.js").catch((err => {
    lazyLoadScript(`./js/vendor/react-dom.15.4.2.min.js`, "react-dom.15.4.2.min.js")
  })),
  // try to load Redux from a CDN, fallback to a local copy
  lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js", "redux.3.6.0.min.js").catch((err => {
    lazyLoadScript(`./js/vendor/redux.3.6.0.min.js`, "redux.3.6.0.min.js")
  })),
  // try to load React Redux from a CDN, fallback to a local copy
  lazyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.3/react-redux.min.js", "react-redux.5.0.3.min.js").catch((err => {
    lazyLoadScript(`./js/vendor/react-redux.5.0.3.min.js`, "react-redux.5.0.3.min.js")
  }))
];


Promise.all(promises).then(() => {
  // React, React DOM, Redux, and React Redux are ready. woohoo! maybe load your component with lazyLoadScript() now?
});
```

## See Also
 - [`lazyload-css`](https://github.com/jpdevries/lazyload-css/tree/master#lazyload-css)

## ✅ Getting Started
We're going to use `yarn` so make sure that is installed.

```bash
npm install yarn -g
```

Now clone the repo and run the tests.

```bash
git clone -b master git://github.com/jpdevries/lazyload-script.git
cd lazyload-script
yarn
yarn test
```

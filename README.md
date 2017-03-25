# lazyload-script

Promise based method for adding a script to the page if it has not already been added.

## Install

```bash
yarn add lazyload-script
```

```bash
bower install lazyload-script
```

## Usage


`lazyLoadScript` is packaged as a UMD module so it can be included in several ways.

> The UMD pattern typically attempts to offer compatibility with the most popular script loaders of the day (e.g RequireJS amongst others). In many cases it uses AMD as a base, with special-casing added to handle CommonJS compatibility.  
&emsp;&mdash;&emsp;[umd](https://github.com/umdjs/umd)

With `require()`  
```js
var lazyLoadScript = require(`lazyLoadScript`);
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

Multiple scripts can asynchronously be loaded by passing an Array of `addScript` promises to `Promise.all()`.

```js
  Promise.all([
    addScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js", "react.15.4.2.min.js"),
    addScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js", "react-dom.15.4.2.min.js")
  ]).then(() => {
    // React is ready, maybe load your component with addScript() now?
  });
```

Loading common libraries and frameworks from CDNs can be great for leveraging the browser cache, but to keep your experience functional in the event the CDN is reachable, it is recommended to load a local fallback.

For example:

```js
const promises = [
  // try to load React from a CDN, fallback to a local copy
  addScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js", "react.15.4.2.min.js").catch((err => (
    addScript(`./js/vendor/react.15.4.2.min.js`, "react.15.4.2.min.js")
  ))),
  // try to load React DOM from a CDN, fallback to a local copy
  addScript("https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js", "react-dom.15.4.2.min.js").catch((err => {
    addScript(`./js/vendor/react-dom.15.4.2.min.js`, "react-dom.15.4.2.min.js")
  })),
  // try to load Redux from a CDN, fallback to a local copy
  addScript("https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js", "redux.3.6.0.min.js").catch((err => {
    addScript(`./js/vendor/redux.3.6.0.min.js`, "redux.3.6.0.min.js")
  })),
  // try to load React Redux from a CDN, fallback to a local copy
  addScript("https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.3/react-redux.min.js", "react-redux.5.0.3.min.js").catch((err => {
    addScript(`${MODx.config.assets_url}components/eureka/js/vendor/react-redux.5.0.3.min.js`, "react-redux.5.0.3.min.js")
  }))
];


Promise.all(promises).then(() => {
  // React is ready, maybe load your component with addScript() now?
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

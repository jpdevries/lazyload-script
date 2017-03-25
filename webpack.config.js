const path = require('path'),
webpack = require('webpack'),
UnminifiedWebpackPlugin = require('unminified-webpack-plugin'),
VERSION = (require("./package.json").version);

module.exports = {
    context: __dirname,
    entry: "./lazyload-script.js",
    output: {
        path: __dirname + "/dist",
        filename: `lazyload-script.${VERSION}.min.js`,
        libraryTarget: 'umd',
        library: 'lazyLoadScript'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          }],
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: false, // React doesn't support IE8
          warnings: false
        },
        mangle: {
          screw_ie8: false
        },
        output: {
          comments: false,
          screw_ie8: false
        }
      }),
      new UnminifiedWebpackPlugin({
            postfix: ''
        })
    ]
}

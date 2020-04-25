/* eslint strict: "off", import/no-extraneous-dependencies: "off" */

'use strict';

const webpack = require('webpack');
const path = require('path');

const port = 3000;

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'source-map',
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../docs'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    contentBase: './docs', // set 'public' path, relative to root
    noInfo: true,
    hot: true,
    port,
    host: 'localhost',
    open: 'Google Chrome',
  },
};

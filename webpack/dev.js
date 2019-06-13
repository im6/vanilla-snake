
/* eslint strict: "off", import/no-extraneous-dependencies: "off" */

'use strict';

const webpack = require('webpack');
const path = require('path');

const port = 3000;

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/main.js',
    'webpack/hot/only-dev-server',
    `webpack-dev-server/client?http://localhost:${port}`,
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }],
      },
    ],
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    contentBase: './public', // set 'public' path, relative to root
    noInfo: true,
    hot: true,
    inline: true,
    port,
    host: 'localhost',
    open: 'Google Chrome',
  },
};

"use strict";
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //devtool: 'cheap-module-source-map',
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, `../public`),
    publicPath: '/build',
  },
  module:{
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader", },
          { loader: "css-loader", },
          { loader: "sass-loader", }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": ['@babel/preset-env']
          }
        }]
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
  ],
};
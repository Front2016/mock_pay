/**
 * Created by lio on 16/8/7.
 */

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    path.resolve(__dirname, 'src/js/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'index.js',
  },
  plugins: [
        commonsPlugin,
        new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query:{
                  "presets" : ["es2015","stage-0"]
              }
          },
      ]
  },
};

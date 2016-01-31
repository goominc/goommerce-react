const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelrc = fs.readFileSync('./.babelrc');
const babelLoaderQuery = JSON.parse(babelrc);
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
babelLoaderQuery.plugins.push('react-transform');
babelLoaderQuery.extra = babelLoaderQuery.extra || {};
babelLoaderQuery.extra['react-transform'] = {
  transforms: [{
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  }],
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './pc-site/client',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?' + JSON.stringify(babelLoaderQuery)],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};

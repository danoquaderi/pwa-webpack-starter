const
  path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    "vendor": [
      "fastclick",
      "iscroll",
    ],
    "bundle": path.resolve('./app', 'scripts', 'main.js')
  },

  output: {
    path: path.resolve('./build', 'scripts'),
    filename: "[name]-[hash:6].js"
  },

  resolve: {
    'root': [
      path.resolve('./app'),
      path.resolve('./node_modules'),
    ],
    'alias': {
      'iscroll': path.resolve('./node_modules', 'iscroll', 'build', 'iscroll-lite.js'),
      'fastclick': path.resolve('./node_modules', 'fastclick', 'lib', 'fastclick.js'),
    },
    'extensions': ['', '.js', '.pug']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    }),

    new HtmlWebpackPlugin({
      template: path.resolve('./app', 'view', 'index.pug'), // 模板位置
      filename: '../index.html'
    }),

    new webpack.optimize.OccurenceOrderPlugin(),        // 为组件分配ID
    new webpack.optimize.UglifyJsPlugin()               // 压缩JS代码
  ],
};
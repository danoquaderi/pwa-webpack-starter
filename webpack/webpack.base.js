/**
 * Created by cyc on 2017/2/4.
 */

const
  path = require('path')
  , webpack = require('webpack')

  // Webpack Plugin
  , CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
  , DefinePlugin = require('webpack/lib/DefinePlugin')
;

const
  DEVELOPMENT = process.env.NODE_ENV === 'development'    // 开发模式
  , PRODUCTION = process.env.NODE_ENV === 'production'    // 生产模式
  , PRODUCTION_TEST_SERVER = process.env.NODE_ENV === 'production_test_server'    // 用测试服务器预览生产模式
;

module.exports = {
  entry: {
    "vendor": [
      "iscroll",
      "fastclick",
    ],
    "main": path.resolve('app', 'main.js'),
  },

  output: {
    // path: 'dist',
    filename: DEVELOPMENT
      ? 'scripts/[name].bundle.[chunkhash:4].js'
      : 'scripts/[name].bundle.[chunkhash:8].min.js',
    chunkFilename: DEVELOPMENT
      ? 'scripts/[name].chunk.[chunkhash:4].js'
      : 'scripts/[name].chunk.[chunkhash:8].min.js',
    //publicPath: '/'
  },

  resolve: {
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
      path.resolve('static'),
    ],
    'alias': {
      'iscroll': path.resolve('node_modules', 'iscroll', 'build', 'iscroll-lite.js'),
      'fastclick': path.resolve('node_modules', 'fastclick', 'lib', 'fastclick.js'),
    },
    'extensions': ['.js']
  },

  module: {
    rules: [
      // Scripts
      {
        test: /\.js$/,
        include: [
          path.resolve('app')
        ],
        exclude: [
          path.resolve('node_modules'),
        ],
        loader: 'babel-loader',
      },

      // Pictures
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve('node_modules'),
          path.resolve('static', 'images', 'icons'),
          path.resolve('static', 'images', 'logos'),
        ],
        include: [
          path.resolve('app'),
          path.resolve('static'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'images/[name].[hash:6].[ext]',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 6,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                svgo: {
                  plugins: [
                    {
                      removeViewBox: false
                    },
                    {
                      removeEmptyAttrs: false
                    }
                  ]
                },
              },
            }
          }
        ],
      },

      // Svg icons
      {
        test: /\.svg$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'images', 'icons')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/icons/[name].[hash:6].[ext]',
            }
          }
        ],
      },

      // logo
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: [
          path.resolve('node_modules'),
        ],
        include: [
          path.resolve('static', 'logos'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/logos/[name].[hash:6].[ext]',
            }
          },
        ],
      },

      // Font
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: [
          path.resolve('node_modules'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash:6].[ext]',
            }
          }
        ],
      },

      // Pug template
      {
        test: /\.pug$/,
        include: [
          path.resolve('app'),
          path.resolve('static'),
        ],
        exclude: [
          path.resolve('node_modules'),
        ],
        loader: 'pug-loader',
      },

      // Web App Manifest
      {
        test: /manifest.json$/,
        include: [
          path.resolve('static'),
        ],
        exclude: [
          path.resolve('node_modules'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'manifest.json',
            }
          },
          {
            loader: 'web-app-manifest-loader',
          },
        ],
      },
    ]
  },

  plugins: [
    new CommonsChunkPlugin({
      names: ['main', 'vendor'],
      minChunks: Infinity,
    }),

    new DefinePlugin({
      DEVELOPMENT: JSON.stringify(DEVELOPMENT),
      PRODUCTION: JSON.stringify(PRODUCTION),
      PRODUCTION_TEST_SERVER: JSON.stringify(PRODUCTION_TEST_SERVER),
      TEST_SERVER_ADDRESS: '',
    }),
  ],
};
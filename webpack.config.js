const path = require('path')
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const env = process.env.NODE_ENV

const config = {
  devtool: env === 'dev' && 'source-map',
  entry: {
    main: [
      // 'webpack-dev-server/client?http://localhost:8082',
      './src/main'
    ]
  },
  resolve: {
    alias: {
      phaser,
      'pixi.js': pixi,
      p2
    },
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, './build/'),
    publicPath: '/build/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /pixi.js/,
      use: ['script-loader']
    }, {
      test: /p2/,
      use: ['script-loader']
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          precss(),
          autoprefixer()
        ]
      }
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      test: /\.js($|\?)/i
    })
  )
}

module.exports = config

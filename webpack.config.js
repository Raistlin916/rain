const path = require('path')
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const env = process.env.NODE_ENV

const config = {
  devtool: env === 'dev' && 'source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8082',
      './src/main'
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, './www/static/build/'),
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
      test: /\.js($|\?)/i
    })
  )
}

module.exports = config

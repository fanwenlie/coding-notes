const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
      path: path.resolve(__dirname, '../dist'),
      // 设置splitChunks之后，需要把bundle改成[name]
      filename: '[name].[chunkhash].js',
      chunkFilename: "[name].[chunkhash].js"
  },
  optimization: {
    // 提取webpack require模块化代码，也就是经常看见的manifest.js
    runtimeChunk: {
      name: 'manifest'
    },
    // 默认提供了压缩代码功能，当然也可以使用第三方插件来压缩代码.
    // 空数组则不压缩代码
    minimizer: [], // [new UglifyJsPlugin({...}), new OptimizeCSSAssetsPlugin()]
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 提取代码最小尺寸为30kb，小于30kb则不提取
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "all",
          minChunks: 2,
          minSize: 0,
          priority: 1
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2, // 缓存组优先级
          name: 'vendor',
          chunks: 'all'
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
})


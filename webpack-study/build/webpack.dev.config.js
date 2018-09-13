const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const localIp = require('ip').address()


const baseConfig = require('./webpack.base.config')

module.exports = merge({
  mode: 'development',
  devServer: {
    port: 8080,
    // 设置为本机ip，可以通过ip来打开网页，这样移动端也可以输入ip地址来访问网页
    host: localIp, 
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    publicPath: '/',
    proxy: {}
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
})
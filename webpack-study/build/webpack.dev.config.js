const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const localIp = require('ip').address()


const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    port: 8080,
    // 设置为本机ip，可以通过ip来打开网页，这样移动端也可以输入ip地址来访问网页
    host: localIp,
    contentBase: path.join(__dirname, 'dist'),
    open: false,
    publicPath: '/',
    proxy: {}
  },
  // 告诉webpack去那个目录下找loader模块
  resolveLoader: {
    modules: [
        path.resolve('node_modules'),
        path.resolve('src', 'loaders'),
    ]
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [ 
      //     {
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\_loader\_test\.js$/,
        use: [
          // 注意这几个loader的顺序
          {
            loader: "first-loader",
            options: {
              name: 'fwl'
            }
          },
          {
            loader: "second-loader",
            options: {
              // text: 'second test!!!'
              filename: path.resolve(__dirname, '../src/second_loader_test.txt')
            }
          },
          {
            loader: "four-loader",
            options: {}
          }
          
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: 'three-loader',
          options: {
            limit: 1024
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'extract-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new webpack.NamedModulesPlugin()
  ]
})
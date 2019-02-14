const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const localIp = require('ip').address()
const notifier = require('node-notifier')

const baseConfig = require('./webpack.base.config')

const DonePlugin = require('../src/plugins/1.DonePlugin')
const CompilationPlugin = require('../src/plugins/2.CompilationPlugin')
const AsyncPlugin = require('../src/plugins/3.AsyncPlugin')
const FileListPlugin = require('../src/plugins/4.FileListPlugin')
const CustomHookPlugin = require('../src/plugins/5.CustomHookPlugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    //HMR控制台log等级
    clientLogLevel: "warning",
    port: 8080,
    // 设置为本机ip，可以通过ip来打开网页，这样移动端也可以输入ip地址来访问网页
    host: localIp,
    contentBase: path.join(__dirname, 'dist'),
    open: false,
    // 热加载
    hot: true,
    //自动刷新
    inline: true,
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: {
      errors: true,
      warnings: false
    },
    // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    quiet: true,
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      // {
      //   test: /\_loader\_test\.js$/,
      //   use: [
      //     // 注意这几个loader的顺序
      //     {
      //       loader: "first-loader",
      //       options: {
      //         name: 'fwl'
      //       }
      //     },
      //     {
      //       loader: "second-loader",
      //       options: {
      //         // text: 'second test!!!'
      //         filename: path.resolve(__dirname, '../src/second_loader_test.txt')
      //       }
      //     },
      //     {
      //       loader: "four-loader",
      //       options: {}
      //     }
          
      //   ]
      // },
      // {
      //   test: /\.png$/,
      //   use: {
      //     // 自定义loader
      //     loader: 'three-loader',
      //     options: {
      //       limit: 1024
      //     }
      //   }
      // },
      // {
      //   test: /\.css$/,
      //   use: {
      //     // 自定义loader
      //     loader: 'extract-loader'
      //   }
      // }
    ]
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${localIp}:${8080}`
        ]
      },
      // onErrors: (severity, errors) => {
      //   if (severity !== 'error') {
      //     return;
      //   }
      //   console.log(11111)
      //   const error = errors[0];
      //   notifier.notify({
      //     title: "Webpack error",
      //     message: severity + ': ' + error.name,
      //     subtitle: error.file || '',
      //     icon: ICON
      //   });
      // }
    }),
    // new DonePlugin({options: true}),
    // new CompilationPlugin({options: true}),
    // new AsyncPlugin(),
    // new FileListPlugin(),
    new CustomHookPlugin(),
  ]
})
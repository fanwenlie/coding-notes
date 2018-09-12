const webpack = require('webpack')
const webpackDevConfig = require('./webpack.dev.config')

webpack(webpackDevConfig, function(err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
  }) + '\n')
})
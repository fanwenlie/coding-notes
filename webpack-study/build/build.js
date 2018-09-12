const webpack = require('webpack')
const webpackBuildConfig = require('./webpack.prod.config')



webpack(webpackBuildConfig, function(err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
  }) + '\n')
})
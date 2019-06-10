const webpack = require('webpack')
const webpackBuildConfig = require('./webpack.prod.config')
const chalk = require('chalk')
// 模块loading，使构建更加友好
const ora = require('ora')
const spinner = ora({ 
  text: 'building for production...',
}).start();
spinner.start()

webpack(webpackBuildConfig, function(err, stats) {
  if (err) throw err;
  spinner.stop();
  

  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
  }) + '\n')

  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }

  console.log(chalk.cyan("  Build complete.\n"));
  console.log(
    chalk.yellow(
      "  Tip: built files are meant to be served over an HTTP server.\n" +
        "  Opening index.html over file:// won't work.\n"
    )
  );
})
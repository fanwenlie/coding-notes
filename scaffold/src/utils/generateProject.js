const Metalsmith = require('metalsmith')
const async = require('async')

const render = require('consolidate').handlebars.render

function ask(answers) {
  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()
    Object.assign(metadata, answers)
    done()
  }
}
/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function template(files, metalsmith, done) {
  // 文件名数组
  const keys = Object.keys(files)

  const metadata = metalsmith.metadata()

  // 异步遍历每个文件，并往文件中插入命令行输入的值
  async.each(keys, run, done)

  function run(file, done) {
    const str = files[file].contents.toString()
    render(str, metadata, function (err, res) {
      if (err) return done(err)
      files[file].contents = new Buffer.from(res)
      done()
    })
  }
}

module.exports = (data, callback) => {
  const { answers, dist } = data

  return Metalsmith(__dirname)
    .source(dist)
    .destination(dist)
    .clean(false)
    .use(ask(answers))
    .use(template)
    .build(function (err) {
      if (err) throw err

      callback()
    })
}

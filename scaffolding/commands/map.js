const Metalsmith = require('metalsmith')
const { resolve } = require('path')
const { prompt } = require('inquirer')
const async = require('async');


var render = require('consolidate').handlebars.render;


const question = [
  {
    type: 'input',
    name: 'name',
    message: 'name: ',
    validate (val) {
      if(!val) {
        return 'name is required!'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'repository',
    message: 'repository: ',
    validate (val) {
      if(!val) {
        return 'repository is required!'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'description: ',
    validate (val) {
      if(!val) {
        return 'description is required!'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'license',
    message: 'license: ',
    default: 'MIT'
  },
]

function ask(answers){
  return (files, metalsmith, done)=>{
    var metadata = metalsmith.metadata();
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

function template(files, metalsmith, done){
  // 文件名数组
  var keys = Object.keys(files);

  var metadata = metalsmith.metadata();

  // 异步遍历每个文件，并往文件中插入命令行输入的值
  async.each(keys, run, done);

  function run(file, done){
    var str = files[file].contents.toString();
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}


module.exports = prompt(question).then((...args) => {
  // { name, repository, description, license}
  var metalsmith = Metalsmith(__dirname)
    .source('../project-tmpl')
    .destination('../build')
    .clean(true)
    .use(ask(args[0]))
    .use(template)
    .build(function(err){
      if (err) throw err;
    });
  
})
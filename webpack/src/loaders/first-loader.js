/**
 * 同步loader
 */

const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  }
}

module.exports = function(source){
  // console.log('source-------------------', source)

  const options = loaderUtils.getOptions(this);
  // 最后一个参数值任意，用于抛出错误信息，一般是当前loader名称
  // 验证出错：ValidationError: first-loader Invalid Options
  validateOptions(schema, options, 'first-loader')

  source = source.replace(/\[name\]/g, options.name);
  
  return `export default ${ JSON.stringify(source) }`
}
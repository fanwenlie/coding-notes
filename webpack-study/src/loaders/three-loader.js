/**
 * 通过控制raw是true还是false，来设定source的类型是buffer还是string
 * raw loader
 */
let { getOptions } = require("loader-utils");
let mime = require("mime")
module.exports = function(source) {
	let options = getOptions(this);
  let { limit, fallback } = options;
  // console.log('3.source------------', source)
  var mimeType = mime.getType(this.resourcePath)
	if (limit && source.length < limit) {
    // 如果source不是buffer类型，无法转换成base64
    // 原因是xxx.toString('base64')是buffer原型上的方法。string类型是无法转换的
    let base64 = `data:${mimeType};base64,${source.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64)}`;
	}
};
// raw=true: 资源文件转换成Buffer类型
module.exports.raw = true;

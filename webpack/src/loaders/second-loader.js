/**
 * 异步loader
 */
const loaderUtils = require("loader-utils");
const validateOptions = require("schema-utils");
const fs = require("fs");

const schema = {
	type: "object",
	properties: {
		filename: {
			type: "string"
		},
		text: {
			type: "string"
		}
	}
};

module.exports = function(source) {
  // console.log('source--------', source)
  // 异步loader，如果loader耗时长，推荐使用异步，避免编译时间过长
  let cb = this.async();
  // cacheable默认为true
	// this.cacheable && this.cacheable();
	let options = loaderUtils.getOptions(this);
	validateOptions(schema, options, "second-loader");
	let { text, filename } = options;
	if (text) {
		cb(null, text + source);
	} else if (filename) {
		fs.readFile(filename, "utf8", (err, text) => {
			cb(err, text + source);
		});
	}
};
